import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientsService } from './clients.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsResolver implements Resolve<any> {
  constructor(private service: ClientsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin([this.service.getAll()]).pipe(
      map((allResponses) => {
        return {
          Clients: allResponses[allResponses.length - 1],
        };
      })
    );
  }
}
