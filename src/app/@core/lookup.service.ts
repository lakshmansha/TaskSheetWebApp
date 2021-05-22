import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  constructor() {}

  getStatus(): Observable<string[]> {
    const Status = ['BackLog', 'Parked', 'In-Progress', 'In-Review', 'Completed'];
    return of(Status);
  }

  getTaskType(): Observable<string[]> {
    const TaskType = ['Design', 'Development', 'Deployment', 'Analysis'];
    return of(TaskType);
  }
}
