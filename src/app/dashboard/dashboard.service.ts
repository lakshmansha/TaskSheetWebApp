import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { IReturn, TaskInsights } from '@app/@core/interface';
import { ModelMapper } from '@app/@core/mapper';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllOnGoingTasks(): Observable<TaskInsights[]> {
    const Url = environment.apiUrl + '/dashboard/tasks/ongoing';

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        const resData = {} as IReturn;
        resData.data = [];
        res.data.forEach((element: any) => {
          element = new ModelMapper(TaskInsights).map(element);
          resData.data.push(element);
        });
        return resData.data;
      })
    );
  }

  getAllCompletedTasks(): Observable<TaskInsights[]> {
    const Url = environment.apiUrl + '/dashboard/tasks/complete';

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        const resData = {} as IReturn;
        resData.data = [];
        res.data.forEach((element: any) => {
          element = new ModelMapper(TaskInsights).map(element);
          resData.data.push(element);
        });
        return resData.data;
      })
    );
  }

  getAllBacklogTasks(): Observable<TaskInsights[]> {
    const Url = environment.apiUrl + '/dashboard/tasks/backlog';

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        const resData = {} as IReturn;
        resData.data = [];
        res.data.forEach((element: any) => {
          element = new ModelMapper(TaskInsights).map(element);
          resData.data.push(element);
        });
        return resData.data;
      })
    );
  }
}
