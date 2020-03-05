import { Actions, Effect, ofType } from '@ngrx/effects';
import { withLatestFrom, map } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ENavigationActionTypes,
  NavigationSetRouteRecords
} from '../../actions/navigation.actions';
import { AppState } from '../../reducers';

@Injectable()
export class NavigationEffects {
  //

  constructor(private actions$: Actions<any>, private store$: Store<AppState>) {}

  @Effect()
  collectNavigationRecords$: Observable<Action> = this.actions$.pipe(
    //

    // Used to check actions being triggered
    // map(_ => {
    //   console.log('Action:   ', _);
    //   return _;
    // }),

    // Allow only actions of type NavigationCollectRouteRecords
    ofType(ENavigationActionTypes.NavigationCollectRouteRecords),

    // Take the last observable (the action), take the store state,
    // and emit an observable of form Observable<[Action,StoreState]>
    withLatestFrom(this.store$.select(state => state.navigation)),

    // Map two received observables to single new observable action
    // that will pass through and trigger SetRouteRecords reducer
    map(([action, navState]) => {
      return new NavigationSetRouteRecords({
        presentRoute: action.payload.newPresentRoute,
        previousRoute: navState.presentRoute
      });
    })
  );
}
