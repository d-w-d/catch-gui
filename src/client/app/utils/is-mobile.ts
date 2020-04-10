/**
 * Test for whether to display for cell-phone devices
 * Taken from: https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
 */
export const isMobile = function isMobileDevice() {
  const result =
    typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
  return result;
};
