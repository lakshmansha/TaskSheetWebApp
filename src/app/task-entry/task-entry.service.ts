import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Client, IReturn, Project, Task } from '@app/@core/interface';
import { ModelMapper } from '@app/@core/mapper';
import { Common, LookupService } from '@app/@core';

export interface TaskEntryContext {
  projectId: string;
  trackingCode: string;
  taskType: string;
  taskName: string;
  description: string;
  reportedAt: Date;
  resource: string;
  estimatedHrs: number;
  status: string;
}

const com = new Common('Task Entry Service');

@Injectable({
  providedIn: 'root',
})
export class TaskEntryService {
  constructor(private http: HttpClient, private lookup: LookupService) {}

  buildContext(context: TaskEntryContext) {
    const rtncontext = {
      projectId: context.projectId,
      trackingCode: context.trackingCode,
      taskType: context.taskType,
      taskName: context.taskName,
      description: context.description,
      resource: context.resource,
      estimatedHrs: context.estimatedHrs,
      status: context.status,
      reportedAt: context.reportedAt,
    } as TaskEntryContext;

    return rtncontext;
  }

  getbyId(id: string): Observable<IReturn> {
    const Url = environment.apiUrl + '/tasks/' + id;

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        res.data = new ModelMapper(Task).map(res.data);

        return res.data;
      })
    );
  }

  add(context: TaskEntryContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/tasks';

    const _body = this.buildContext(context);

    return this.http.post<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  update(id: string, context: TaskEntryContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/tasks/' + id;

    const _body = this.buildContext(context);

    return this.http.put<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  Lookups(): Observable<any> {
    return forkJoin([this.Projects(), this.Clients(), this.lookup.getStatus(), this.lookup.getTaskType()]).pipe(
      map((allResponses) => {
        return {
          Projects: allResponses[allResponses.length - 4],
          Clients: allResponses[allResponses.length - 3],
          Status: allResponses[allResponses.length - 2],
          TaskType: allResponses[allResponses.length - 1],
        };
      })
    );
  }

  Projects(): Observable<IReturn> {
    const Url = environment.apiUrl + '/projects';

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        res.data.forEach((element: any) => {
          element = new ModelMapper(Project).map(element);
        });
        return res.data;
      })
    );
  }

  Clients(): Observable<IReturn> {
    const Url = environment.apiUrl + '/clients';

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        res.data.forEach((element: any) => {
          element = new ModelMapper(Client).map(element);
        });
        return res.data;
      })
    );
  }
}
