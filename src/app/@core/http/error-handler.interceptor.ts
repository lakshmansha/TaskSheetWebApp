import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';
import { Router } from '@angular/router';

const log = new Logger('ErrorHandlerInterceptor');

declare global {
  interface Window {
    toastr: any;
  }
}

let toastr = window.toastr; // ok now

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
    toastr.options = { positionClass: 'toast-top-right' };
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }

    if (response['status'] === 401) {
      toastr.error(`${response['error']['message']}`);
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    throw response;
  }
}
