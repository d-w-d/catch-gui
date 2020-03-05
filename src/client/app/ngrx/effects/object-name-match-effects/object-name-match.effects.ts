import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ObjectNameMatchService } from '../../../core/services/object-name-match/object-name-match.service';
import {
  ObjectNameMatchFetchResults,
  EObjectNameMatchActionTypes,
  ObjectNameMatchSetResults
} from '../../actions/object-name-match.actions';

@Injectable()
export class ObjectNameMatchEffects {
  constructor(
    private actions$: Actions<ObjectNameMatchFetchResults>,
    private objectNameMatcher: ObjectNameMatchService
  ) {}

  @Effect()
  fetchObjectNameMatchResults$: Observable<any> = this.actions$.pipe(
    ofType(EObjectNameMatchActionTypes.ObjectNameMatchFetchResults),

    // switchMap will flatten nested observable and cancel all but the most recently received observable
    switchMap(action => {
      const searchTerm = action.payload.searchTerm;
      return this.objectNameMatcher.objectNameMatch(searchTerm).pipe(
        map(results => {
          return new ObjectNameMatchSetResults({ results });
        })
      );
    })
  );
}
