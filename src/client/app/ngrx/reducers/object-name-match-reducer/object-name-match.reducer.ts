import {
  ObjectNameMatchActions,
  EObjectNameMatchActionTypes
} from '../../actions/object-name-match.actions';
import { IObjectNameMatchResult } from 'src/client/app/models/object-name-match-result.model';

export interface IObjectNameMatchSubstate {
  results: IObjectNameMatchResult[];
  isSearching: boolean;
}

export const initialState: IObjectNameMatchSubstate = {
  results: [],
  isSearching: false
};

export function ObjectNameMatchReducer(
  state = initialState,
  action: ObjectNameMatchActions
): IObjectNameMatchSubstate {
  switch (action.type) {
    case EObjectNameMatchActionTypes.ObjectNameMatchSetResults:
      return {
        ...state,
        results: [...action.payload.results]
      };

    case EObjectNameMatchActionTypes.ObjectNameMatchSetIsSearching:
      return {
        ...state,
        isSearching: action.payload.value
      };

    default:
      return state;
  }
}
