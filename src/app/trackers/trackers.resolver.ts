import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrackersService } from './trackers.service';

@Injectable({
  providedIn: 'root',
})
export class TrackersResolver implements Resolve<boolean> {
  constructor(private service: TrackersService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin([this.service.Tasks(), this.service.getAll()]).pipe(
      map((allResponses) => {
        return {
          Tasks: allResponses[allResponses.length - 2],
          Trackers: allResponses[allResponses.length - 1],
        };
      })
    );
  }
}
