export function degToHms(ra: number, dec: number) {
  //
  // Adapted from: http://www.bdnyc.org/2012/10/decimal-deg-to-hms/

  const ds = dec < 0 ? -1 : 1;
  dec = Math.abs(dec);
  const deg = Math.floor(dec);
  const decM = Math.abs(Math.floor((dec - deg) * 60));
  const decS = Math.floor((Math.abs((dec - deg) * 60) - decM) * 60);
  const DEC = `${ds * deg}:${decM}:${decS}`;

  const rs = ra < 0 ? -1 : 1;
  ra = Math.abs(ra);
  const raH = Math.floor(ra / 15);
  const raM = Math.floor((ra / 15 - raH) * 60);
  const raS = ((ra / 15 - raH) * 60 - raM) * 60;
  const RA = `${rs * raH}:${raM}:${raS}`;

  return [RA, DEC];
}
