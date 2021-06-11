import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@core';
import { I18nService } from '@app/i18n';

const log = new Logger('App');

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private ngswUpdate: SwUpdate
  ) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
      this.initializePWA();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this)
      )
      .subscribe((event) => {
        const title = event.title;
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }

  //#region PWA

  updateNetworkStatusUI() {
    if (navigator.onLine) {
      (document.querySelector('body') as any).style = '';
    } else {
      (document.querySelector('body') as any).style = 'filter: grayscale(1)';
    }
  }

  initializePWA() {
    // Checking SW Update Status
    this.ngswUpdate.available.subscribe((update) => {
      if (update.type === 'UPDATE_AVAILABLE') {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      }
    });
    this.ngswUpdate.checkForUpdate();

    // Checking Network Status
    this.updateNetworkStatusUI();
    window.addEventListener('online', this.updateNetworkStatusUI);
    window.addEventListener('offline', this.updateNetworkStatusUI);

    if ((navigator as any).standalone === undefined) {
      if (window.matchMedia('(display-mode: browser').matches) {
        // We are in the browser
        window.addEventListener('beforeinstallprompt', (event) => {
          event.preventDefault();
          if (confirm('Do you want to install this App?')) {
            (event as any).prompt();
            (event as any).userChoice.then((result: any) => {
              if (result.outcome === 'dismissed') {
                // TODO: Track no installation
              } else {
                // TODO: It was installed
              }
            });
          }

          return false;
        });
      }
    }
  }

  //#endregion
}
