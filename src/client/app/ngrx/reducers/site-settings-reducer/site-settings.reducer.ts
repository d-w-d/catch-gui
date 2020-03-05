import { SiteSettingsActions, ESiteSettingsActionTypes } from '../../actions/site-settings.actions';
import { ISiteSettings } from 'src/client/app/models/site-settings.model';

export interface ISiteSettingsSubstate extends ISiteSettings {}

export const initialState: ISiteSettingsSubstate = {
  siteTheme: 'DARK-THEME',
  hour: new Date().getHours(),
  isPageAnimated: true,
  isAutoNightMode: false
};

export function siteSettingsReducer(
  state = initialState,
  action: SiteSettingsActions
): ISiteSettingsSubstate {
  switch (action.type) {
    case ESiteSettingsActionTypes.SiteSettingsSetAll:
      return {
        ...action.payload.siteSettings
      };

    case ESiteSettingsActionTypes.SiteSettingsSetHour:
      return {
        ...state,
        hour: action.payload.hour
      };

    case ESiteSettingsActionTypes.SiteSettingsIsAutoNightMode:
      return {
        ...state,
        // isAutoNightMode: action.payload.isAutoNightMode
        isAutoNightMode: !state.isAutoNightMode
      };

    case ESiteSettingsActionTypes.SiteSettingsSetSiteTheme:
      return {
        ...state,
        siteTheme: action.payload.theme
      };

    default:
      return state;
  }
}
