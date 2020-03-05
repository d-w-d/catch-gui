export function sleep(ms: number) {
  const maxSetTimeoutTime = 2147483647;
  return new Promise(resolve =>
    setTimeout(resolve, ms > maxSetTimeoutTime ? maxSetTimeoutTime : ms)
  );
}
