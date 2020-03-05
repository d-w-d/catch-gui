import { Injectable } from '@angular/core';

export const initialColumnState = {
  raDec: true,
  delta: true,
  rh: true,
  tmtp: true,
  trueanomaly: true,
  designation: true,
  dra: true,
  //
  airmass: false,
  archive_url: false,
  cutout_url: false,
  ddec: false,
  exposure: false,
  filter: false,
  instrument: false,
  jd: false,
  phase: false,
  productid: false,
  rdot: false,
  sangle: false,
  selong: false,
  unc_a: false,
  unc_b: false,
  unc_theta: false,
  vangle: false,
  vmag: false
};

export type TColName = keyof typeof initialColumnState;

export type TColInitState = typeof initialColumnState;

@Injectable({
  providedIn: 'root'
})
export class NeatInitialDataColumnsService {
  constructor() {}

  getOrderedColNames(): TColName[] {
    return Object.keys(initialColumnState) as any;
  }

  getInitColumnState(): TColInitState {
    return { ...initialColumnState };
  }
}

//

//

//

const shownColsInit = [
  //
  'raDec',
  'delta',
  'rh',
  'tmtp',
  'trueanomaly',
  'designation',
  'dra'
];

const hiddenColsInit = [
  'airmass',
  'archive_url',
  'cutout_url',
  'ddec',
  // 'dec',
  // 'delta',
  // 'designation',
  // 'dra',
  'exposure',
  'filter',
  'instrument',
  'jd',
  'phase',
  'productid',
  // 'ra',
  'rdot',
  // 'rh',
  'sangle',
  'selong',
  // 'tmtp',
  // 'trueanomaly',
  // 'thumbnail_url',
  'unc_a',
  'unc_b',
  'unc_theta',
  'vangle',
  'vmag'
];
