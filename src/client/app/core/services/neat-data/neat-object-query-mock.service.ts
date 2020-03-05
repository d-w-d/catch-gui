import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { INeatObjectQueryResult } from '@client/app/models/neat-object-query-result.model';

@Injectable({
  providedIn: 'root'
})
export class NeatObjectQueryMockService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Ping initial route to determine if data for object is cached or queued
   */
  queryNeatObject(objid: string, isRefreshed?: boolean): Observable<INeatObjectQueryResult[]> {
    return of(mockResults.filter((el, ind) => ind < 300));
  }

  getNeatResultLabels() {
    return of(mockResultLabels);
  }
}

const mockResults = [
  {
    airmass: 1.286419,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/geodss/data/g19971029/obsdata/971029075300a.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_G19971029_OBSDATA_971029075300A_ra003.89353_dec-11.18274_5arcmin.fits',
    ddec: 2.388227,
    dec: -11.18274,
    delta: 2.66371705372096,
    designation: '65P',
    dra: -17.7199,
    exposure: 20,
    filter: 'NONE',
    instrument: 'NEAT-MAUI CAMERA',
    jd: 2450750.82858796,
    phase: 10.1765,
    productid: 'G19971029_OBSDATA_971029075300A',
    ra: 3.89353,
    rdot: 5.0897386,
    rh: 3.496305973636,
    sangle: 230.852,
    selong: 141.5234,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_G19971029_OBSDATA_971029075300A_ra003.89353_dec-11.18274_5arcmin_thumb.jpg',
    tmtp: 462.85094978055,
    trueanomaly: 103.54231695422,
    unc_a: 0.424,
    unc_b: 0.327,
    unc_theta: 26.572,
    vangle: 62.139,
    vmag: 17.13
  },
  {
    airmass: 1.307821,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/geodss/data/g19971029/obsdata/971029075156a.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_G19971029_OBSDATA_971029075156A_ra003.89362_dec-11.18275_5arcmin.fits',
    ddec: 2.387228,
    dec: -11.18275,
    delta: 2.66370836474123,
    designation: '65P',
    dra: -17.72,
    exposure: 20,
    filter: 'NONE',
    instrument: 'NEAT-MAUI CAMERA',
    jd: 2450750.82784722,
    phase: 10.1763,
    productid: 'G19971029_OBSDATA_971029075156A',
    ra: 3.89362,
    rdot: 5.0897409,
    rh: 3.496303796326,
    sangle: 230.851,
    selong: 141.5241,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_G19971029_OBSDATA_971029075156A_ra003.89362_dec-11.18275_5arcmin_thumb.jpg',
    tmtp: 462.850207653362,
    trueanomaly: 103.542209099514,
    unc_a: 0.424,
    unc_b: 0.327,
    unc_theta: 26.572,
    vangle: 62.139,
    vmag: 17.13
  },
  {
    airmass: 1.28431,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/geodss/data/g19971029/obsdata/971029074044a.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_G19971029_OBSDATA_971029074044A_ra003.89455_dec-11.18287_5arcmin.fits',
    ddec: 2.376757,
    dec: -11.18287,
    delta: 2.66361718908494,
    designation: '65P',
    dra: -17.7208,
    exposure: 20,
    filter: 'NONE',
    instrument: 'NEAT-MAUI CAMERA',
    jd: 2450750.82006945,
    phase: 10.1746,
    productid: 'G19971029_OBSDATA_971029074044A',
    ra: 3.89455,
    rdot: 5.0897651,
    rh: 3.496280934497,
    sangle: 230.846,
    selong: 141.5322,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_G19971029_OBSDATA_971029074044A_ra003.89455_dec-11.18287_5arcmin_thumb.jpg',
    tmtp: 462.842415316496,
    trueanomaly: 103.541076616316,
    unc_a: 0.424,
    unc_b: 0.327,
    unc_theta: 26.573,
    vangle: 62.138,
    vmag: 17.13
  },
  {
    airmass: 1.305257,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/geodss/data/g19971029/obsdata/971029073726a.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_G19971029_OBSDATA_971029073726A_ra003.89483_dec-11.18291_5arcmin.fits',
    ddec: 2.37368,
    dec: -11.18291,
    delta: 2.66359034523139,
    designation: '65P',
    dra: -17.7206,
    exposure: 20,
    filter: 'NONE',
    instrument: 'NEAT-MAUI CAMERA',
    jd: 2450750.81777778,
    phase: 10.1741,
    productid: 'G19971029_OBSDATA_971029073726A',
    ra: 3.89483,
    rdot: 5.0897723,
    rh: 3.496274198402,
    sangle: 230.844,
    selong: 141.5345,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_G19971029_OBSDATA_971029073726A_ra003.89483_dec-11.18291_5arcmin_thumb.jpg',
    tmtp: 462.840119360015,
    trueanomaly: 103.540742935471,
    unc_a: 0.424,
    unc_b: 0.327,
    unc_theta: 26.573,
    vangle: 62.138,
    vmag: 17.13
  },
  {
    airmass: 1.281664,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/geodss/data/g19971029/obsdata/971029072537a.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_G19971029_OBSDATA_971029072537A_ra003.89582_dec-11.18304_5arcmin.fits',
    ddec: 2.362701,
    dec: -11.18304,
    delta: 2.66349429827879,
    designation: '65P',
    dra: -17.7187,
    exposure: 20,
    filter: 'NONE',
    instrument: 'NEAT-MAUI CAMERA',
    jd: 2450750.80957176,
    phase: 10.1722,
    productid: 'G19971029_OBSDATA_971029072537A',
    ra: 3.89582,
    rdot: 5.0897978,
    rh: 3.496250077643,
    sangle: 230.839,
    selong: 141.543,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_G19971029_OBSDATA_971029072537A_ra003.89582_dec-11.18304_5arcmin_thumb.jpg',
    tmtp: 462.831897976343,
    trueanomaly: 103.53954807702,
    unc_a: 0.424,
    unc_b: 0.327,
    unc_theta: 26.573,
    vangle: 62.138,
    vmag: 17.13
  },
  {
    airmass: 1.302671,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/geodss/data/g19971029/obsdata/971029072300a.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_G19971029_OBSDATA_971029072300A_ra003.89604_dec-11.18307_5arcmin.fits',
    ddec: 2.36028,
    dec: -11.18307,
    delta: 2.66347304574407,
    designation: '65P',
    dra: -17.718,
    exposure: 20,
    filter: 'NONE',
    instrument: 'NEAT-MAUI CAMERA',
    jd: 2450750.80775463,
    phase: 10.1718,
    productid: 'G19971029_OBSDATA_971029072300A',
    ra: 3.89604,
    rdot: 5.0898035,
    rh: 3.496244736359,
    sangle: 230.838,
    selong: 141.5449,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_G19971029_OBSDATA_971029072300A_ra003.89604_dec-11.18307_5arcmin_thumb.jpg',
    tmtp: 462.830077444669,
    trueanomaly: 103.539283487026,
    unc_a: 0.424,
    unc_b: 0.327,
    unc_theta: 26.573,
    vangle: 62.138,
    vmag: 17.13
  },
  {
    airmass: 1.170443,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/geodss/data/g19971002/obsdata/971002113659a.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_G19971002_OBSDATA_971002113659A_ra008.14371_dec-10.75114_5arcmin.fits',
    ddec: -6.91818,
    dec: -10.75114,
    delta: 2.43853448306396,
    designation: '65P',
    dra: -28.3341,
    exposure: 20,
    filter: 'NONE',
    instrument: 'NEAT-MAUI CAMERA',
    jd: 2450723.98413195,
    phase: 4.1919,
    productid: 'G19971002_OBSDATA_971002113659A',
    ra: 8.14371,
    rdot: 5.1629229,
    rh: 3.416803420508,
    sangle: 181.789,
    selong: 165.5405,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_G19971002_OBSDATA_971002113659A_ra008.14371_dec-10.75114_5arcmin_thumb.jpg',
    tmtp: 435.95684586186,
    trueanomaly: 99.5432276528662,
    unc_a: 0.457,
    unc_b: 0.358,
    unc_theta: 28.323,
    vangle: 60.779,
    vmag: 16.87
  },
  {
    airmass: 1.170389,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/geodss/data/g19971002/obsdata/971002112309a.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_G19971002_OBSDATA_971002112309A_ra008.14556_dec-10.75069_5arcmin.fits',
    ddec: -6.9305,
    dec: -10.75069,
    delta: 2.43848825593617,
    designation: '65P',
    dra: -28.3531,
    exposure: 20,
    filter: 'NONE',
    instrument: 'NEAT-MAUI CAMERA',
    jd: 2450723.97452546,
    phase: 4.1907,
    productid: 'G19971002_OBSDATA_971002112309A',
    ra: 8.14556,
    rdot: 5.1629451,
    rh: 3.416774776266,
    sangle: 181.747,
    selong: 165.545,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_G19971002_OBSDATA_971002112309A_ra008.14556_dec-10.75069_5arcmin_thumb.jpg',
    tmtp: 435.947221649345,
    trueanomaly: 99.5417631889152,
    unc_a: 0.457,
    unc_b: 0.358,
    unc_theta: 28.324,
    vangle: 60.778,
    vmag: 16.87
  },
  {
    airmass: 1.170283,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/geodss/data/g19971002/obsdata/971002110736a.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_G19971002_OBSDATA_971002110736A_ra008.14763_dec-10.75019_5arcmin.fits',
    ddec: -6.94458,
    dec: -10.75019,
    delta: 2.43843648768196,
    designation: '65P',
    dra: -28.3707,
    exposure: 20,
    filter: 'NONE',
    instrument: 'NEAT-MAUI CAMERA',
    jd: 2450723.96372685,
    phase: 4.1893,
    productid: 'G19971002_OBSDATA_971002110736A',
    ra: 8.14763,
    rdot: 5.1629701,
    rh: 3.416742577247,
    sangle: 181.7,
    selong: 165.55,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_G19971002_OBSDATA_971002110736A_ra008.14763_dec-10.75019_5arcmin_thumb.jpg',
    tmtp: 435.936403112486,
    trueanomaly: 99.5401169617469,
    unc_a: 0.457,
    unc_b: 0.358,
    unc_theta: 28.325,
    vangle: 60.777,
    vmag: 16.87
  },
  {
    airmass: 1.055584,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/tricam/data/p20020121/obsdata/20020121134124c.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_P20020121_OBSDATA_20020121134124C_ra177.50992_dec+15.25081_5arcmin.fits',
    ddec: 9.806215,
    dec: 15.25081,
    delta: 2.83316207913418,
    designation: '65P',
    dra: -2.62949,
    exposure: 60,
    filter: 'NONE',
    instrument: 'NEAT PALOMAR TRI-CAMERA',
    jd: 2452296.07076389,
    phase: 12.5924,
    productid: 'P20020121_OBSDATA_20020121134124C',
    ra: 177.50992,
    rdot: -5.0789921,
    rh: 3.531504469794,
    sangle: 103.479,
    selong: 128.5529,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_P20020121_OBSDATA_20020121134124C_ra177.50992_dec+15.25081_5arcmin_thumb.jpg',
    tmtp: -475.336293928791,
    trueanomaly: 254.188434036943,
    unc_a: 4.967,
    unc_b: 0.359,
    unc_theta: -25.65,
    vangle: 116.105,
    vmag: 17.3
  },
  {
    airmass: 1.055449,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/tricam/data/p20020121/obsdata/20020121132624c.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_P20020121_OBSDATA_20020121132624C_ra177.51011_dec+15.25013_5arcmin.fits',
    ddec: 9.813682,
    dec: 15.25013,
    delta: 2.83330835777693,
    designation: '65P',
    dra: -2.64437,
    exposure: 60,
    filter: 'NONE',
    instrument: 'NEAT PALOMAR TRI-CAMERA',
    jd: 2452296.06034722,
    phase: 12.5942,
    productid: 'P20020121_OBSDATA_20020121132624C',
    ra: 177.51011,
    rdot: -5.0789549,
    rh: 3.53153502803,
    sangle: 103.483,
    selong: 128.5424,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_P20020121_OBSDATA_20020121132624C_ra177.51011_dec+15.25013_5arcmin_thumb.jpg',
    tmtp: -475.346711598802,
    trueanomaly: 254.186957116652,
    unc_a: 4.967,
    unc_b: 0.359,
    unc_theta: -25.651,
    vangle: 116.105,
    vmag: 17.3
  },
  {
    airmass: 1.038863,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/tricam/data/p20020222/obsdata/20020222123100c.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_P20020222_OBSDATA_20020222123100C_ra174.61904_dec+17.97786_5arcmin.fits',
    ddec: 13.74028,
    dec: 17.97786,
    delta: 2.49056229182258,
    designation: '65P',
    dra: -23.1321,
    exposure: 60,
    filter: 'NONE',
    instrument: 'NEAT PALOMAR TRI-CAMERA',
    jd: 2452328.021875,
    phase: 5.6609,
    productid: 'P20020222_OBSDATA_20020222123100C',
    ra: 174.61904,
    rdot: -5.1795403,
    rh: 3.436802850562,
    sangle: 69.569,
    selong: 159.9733,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_P20020222_OBSDATA_20020222123100C_ra174.61904_dec+17.97786_5arcmin_thumb.jpg',
    tmtp: -443.383321159519,
    trueanomaly: 258.843263822261,
    unc_a: 5.65,
    unc_b: 0.393,
    unc_theta: -24.107,
    vangle: 114.76,
    vmag: 16.93
  },
  {
    airmass: 1.038667,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/tricam/data/p20020222/obsdata/20020222121552c.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_P20020222_OBSDATA_20020222121552C_ra174.62074_dec+17.97690_5arcmin.fits',
    ddec: 13.75189,
    dec: 17.9769,
    delta: 2.49063085033132,
    designation: '65P',
    dra: -23.1647,
    exposure: 60,
    filter: 'NONE',
    instrument: 'NEAT PALOMAR TRI-CAMERA',
    jd: 2452328.01136574,
    phase: 5.6632,
    productid: 'P20020222_OBSDATA_20020222121552C',
    ra: 174.62074,
    rdot: -5.179512,
    rh: 3.436834289426,
    sangle: 69.596,
    selong: 159.9648,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_P20020222_OBSDATA_20020222121552C_ra174.62074_dec+17.97690_5arcmin_thumb.jpg',
    tmtp: -443.393830854446,
    trueanomaly: 258.841690283337,
    unc_a: 5.65,
    unc_b: 0.393,
    unc_theta: -24.107,
    vangle: 114.76,
    vmag: 16.93
  },
  {
    airmass: 1.038482,
    archive_url:
      'https://musforti.astro.umd.edu/catch-images/xxx/neat/tricam/data/p20020222/obsdata/20020222120052c.fits',
    cutout_url:
      'https://musforti.astro.umd.edu/catch-images/yyy/65P_P20020222_OBSDATA_20020222120052C_ra174.62244_dec+17.97594_5arcmin.fits',
    ddec: 13.76413,
    dec: 17.97594,
    delta: 2.49069893970196,
    designation: '65P',
    dra: -23.1946,
    exposure: 60,
    filter: 'NONE',
    instrument: 'NEAT PALOMAR TRI-CAMERA',
    jd: 2452328.00094907,
    phase: 5.6655,
    productid: 'P20020222_OBSDATA_20020222120052C',
    ra: 174.62244,
    rdot: -5.1794841,
    rh: 3.436865451122,
    sangle: 69.623,
    selong: 159.9563,
    thumbnail_url:
      'https://musforti.astro.umd.edu/catch-images/zzz/65P_P20020222_OBSDATA_20020222120052C_ra174.62244_dec+17.97594_5arcmin_thumb.jpg',
    tmtp: -443.404247950763,
    trueanomaly: 258.84013063711,
    unc_a: 5.65,
    unc_b: 0.393,
    unc_theta: -24.108,
    vangle: 114.761,
    vmag: 16.93
  }
];

