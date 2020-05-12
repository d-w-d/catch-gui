import {
  ENeatObjectQueryActionTypes,
  NeatObjectQueryActions
} from '../../actions/neat-object-query.actions';

import { INeatObjectQueryResult } from '../../../models/neat-object-query-result.model';
import {
  INeatObjectQueryResultLabels,
  INeatObjectQueryStatus
} from '../../../models/neat-object-query-result-labels.model';
import {
  TColInitState,
  initialColumnState
} from '@client/app/core/services/neat-data/neat-initial-data-columns.service';

export interface INeatObjectQuerySubstate {
  neatObjectSelectedResultIndex: number;
  neatObjectQueryResults: INeatObjectQueryResult[];
  neatObjectQueryResultLabels: INeatObjectQueryResultLabels | undefined;
  neatObjectQueryStatus?: INeatObjectQueryStatus;
  neatObjectQueryColumnState: TColInitState;
}

export const initialState: INeatObjectQuerySubstate = {
  neatObjectSelectedResultIndex: 0,
  neatObjectQueryResults: undefined,
  neatObjectQueryResultLabels: undefined,
  neatObjectQueryStatus: undefined,
  neatObjectQueryColumnState: { ...initialColumnState }
};

export function NeatObjectQueryReducer(
  state = initialState,
  action: NeatObjectQueryActions
): INeatObjectQuerySubstate {
  switch (action.type) {
    case ENeatObjectQueryActionTypes.NeatObjectQuerySetSelectedResultIndex:
      return {
        ...state,
        neatObjectSelectedResultIndex: action.payload.index
      };

    case ENeatObjectQueryActionTypes.NeatObjectQuerySetColumnState:
      return {
        ...state,
        neatObjectQueryColumnState: { ...action.payload.newColState }
      };

    case ENeatObjectQueryActionTypes.NeatObjectQuerySetResults:
      return {
        ...state,
        neatObjectQueryResults: [...action.payload.neatObjectQueryResults]
      };

    case ENeatObjectQueryActionTypes.NeatObjectQuerySetResultLabels:
      return {
        ...state,
        neatObjectQueryResultLabels: { ...action.payload.neatObjectQueryResultLabels }
      };

    case ENeatObjectQueryActionTypes.NeatObjectQuerySetStatus:
      return {
        ...state,
        neatObjectQueryStatus: { ...state.neatObjectQueryStatus, ...action.payload }
      };

    default:
      return state;
  }
}
