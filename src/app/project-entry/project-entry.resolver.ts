import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectEntryService } from './project-entry.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectEntryResolver implements Resolve<any> {
  constructor(private service: ProjectEntryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin([this.service.lookup()]).pipe(
      map((allResponses) => {
        return {
          Clients: allResponses[allResponses.length - 1],
        };
      })
    );
  }
}
