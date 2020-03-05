import { createSelector } from '@ngrx/store';

import { AppState } from '../reducers';
import { IScreenDeviceSubstate } from '../reducers/screen-device-reducer/screen-device.reducer';

/**
 *
 * Elemental Screen-Device Selectors
 *
 */

export const selectScreenDeviceSubstate = createSelector(
  (state: AppState) => state.screenDevice,
  (substate: IScreenDeviceSubstate) => substate
);
