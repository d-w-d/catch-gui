import { Action, ActionCreator } from '@ngrx/store';

export enum ENavigationActionTypes {
  NavigationSetRouteRecords = '[Navigation] Set Route Records',
  NavigationCollectRouteRecords = '[Navigation] Collect Route Records'
}

export class NavigationSetRouteRecords implements Action {
  readonly type = ENavigationActionTypes.NavigationSetRouteRecords;
  constructor(public payload: { previousRoute: string; presentRoute: string }) {}
}

export class NavigationCollectRouteRecords implements Action {
  readonly type = ENavigationActionTypes.NavigationCollectRouteRecords;
  constructor(public payload: { newPresentRoute: string }) {}
}

export type NavigationActions = NavigationSetRouteRecords | NavigationCollectRouteRecords;
