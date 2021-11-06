import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReportsService } from './reports.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsResolver implements Resolve<any> {
  constructor(private service: ReportsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const requests = [];
    requests.push(this.service.lookup());
    return forkJoin(requests).pipe(
      map((allResponses) => {
        return {
          Clients: allResponses[allResponses.length - 1],
        };
      })
    );
  }
}
