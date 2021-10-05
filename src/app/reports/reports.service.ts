import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { IReturn, Client, Report } from '@app/@core/interface';
import { ModelMapper } from '@app/@core/mapper';

export interface ReportSearchContext {
  clientId: string;
  fromDate: Date;
  toDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  lookup(): Observable<IReturn> {
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

  buildContext(context: ReportSearchContext) {
    const rtncontext = {
      clientId: context.clientId,
      fromDate: context.fromDate,
      toDate: context.toDate
    } as ReportSearchContext;

    return rtncontext;
  }

  search(context: ReportSearchContext): Observable<Report[]> {
    const Url = environment.apiUrl + '/reports';

    const _body = this.buildContext(context);

    return this.http.post<IReturn>(Url, _body).pipe(
      map((res) => {
        const resData = {} as IReturn;
        resData.data = [];
        res.data.forEach((element: any) => {
          element = new ModelMapper(Report).map(element);
          resData.data.push(element);
        });
        return resData.data;
      })
    );
  }
}
