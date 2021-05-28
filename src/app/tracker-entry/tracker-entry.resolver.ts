import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrackerEntryService } from './tracker-entry.service';

@Injectable({
  providedIn: 'root',
})
export class TrackerEntryResolver implements Resolve<boolean> {
  constructor(private service: TrackerEntryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    var paramId = route.params['id'];
    const requests = [];
    if (paramId) {
      requests.push(this.service.getbyId(paramId));
    }
    requests.push(this.service.Lookups());

    return forkJoin(requests).pipe(
      map((allResponses) => {
        const responses = allResponses[allResponses.length - 1];
        responses['Entry'] = paramId ? allResponses[allResponses.length - 2] : undefined;
        return responses;
      })
    );
  }
}
