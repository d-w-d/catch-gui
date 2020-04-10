export interface INeatObjectQueryResultLabel {
  fractionSize?: number;
  label: string;
  description: string;
}

export interface INeatObjectQueryResultLabels {
  airmass: INeatObjectQueryResultLabel;
  archive_url: INeatObjectQueryResultLabel;
  cutout_url: INeatObjectQueryResultLabel;
  ddec: INeatObjectQueryResultLabel;
  dec: INeatObjectQueryResultLabel;
  delta: INeatObjectQueryResultLabel;
  designation: INeatObjectQueryResultLabel;
  dra: INeatObjectQueryResultLabel;
  exposure: INeatObjectQueryResultLabel;
  filter: INeatObjectQueryResultLabel;
  instrument: INeatObjectQueryResultLabel;
  jd: INeatObjectQueryResultLabel;
  phase: INeatObjectQueryResultLabel;
  productid: INeatObjectQueryResultLabel;
  ra: INeatObjectQueryResultLabel;
  raDec?: INeatObjectQueryResultLabel;
  rdot: INeatObjectQueryResultLabel;
  rh: INeatObjectQueryResultLabel;
  sangle: INeatObjectQueryResultLabel;
  selong: INeatObjectQueryResultLabel;
  thumbnail_url: INeatObjectQueryResultLabel;
  tmtp: INeatObjectQueryResultLabel;
  trueanomaly: INeatObjectQueryResultLabel;
  unc_a: INeatObjectQueryResultLabel;
  unc_b: INeatObjectQueryResultLabel;
  unc_theta: INeatObjectQueryResultLabel;
  vangle: INeatObjectQueryResultLabel;
  vmag: INeatObjectQueryResultLabel;
}

export interface INeatObjectQueryStatus {
  objid: string;
  message: string;
  code: 'searching' | 'found' | 'notfound' | 'unknown';
}
