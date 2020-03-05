import { ScreenDeviceActions, EScreenDeviceActionTypes } from '../../actions/screen-device.actions';
import { IScreenDevice } from 'src/client/app/models/screen-device.model';
import { getDevice } from '@client/app/utils/get-device';

export interface IScreenDeviceSubstate extends IScreenDevice {}

export const initialState: IScreenDeviceSubstate = {
  device: getDevice(),
  screenWidthPxls: window.outerWidth
};

export function ScreenDeviceReducer(
  state = initialState,
  action: ScreenDeviceActions
): IScreenDeviceSubstate {
  switch (action.type) {
    case EScreenDeviceActionTypes.ScreenDeviceSetDevice:
      return {
        ...state,
        device: action.payload.device
      };

    case EScreenDeviceActionTypes.ScreenDeviceSetScreenWidth:
      return {
        ...state,
        screenWidthPxls: action.payload.width
      };

    default:
      return state;
  }
}
