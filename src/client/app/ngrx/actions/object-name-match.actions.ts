import { Action } from '@ngrx/store';
import { IObjectNameMatchResult } from 'src/client/app/models/object-name-match-result.model';

export enum EObjectNameMatchActionTypes {
  ObjectNameMatchSetIsSearching = '[ObjectNameMatch] Set IsSearching',
  ObjectNameMatchResultsLoaded = '[ObjectNameMatch] Results Loaded',
  ObjectNameMatchFetchResults = '[ObjectNameMatch] Fetch Results',
  ObjectNameMatchSetResults = '[ObjectNameMatch] Set Results'
}

export class ObjectNameMatchFetchResults implements Action {
  readonly type = EObjectNameMatchActionTypes.ObjectNameMatchFetchResults;
  constructor(public payload: { searchTerm: string }) {}
}

export class ObjectNameMatchSetResults implements Action {
  readonly type = EObjectNameMatchActionTypes.ObjectNameMatchSetResults;
  constructor(public payload: { results: IObjectNameMatchResult[] }) {}
}

export class ObjectNameMatchSetIsLoading implements Action {
  readonly type = EObjectNameMatchActionTypes.ObjectNameMatchSetIsSearching;
  constructor(public payload: { value: boolean }) {}
}

export class ObjectNameMatchResultsLoaded implements Action {
  readonly type = EObjectNameMatchActionTypes.ObjectNameMatchResultsLoaded;
  constructor() {}
}

export type ObjectNameMatchActions =
  | ObjectNameMatchFetchResults
  | ObjectNameMatchSetResults
  | ObjectNameMatchSetIsLoading
  | ObjectNameMatchResultsLoaded;
