import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { ROOT_URL } from '@app/utils/root-url';
import { Observable, from, of } from 'rxjs';
import { map, delay, switchMap, catchError } from 'rxjs/operators';
import { INeatObjectQueryResult } from '@client/app/models/neat-object-query-result.model';
import { INeatObjectQueryResultLabels } from '@client/app/models/neat-object-query-result-labels.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from '@client/app/ngrx/reducers';
import { Store } from '@ngrx/store';
import { NeatObjectQuerySetStatus } from '../../../ngrx/actions/neat-object-query.actions';

interface ICatchObjidProbe {
  job_id: string;
  message: string;
  results: string;
  queued: boolean;
}

export type TQueryNeatObject =
  | { status: 'error'; message: string }
  | { results: INeatObjectQueryResult[]; status: 'success' };

// export const ROOT_URL = 'https://musforti.astro.umd.edu/catch/';
export const ROOT_URL = 'https://catch.astro.umd.edu/catch-stage/';

@Injectable({
  providedIn: 'root'
})
export class NeatObjectQueryService {
  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  /**
   * Runs sequence of API calls to (i) check for cached data or trigger big query,
   * and (ii) retrieve data
   */
  queryNeatObject(objid: string, isCached?: boolean): Observable<TQueryNeatObject> {
    //
    // Don't allow user to re-compute queries from UI
    isCached = true;

    const url = ROOT_URL + `query/moving?target=${objid}${isCached ? '' : '&cached=false'}`;
    // console.log('url', url);

    return this.httpClient.get<ICatchObjidProbe>(url).pipe(
      map((data: ICatchObjidProbe) => {
        return data;
      }),
      // delay(isCached ? 1 * 1000 : 0),
      switchMap(data => {
        // If we did not just trigger a queued query then we can grab results immediately
        if (!data.queued) {
          // console.log('DENIED 1!!!');
          const url2 = ROOT_URL + `caught/${data.job_id}`;
          return this.httpClient
            .get<{ count: number; job_id: string; data: INeatObjectQueryResult[] }>(url2)
            .pipe(
              map(
                (response): TQueryNeatObject => {
                  return { results: response.data, status: 'success' };
                }
              )
            );
        }
        // Else, listen to SSE stream and then grab data
        return from(this.watchJobStream(data.job_id)).pipe(
          switchMap(job_id => {
            const url3 = ROOT_URL + `caught/${job_id}`;
            return this.httpClient
              .get<{ count: number; job_id: string; data: INeatObjectQueryResult[] }>(url3)
              .pipe(
                map(
                  (response): TQueryNeatObject => {
                    // console.log('response.data', response.data);
                    // return response.data;
                    return {
                      results: response.data,
                      status: 'success'
                    };
                  }
                )
              );
          }),
          catchError(
            (_): Observable<TQueryNeatObject> => {
              // Provide info to carry on for now
              return of({
                status: 'error',
                message: 'Unused message at this point'
              });
            }
          )
        );
      })
    );
  }

  watchJobStream(jobId: string): Promise<string> {
    // this.snackBar.open('Please wait - this query typically takes 5-30 seconds', 'Close', {
    //   duration: 5000
    // });
    const store = this.store;
    return new Promise<string>((resolve, reject) => {
      const url = ROOT_URL + 'stream';
      const source = new EventSource(url);
      source.onmessage = function(msgEvent: MessageEvent) {
        try {
          const data = JSON.parse(msgEvent.data);
          const message: string = data.text;
          console.log('message', message);
          if (!!message) store.dispatch(new NeatObjectQuerySetStatus({ message }));
          if (data.status === 'success') {
            this.close(); // Sever connection to SSE route
            resolve(jobId);
          }
          if (data.status === 'error') {
            this.close();
            reject();
          }
        } catch (e) {
          console.log('e message', e.message);
          this.close(); // Sever connection to SSE route
          reject();
        }
      };
    });
  }

  getNeatResultLabels() {
    const url = ROOT_URL + 'caught/labels';
    return this.httpClient.get<INeatObjectQueryResultLabels>(url).pipe(
      map((data: INeatObjectQueryResultLabels) => {
        return data;
      })
    );
  }
}
