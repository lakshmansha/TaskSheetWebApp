import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectsService } from './projects.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsResolver implements Resolve<any> {
  constructor(private service: ProjectsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin([this.service.getAll()]).pipe(
      map((allResponses) => {
        return {
          Projects: allResponses[allResponses.length - 1],
        };
      })
    );
  }
}
