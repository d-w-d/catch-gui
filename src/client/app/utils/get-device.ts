import { IScreenDevice } from '../models/screen-device.model';
import { isMobile } from './is-mobile';

const tabletDesktopDivisor = 900;

export const getDevice = (): IScreenDevice['device'] => {
  if (isMobile()) return 'mobile';
  return window.innerWidth < tabletDesktopDivisor ? 'tablet' : 'desktop';
};
