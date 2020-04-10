export type TDevices = 'mobile' | 'tablet' | 'desktop';

export interface IScreenDevice {
  device: TDevices;
  layout: 'auto' | TDevices;
  screenWidthPxls: number;
}
