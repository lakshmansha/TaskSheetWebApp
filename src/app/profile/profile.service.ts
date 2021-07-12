import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { IReturn, UserStats } from '@app/@core/interface';
import { CredentialsService } from '@app/auth';
import { ModelMapper } from '@app/@core/mapper';

export interface ChangePasswordContext {
  password: string;
}

export interface ChangeEmailContext {
  email: string;
}

export interface ChangeContext {
  username: string;
  designation: string;
  aboutMe: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private credentialsService: CredentialsService) {}

  getUserStats(): Observable<UserStats> {
    const Url = environment.apiUrl + '/profile';

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        const resData = new ModelMapper(UserStats).map(res.data);
        return resData;
      })
    );
  }

  //#region Change Password Section

  buildPasswordContext(context: ChangePasswordContext) {
    const rtncontext = {
      password: context.password,
    } as ChangePasswordContext;

    return rtncontext;
  }

  changePassword(context: ChangePasswordContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/users';

    const _body = this.buildPasswordContext(context);

    return this.http.put<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  //#endregion

  //#region Change Email Section

  buildEmailContext(context: ChangeEmailContext) {
    const rtncontext = {
      email: context.email,
    } as ChangeEmailContext;

    return rtncontext;
  }

  changeEmailId(context: ChangeEmailContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/users';

    const _body = this.buildEmailContext(context);

    return this.http.put<IReturn>(Url, _body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  //#endregion

  //#region Change User Info Section

  buildContext(context: ChangeContext) {
    const rtncontext = {
      username: context.username,
      aboutMe: context.aboutMe,
      designation: context.designation,
    } as ChangeContext;

    return rtncontext;
  }

  change(context: ChangeContext): Observable<IReturn> {
    const Url = environment.apiUrl + '/users';

    const _body = this.buildContext(context);

    return this.http.put<IReturn>(Url, _body).pipe(
      map((res) => {
        this.credentialsService.setProfile(res.data);
        return res;
      })
    );
  }

  //#endregion
}
