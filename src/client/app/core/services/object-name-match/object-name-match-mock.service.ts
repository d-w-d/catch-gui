import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { IObjectNameMatchResult } from '@client/app/models/object-name-match-result.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectNameMatchMockService {
  constructor() {}

  objectNameMatch(userSubmittedText: string): Observable<IObjectNameMatchResult[]> {
    return of([
      {
        body_type: 'comet',
        comparison_text: '',
        display_text: '65P / Gunn',
        target: '65P'
      }
    ]);
  }
}
