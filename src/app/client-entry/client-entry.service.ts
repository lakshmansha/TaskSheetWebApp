import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Client, IReturn } from '@app/@core/interface';
import { ModelMapper } from '@app/@core/mapper';

export interface ClientEntryContext {
  clientCode: string;
  clientName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientEntryService {
  constructor(private http: HttpClient) {}

  buildContext(context: ClientEntryContext) {
    const rtncontext = {
      clientCode: context.clientCode,
      clientName: context.clientName,
    } as ClientEntryContext;

    return rtncontext;
  }

  getById(id: string): Observable<IReturn> {
    const Url = environment.apiUrl + '/clients/' + id;

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        res.data = new ModelMapper(Client).map(res.data);
        return res.data;
      })
    );
  }

  add(context: ClientEntryContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/clients';

    const _body = this.buildContext(context);

    return this.http.post<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  update(id: string, context: ClientEntryContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/clients/' + id;

    const _body = this.buildContext(context);

    return this.http.put<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
