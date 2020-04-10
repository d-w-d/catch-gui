import { Action } from '@ngrx/store';
import { ISiteSettingsSubstate } from '../reducers/site-settings-reducer/site-settings.reducer';
import { TPermittedTheme } from '../../models/site-settings.model';

export enum ESiteSettingsActionTypes {
  SiteSettingsSetAll = '[SiteSettings] Set All',
  SiteSettingsSetHour = '[SiteSettings] Set Hour',
  SiteSettingsSetSiteTheme = '[SiteSettings] Set SiteTheme',
  SiteSettingsSetIsPageAnimated = '[SiteSettings] Set IsPageAnimated',
  SiteSettingsSetIsAutoNightMode = '[SiteSettings] Set IsAutoNightMode',
  SiteSettingsSetIsHappyWithCookies = '[SiteSettings] Set IsHappyWithCookies',
  SiteSettingsLoadAllFromLocalStorage = '[SiteSettings] Load All From LocalStorage'
}

export class SiteSettingsSetAll implements Action {
  readonly type = ESiteSettingsActionTypes.SiteSettingsSetAll;
  constructor(public payload: { siteSettings: ISiteSettingsSubstate }) {}
}

export class SiteSettingsSetHour implements Action {
  readonly type = ESiteSettingsActionTypes.SiteSettingsSetHour;
  constructor(public payload: { hour: number }) {}
}

export class SiteSettingsSetSiteTheme implements Action {
  readonly type = ESiteSettingsActionTypes.SiteSettingsSetSiteTheme;
  constructor(public payload: { theme: TPermittedTheme }) {}
}

export class SiteSettingsSetIsPageAnimated implements Action {
  readonly type = ESiteSettingsActionTypes.SiteSettingsSetIsPageAnimated;
  constructor(public payload: { isPageAnimated: boolean }) {}
}

export class SiteSettingsSetIsAutoNightMode implements Action {
  readonly type = ESiteSettingsActionTypes.SiteSettingsSetIsAutoNightMode;
  constructor(public payload: { isAutoNightMode: boolean }) {}
}

export class SiteSettingsSetIsHappyWithCookies implements Action {
  readonly type = ESiteSettingsActionTypes.SiteSettingsSetIsHappyWithCookies;
  constructor(public payload: { isHappyWithCookies: boolean }) {}
}

export class SiteSettingsLoadAllFromLocalStorage implements Action {
  readonly type = ESiteSettingsActionTypes.SiteSettingsLoadAllFromLocalStorage;
  constructor() {}
}

export type SiteSettingsActions =
  | SiteSettingsSetAll
  | SiteSettingsSetHour
  | SiteSettingsSetSiteTheme
  | SiteSettingsSetIsPageAnimated
  | SiteSettingsSetIsAutoNightMode
  | SiteSettingsSetIsHappyWithCookies
  | SiteSettingsLoadAllFromLocalStorage;
