import { createSelector } from '@ngrx/store';

import { AppState } from '../reducers';
import { IObjectNameMatchSubstate } from '../reducers/object-name-match-reducer/object-name-match.reducer';

/**
 *
 * Elemental Object-Name-Match Selectors
 *
 */

export const selectObjectNameMatchIsSearching = createSelector(
  (state: AppState) => state.objectNameMatch,
  (substate: IObjectNameMatchSubstate) => substate.isSearching
);

export const selectObjectNameMatchResults = createSelector(
  (state: AppState) => state.objectNameMatch,
  (substate: IObjectNameMatchSubstate) => substate.results
);
