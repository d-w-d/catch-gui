import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { timeout, map, catchError, filter, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiDefaultTimeoutMs } from 'src/client/app/utils/constants';

/**
 * Single interceptor to handle all http requests
 * See this guide if you break this up into multiple interceptors
 * https://dev.to/anduser96/angular-understanding-how-interceptors-act-on-httprequest-and-httpresponse-bf8
 */
@Injectable()
export class PipelineInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //
    // Do sth here to req before it goes out (e.g. add headers to all requests)
    // Be sure to treat req as an immutable
    // ...

    //
    // Create rxjs pipeline for handling response events
    //
    const timeoutValue = parseInt(req.headers.get('timeout'), 10) || apiDefaultTimeoutMs;

    return next.handle(req).pipe(
      /**
       *
       * Piping an observable of type:
       *
       * Observable<HttpEvent<any>> = Observable<
       *    HttpSentEvent |         // interface; type=0
       *    HttpProgressEvent |     // interface; type=1 | 3
       *    HttpUserEvent<any> |    // interface; type=5
       *    HttpHeaderResponse |    // class;     type=2
       *    HttpResponse<any>       // class;     type=4
       * >
       *
       * From: node_modules/@angular/common/http/HttpBackend.d.ts
       *
       */

      // Remove pesky sent event
      // filter(_ => _.type !== 0),

      // Printout event info
      map(event => {
        if (event instanceof HttpResponse) {
          // Do sth with response
        }
        return event;
      }),

      // Throw error response to pipeline if no event reaches here by timeoutValue
      timeout(timeoutValue),

      // Handle any error thrown previously
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        let clientMessage = '';

        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error Message: ${error.error.message}`;
          clientMessage = `A network error occurred originating in your browser.`;
        } else {
          // server-side error
          errorMessage = `Error Message: ${error.message}`;
          clientMessage = `The data API is unreachable. Please try again later.`;
        }
        // Inform user that there's a problem
        this.snackBar.open(clientMessage, 'Close', {
          duration: 5000
        });
        // Throw error
        console.log('######', errorMessage);
        return throwError(errorMessage);
      }),

      // Retry?
      // retry(1),

      // Last chance café for printout
      map(
        event => {
          // console.log('API pipeline completed');
          return event;
        },
        err => {
          console.log('Got that error');
          return err;
        }
      )
    );
  }
}
