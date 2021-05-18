import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReturn } from '@app/@core/interface';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CredentialsService } from './credentials.service';

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<IReturn> {
    // // Replace by proper authentication call
    // const data = {
    //   username: context.username,
    //   token: '123456',
    // };
    // this.credentialsService.setCredentials(data, context.remember);
    // return of(data);

    const url = environment.apiUrl + '/auth/login';

    const payload = {
      email: context.email,
      password: context.password,
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response',
    };

    return this.http.post<IReturn>(url, payload, httpOptions).pipe(
      map((res) => {
        const data = {
          username: res.body.data.username,
          token: res.body.authentication,
        };

        this.credentialsService.setCredentials(data, context.remember);
        return res.body;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // this.credentialsService.setCredentials();
    // return of(true);

    const url = environment.apiUrl + '/auth/logout';

    return this.http.post<IReturn>(url, {}).pipe(
      map((res) => {
        this.credentialsService.setCredentials();
        return true;
      })
    );
  }
}
