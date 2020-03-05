import { Action } from '@ngrx/store';
import { IScreenDeviceSubstate } from '../reducers/screen-device-reducer/screen-device.reducer';

export enum EScreenDeviceActionTypes {
  ScreenDeviceSetDevice = '[ScreenDevice] Set Device',
  ScreenDeviceSetScreenWidth = '[ScreenDevice] Set Screen Width'
}

export class ScreenDeviceSetDevice implements Action {
  readonly type = EScreenDeviceActionTypes.ScreenDeviceSetDevice;
  constructor(public payload: { device: IScreenDeviceSubstate['device'] }) {}
}

export class ScreenDeviceSetScreenWidth implements Action {
  readonly type = EScreenDeviceActionTypes.ScreenDeviceSetScreenWidth;
  constructor(public payload: { width: number }) {}
}

export type ScreenDeviceActions = ScreenDeviceSetDevice | ScreenDeviceSetScreenWidth;
