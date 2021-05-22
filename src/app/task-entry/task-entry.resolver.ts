import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskEntryService } from './task-entry.service';

@Injectable({
  providedIn: 'root',
})
export class TaskEntryResolver implements Resolve<any> {
  constructor(private service: TaskEntryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin([this.service.Lookups()]).pipe(
      map((allResponses) => {
        return allResponses[allResponses.length - 1];
      })
    );
  }
}
