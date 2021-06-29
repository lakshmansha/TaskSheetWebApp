import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { IReturn } from '@app/@core/interface';

export interface ChangePasswordContext {
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  buildContext(context: ChangePasswordContext) {
    const rtncontext = {
      password: context.password,
    } as ChangePasswordContext;

    return rtncontext;
  }

  changePassword(context: ChangePasswordContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/users';

    const _body = this.buildContext(context);

    return this.http.put<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
