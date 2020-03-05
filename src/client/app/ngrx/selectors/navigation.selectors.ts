import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { INavigationSubstate } from '../reducers/navigation-reducer/navigation.reducer';

/**
 *
 * Elemental Navigation Selectors
 *
 */

export const selectNavigationRecords = createSelector(
  (state: AppState) => state.navigation,
  (substate: INavigationSubstate) => substate
);
