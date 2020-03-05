import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import { environment } from '../../../environments/environment';
import { INavigationSubstate, NavigationReducer } from './navigation-reducer/navigation.reducer';
import {
  ISiteSettingsSubstate,
  siteSettingsReducer
} from './site-settings-reducer/site-settings.reducer';
import {
  IObjectNameMatchSubstate,
  ObjectNameMatchReducer
} from './object-name-match-reducer/object-name-match.reducer';
import {
  INeatObjectQuerySubstate,
  NeatObjectQueryReducer
} from './neat-object-query-reducer.ts/neat-object-query.reducer';
import {
  IScreenDeviceSubstate,
  ScreenDeviceReducer
} from './screen-device-reducer/screen-device.reducer';

export interface AppState {
  siteSettingsSubstate: ISiteSettingsSubstate;
  objectNameMatch: IObjectNameMatchSubstate;
  neatObjectQuery: INeatObjectQuerySubstate;
  screenDevice: IScreenDeviceSubstate;
  navigation: INavigationSubstate;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  siteSettingsSubstate: siteSettingsReducer,
  objectNameMatch: ObjectNameMatchReducer,
  neatObjectQuery: NeatObjectQueryReducer,
  screenDevice: ScreenDeviceReducer,
  navigation: NavigationReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
