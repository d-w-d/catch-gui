import { Action } from '@ngrx/store';
import { INeatObjectQueryResult } from 'src/client/app/models/neat-object-query-result.model';
import {
  INeatObjectQueryResultLabels,
  INeatObjectQueryStatus
} from 'src/client/app/models/neat-object-query-result-labels.model';
import { TColInitState } from '@client/app/core/services/neat-data/neat-initial-data-columns.service';

export enum ENeatObjectQueryActionTypes {
  NeatObjectQuerySetStatus = '[NeatObjectQuery] Set Status',
  NeatObjectQueryResultsLoaded = '[NeatObjectQuery] Results Loaded',
  NeatObjectQueryFetchResults = '[NeatObjectQuery] Fetch Results',
  NeatObjectQueryFetchResultLabels = '[NeatObjectQuery] Fetch Result Labels',
  NeatObjectQuerySetResults = '[NeatObjectQuery] Set Results',
  NeatObjectQuerySetSelectedResultIndex = '[NeatObjectQuery] Set Selected Result Index',
  NeatObjectQuerySetResultLabels = '[NeatObjectQuery] Set Labels',
  NeatObjectQuerySetColumnState = '[NeatObjectQuery] Set Column State'
}

export class NeatObjectQuerySetColumnState implements Action {
  readonly type = ENeatObjectQueryActionTypes.NeatObjectQuerySetColumnState;
  constructor(public payload: { newColState: TColInitState }) {
    console.log('public payload', this.payload);
  }
}

export class NeatObjectQueryFetchResults implements Action {
  readonly type = ENeatObjectQueryActionTypes.NeatObjectQueryFetchResults;
  constructor(public payload: { objectName: string; isRefreshed?: boolean }) {}
}

export class NeatObjectQueryFetchResultLabels implements Action {
  readonly type = ENeatObjectQueryActionTypes.NeatObjectQueryFetchResultLabels;
  constructor() {}
}

export class NeatObjectQuerySetSelectedResultIndex implements Action {
  readonly type = ENeatObjectQueryActionTypes.NeatObjectQuerySetSelectedResultIndex;
  constructor(public payload: { index: number }) {}
}

export class NeatObjectQuerySetResults implements Action {
  readonly type = ENeatObjectQueryActionTypes.NeatObjectQuerySetResults;
  constructor(public payload: { neatObjectQueryResults: INeatObjectQueryResult[] }) {}
}

export class NeatObjectQuerySetResultLabels implements Action {
  readonly type = ENeatObjectQueryActionTypes.NeatObjectQuerySetResultLabels;
  constructor(public payload: { neatObjectQueryResultLabels: INeatObjectQueryResultLabels }) {}
}

export class NeatObjectQuerySetStatus implements Action {
  readonly type = ENeatObjectQueryActionTypes.NeatObjectQuerySetStatus;
  constructor(public payload: INeatObjectQueryStatus) {}
}

export class NeatObjectQueryResultsLoaded implements Action {
  readonly type = ENeatObjectQueryActionTypes.NeatObjectQueryResultsLoaded;
  constructor() {}
}

export type NeatObjectQueryActions =
  | NeatObjectQueryFetchResults
  | NeatObjectQueryFetchResultLabels
  | NeatObjectQuerySetResults
  | NeatObjectQuerySetResultLabels
  | NeatObjectQuerySetStatus
  | NeatObjectQuerySetSelectedResultIndex
  | NeatObjectQueryResultsLoaded
  | NeatObjectQuerySetColumnState;
