import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileService } from './profile.service';
@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<boolean> {
  constructor(private service: ProfileService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin([this.service.getUserStats()]).pipe(
      map((allResponses) => {
        return {
          UserStats: allResponses[allResponses.length - 1],
        };
      })
    );
  }
}
