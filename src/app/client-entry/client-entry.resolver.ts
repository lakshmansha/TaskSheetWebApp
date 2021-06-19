import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientEntryService } from './client-entry.service';

@Injectable({
  providedIn: 'root',
})
export class ClientEntryResolver implements Resolve<any> {
  constructor(private service: ClientEntryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    var paramId = route.params['id'];
    if (!paramId) {
      return of(true);
    } else {
      return forkJoin([this.service.getById(paramId)]).pipe(
        map((allResponses) => {
          return {
            Entry: allResponses[allResponses.length - 1],
          };
        })
      );
    }
  }
}
