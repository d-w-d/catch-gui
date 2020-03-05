import { NavigationActions, ENavigationActionTypes } from '../../actions/navigation.actions';

export interface INavigationSubstate {
  previousRoute: string;
  presentRoute: string;
}

export const initialState: INavigationSubstate = {
  previousRoute: undefined,
  presentRoute: undefined
};

export function NavigationReducer(
  state = initialState,
  action: NavigationActions
): INavigationSubstate {
  switch (action.type) {
    case ENavigationActionTypes.NavigationSetRouteRecords:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
