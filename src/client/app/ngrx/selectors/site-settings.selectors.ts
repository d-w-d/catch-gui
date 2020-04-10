import { createSelector } from '@ngrx/store';

import { AppState } from '../reducers';
import { ISiteSettingsSubstate } from '../reducers/site-settings-reducer/site-settings.reducer';

/**
 *
 * Elemental SiteSettings Selectors
 *
 */

export const selectSiteSettingsTheme = createSelector(
  (state: AppState) => state.siteSettingsSubstate,
  (substate: ISiteSettingsSubstate) => substate.siteTheme
);

export const selectSiteSettingsIsAutoNightMode = createSelector(
  (state: AppState) => state.siteSettingsSubstate,
  siteSettings => siteSettings.isAutoNightMode
);

export const selectSiteSettingsIsHappyWithCookies = createSelector(
  (state: AppState) => state.siteSettingsSubstate,
  siteSettings => siteSettings.isHappyWithCookies
);

export const selectSiteSettingsHour = createSelector(
  (state: AppState) => state.siteSettingsSubstate,
  siteSettings => siteSettings.hour
);

export const selectSiteSettingsIsNightHour = createSelector(
  selectSiteSettingsHour,
  hour => hour >= 19 || hour <= 7
);

/**
 *
 * Compound Selectors
 * (I.e. selectors using other selectors)
 *
 */

export const selectSiteSettingsEffectiveTheme = createSelector(
  selectSiteSettingsTheme,
  selectSiteSettingsIsAutoNightMode,
  selectSiteSettingsIsNightHour,
  (siteTheme, isAutoNightmode, isNightHour) => {
    if (!isAutoNightmode) return siteTheme;
    return isNightHour ? 'DARK-THEME' : 'LIGHT-THEME';
  }
);
