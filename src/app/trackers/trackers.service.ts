import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { IReturn, Task, Tracker } from '@app/@core/interface';
import { ModelMapper } from '@app/@core/mapper';

@Injectable({
  providedIn: 'root',
})
export class TrackersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IReturn> {
    const Url = environment.apiUrl + '/trackers';

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        const resData = {} as IReturn;
        resData.data = [];
        res.data.forEach((element: any) => {
          element = new ModelMapper(Tracker).map(element);
          resData.data.push(element);
        });
        return resData.data;
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
