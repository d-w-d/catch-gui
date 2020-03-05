import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';

/**
 *
 * Elemental Navigation Selectors
 *
 */

export const selectRouterUrl = createSelector(
  (state: AppState) => state.router,
  (routerState: RouterReducerState<SerializedRouterStateSnapshot>) => {
    const url = routerState && routerState.state && routerState.state.url;
    return url || undefined;
  }
);
