import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { IReturn, Client, Project } from '@app/@core/interface';
import { ModelMapper } from '@app/@core/mapper';

export interface ProjectEntryContext {
  clientId: string;
  projectCode: string;
  projectName: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectEntryService {
  constructor(private http: HttpClient) {}

  buildContext(context: ProjectEntryContext) {
    const rtncontext = {
      clientId: context.clientId,
      projectCode: context.projectCode,
      projectName: context.projectName,
      description: context.description,
    } as ProjectEntryContext;

    return rtncontext;
  }

  getbyId(id: string): Observable<IReturn> {
    const Url = environment.apiUrl + '/projects/' + id;

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        res.data = new ModelMapper(Project).map(res.data);

        return res.data;
      })
    );
  }

  add(context: ProjectEntryContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/projects';

    const _body = this.buildContext(context);

    return this.http.post<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  update(id: string, context: ProjectEntryContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/projects/' + id;

    const _body = this.buildContext(context);

    return this.http.put<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }

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
}
