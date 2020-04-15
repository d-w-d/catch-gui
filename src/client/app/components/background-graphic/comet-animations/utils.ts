/**
 * Supply coords for two-point vector, return vector's angle
 */
export function getAngleBetweenTwoPoints(x0: number, y0: number, x1: number, y1: number) {
  const a0 = Math.atan((y1 - y0) / (x1 - x0));
  if (x1 > x0) return a0;
  return a0 + Math.PI;
}
