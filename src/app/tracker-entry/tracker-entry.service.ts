import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Client, IReturn, Project, Task, Tracker } from '@app/@core/interface';
import { ModelMapper } from '@app/@core/mapper';
import { Common } from '@app/@core';
import { CredentialsService } from '@app/auth';

export interface TrackerEntryContext {
  taskId: string;
  checkIn: Date;
  checkOut: Date;
  workNotes: string;
  actualHrs: number;
  billableHrs: number;
  createBy: string;
}

const com = new Common('Tracker Entry Service');

@Injectable({
  providedIn: 'root',
})
export class TrackerEntryService {
  constructor(private http: HttpClient, private credentialsService: CredentialsService) {}

  buildContext(context: TrackerEntryContext) {
    const rtncontext = {
      taskId: context.taskId,
      checkIn: context.checkIn,
      checkOut: context.checkOut,
      workNotes: context.workNotes,
      actualHrs: context.actualHrs,
      billableHrs: context.billableHrs,
      createBy: context.createBy,
    } as TrackerEntryContext;

    rtncontext.createBy = context.createBy ? context.createBy : this.credentialsService.credentials.username;

    return rtncontext;
  }

  getbyId(id: string): Observable<IReturn> {
    const Url = environment.apiUrl + '/trackers/' + id;

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        res.data = new ModelMapper(Tracker).map(res.data);
        return res.data;
      })
    );
  }

  add(context: TrackerEntryContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/trackers/insert';

    const _body = this.buildContext(context);

    return this.http.post<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  update(id: string, context: TrackerEntryContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/trackers/update/' + id;

    const _body = this.buildContext(context);

    return this.http.put<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  Lookups(): Observable<any> {
    return forkJoin([this.Tasks(), this.Projects(), this.Clients()]).pipe(
      map((allResponses) => {
        return {
          Tasks: allResponses[allResponses.length - 3],
          Projects: allResponses[allResponses.length - 2],
          Clients: allResponses[allResponses.length - 1],
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

  Tasks(): Observable<IReturn> {
    const Url = environment.apiUrl + '/tasks';

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        res.data.forEach((element: any) => {
          element = new ModelMapper(Task).map(element);
        });
        return res.data;
      })
    );
  }
}
