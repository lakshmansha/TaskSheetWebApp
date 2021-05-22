import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root',
})
export class TasksResolver implements Resolve<boolean> {
  constructor(private service: TasksService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin([this.service.getAll()]).pipe(
      map((allResponses) => {
        return {
          Tasks: allResponses[allResponses.length - 1],
        };
      })
    );
  }
}
