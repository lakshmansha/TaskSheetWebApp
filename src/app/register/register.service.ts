import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { IReturn } from '@app/@core/interface';

export interface RegisterContext {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  buildContext(context: RegisterContext) {
    const rtncontext = {
      username: context.username,
      email: context.email,
      password: context.password,
    } as RegisterContext;

    return rtncontext;
  }

  register(context: RegisterContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/auth/signup';

    const _body = this.buildContext(context);

    return this.http.post<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
