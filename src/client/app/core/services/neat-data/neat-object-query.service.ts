import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { ROOT_URL } from '@app/utils/root-url';
import { Observable, from } from 'rxjs';
import { map, mergeMap, delay, switchMap } from 'rxjs/operators';
import { INeatObjectQueryResult } from '@client/app/models/neat-object-query-result.model';
import { INeatObjectQueryResultLabels } from '@client/app/models/neat-object-query-result-labels.model';

interface ICatchObjidProbe {
  job_id: string;
  message: string;
  results: string;
}

export const ROOT_URL = 'https://musforti.astro.umd.edu/catch-sandbox/';

@Injectable({
  providedIn: 'root'
})
export class NeatObjectQueryService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Ping initial route to determine if data for object is cached or queued
   */
  queryNeatObject(objid: string, isRefreshed?: boolean): Observable<INeatObjectQueryResult[]> {
    //
    //
    // isRefreshed = true;

    const url = ROOT_URL + `query/moving?target=${objid}${isRefreshed ? '&cached=false' : ''}`;
    console.log('url', url);

    return this.httpClient.get<ICatchObjidProbe>(url).pipe(
      map((data: ICatchObjidProbe) => {
        console.log('data', data);
        return data;
      }),
      delay(isRefreshed ? 1 * 1000 : 1000),
      switchMap(data => {
        // console.log('data:', data);
        const url2 = ROOT_URL + `caught/${data.job_id}`;

        if (data.message.includes('Enqueued search')) {
          //
          return from(this.watchJobStream(data.job_id)).pipe(
            switchMap(job_id => {
              console.log('job_id', job_id);
              const url3 = ROOT_URL + `caught/${job_id}`;
              return this.httpClient
                .get<{ count: number; job_id: string; data: INeatObjectQueryResult[] }>(url3)
                .pipe(
                  map(response => {
                    console.log('response.data', response.data);
                    return response.data;
                  })
                );
            })
          );

          // this.httpClient
          //   .get<{ count: number; job_id: string; data: INeatObjectQueryResult[] }>(url2)
          //   .pipe(
          //     map(response => {
          //       console.log('response.data', response.data);
          //       return response.data;
          //     })
          //   );
        }

        return this.httpClient
          .get<{ count: number; job_id: string; data: INeatObjectQueryResult[] }>(url2)
          .pipe(
            map(response => {
              console.log('response.data', response.data);
              return response.data;
            })
          );
      })
    );
  }

  watchJobStream(jobId: string): Promise<string> {
    const p = new Promise<string>(resolve => {
      //
      const onStreamClosure = (job_id: string) => {
        // Do sth upon closure of stream
        console.log('closing stream');
        resolve(job_id);
      };

      const url = ROOT_URL + 'stream';
      console.log('jobId', jobId, url);

      const source = new EventSource(url);
      source.onmessage = function(msgEvent: MessageEvent) {
        console.log('msgEvent', msgEvent, msgEvent.data, typeof msgEvent);
        if (msgEvent.data === jobId) {
          console.log('this', this, typeof this);
          this.close(); // Sever connection to SSE route
          onStreamClosure(msgEvent.data);
        }
      };
    });
    return p;
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
