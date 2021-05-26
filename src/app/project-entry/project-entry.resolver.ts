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
    var paramId = route.params['id'];
    const requests = [];
    if (paramId) {
      requests.push(this.service.getbyId(paramId));
    }
    requests.push(this.service.lookup());
    return forkJoin(requests).pipe(
      map((allResponses) => {
        const Entry = paramId ? allResponses[allResponses.length - 2] : undefined;
        return {
          Entry: Entry,
          Clients: allResponses[allResponses.length - 1],
        };
      })
    );
  }
}
