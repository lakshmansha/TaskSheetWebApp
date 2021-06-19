import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CredentialsService } from '@app/auth/credentials.service';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private credentialsService: CredentialsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: environment.serverUrl + request.url });
    }

    if (
      /^(http|https):/i.test(request.url) &&
      !request.url.includes('login') &&
      !request.url.includes('signup') &&
      !request.url.includes('jokes')
    ) {
      const authToken = this.credentialsService.tokenData;
      request = request.clone({
        url: request.url,
        withCredentials: true,
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: authToken.token,
        },
      });
    }

    return next.handle(request);
  }
}
