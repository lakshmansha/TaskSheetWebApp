import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '@app/@core';
import { AuthenticationService, CredentialsService } from '@app/auth';

const log = new Logger('Header');
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authenticationService.logout().subscribe(
      () => this.router.navigate(['/login'], { replaceUrl: true }),
      (error) => {
        log.error(error);
      }
    );
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }
}
