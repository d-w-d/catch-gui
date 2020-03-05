import { createSelector } from '@ngrx/store';

import { AppState } from '../reducers';
import { INeatObjectQuerySubstate } from '../reducers/neat-object-query-reducer.ts/neat-object-query.reducer';

/**
 *
 * Elemental Neat-Object-Query Selectors
 *
 */

export const selectNeatObjectQuerySelectedResultIndex = createSelector(
  (state: AppState) => state.neatObjectQuery,
  (substate: INeatObjectQuerySubstate) => substate.neatObjectSelectedResultIndex
);

export const selectNeatObjectQueryResults = createSelector(
  (state: AppState) => state.neatObjectQuery,
  (substate: INeatObjectQuerySubstate) => substate.neatObjectQueryResults
);

export const selectNeatObjectQueryResultLabels = createSelector(
  (state: AppState) => state.neatObjectQuery,
  (substate: INeatObjectQuerySubstate) => substate.neatObjectQueryResultLabels
);

export const selectNeatObjectQueryStatus = createSelector(
  (state: AppState) => state.neatObjectQuery,
  (substate: INeatObjectQuerySubstate) => substate.neatObjectQueryStatus
);

export const selectNeatObjectQueryColumnState = createSelector(
  (state: AppState) => state.neatObjectQuery,
  (substate: INeatObjectQuerySubstate) => substate.neatObjectQueryColumnState
);