const mockResultLabels = {
  airmass: {
    description: 'Observation airmass',
    fractionSize: 1,
    label: 'Airmass'
  },
  archive_url: {
    description: 'Full frame image from data archive',
    label: 'Archive URL'
  },
  cutout_url: {
    description: 'Cutout image around target ephemeris',
    label: 'Cutout URL'
  },
  ddec: {
    description: 'Declination rate of change: dDec/dt (arcsec/hr)',
    fractionSize: 2,
    label: 'd[Dec]/dt'
  },
  dec: {
    description: 'Object Declination (deg)',
    fractionSize: 4,
    label: 'Dec'
  },
  delta: {
    description: 'Observer-target distance (au)',
    fractionSize: 3,
    label: 'Δ'
  },
  designation: {
    description: 'Object designation',
    label: 'Designation'
  },
  dra: {
    description: 'Right Ascension rate of change: dRA/dt cos(Dec) (arcsec/hr)',
    fractionSize: 2,
    label: 'd[RA]/dt'
  },
  exposure: {
    description: 'Exposure time',
    fractionSize: 0,
    label: 'Exp'
  },
  filter: {
    description: 'Filter name',
    label: 'Filter'
  },
  instrument: {
    description: 'NEAT instrument name',
    label: 'Instrument'
  },
  jd: {
    description: 'Mid-time of the observation as a Julian Date (UT)',
    fractionSize: 4,
    label: 'Date'
  },
  phase: {
    description: 'Sun-observer-target angle (deg)',
    fractionSize: 1,
    label: 'Phase'
  },
  productid: {
    description: 'Unique NEAT product ID',
    label: 'Product ID'
  },
  ra: {
    description: 'Object Right Ascension (deg)',
    fractionSize: 4,
    label: 'RA'
  },
  rdot: {
    description: 'Heliocentric radial velocity (km/s)',
    fractionSize: 1,
    label: 'd[rh]/dt'
  },
  rh: {
    description: 'Heliocentric distance (au)',
    fractionSize: 3,
    label: 'rh'
  },
  sangle: {
    description: 'Position angle of projected target-Sun vector, east of Celestial north (deg)',
    fractionSize: 0,
    label: 'PA(⊙)'
  },
  selong: {
    description: 'Solar elongation (deg)',
    fractionSize: 0,
    label: 'E(⊙)'
  },
  tmtp: {
    description: 'Time to nearest perihelion based on osculating orbital elements (days)',
    fractionSize: 1,
    label: 'T-Tₚ'
  },
  trueanomaly: {
    description: 'True anomaly based on osculating orbital elements (deg)',
    fractionSize: 1,
    label: 'ν'
  },
  unc_a: {
    description: 'Error ellipse semi-major axis (arcsec)',
    fractionSize: 2,
    label: 'σ(a)'
  },
  unc_b: {
    description: 'Error ellipse semi-minor axis (arcsec)',
    fractionSize: 2,
    label: 'σ(b)'
  },
  unc_theta: {
    description: 'Error ellipse position angle (deg)',
    fractionSize: 0,
    label: 'σ(θ)'
  },
  vangle: {
    description:
      'Position angle of projected target velocity   vector, east of Celestial north (deg)',
    fractionSize: 0,
    label: 'PA(v)'
  },
  vmag: {
    description: 'Predicted V-band brightness (mag)',
    fractionSize: 1,
    label: 'V'
  }
};
