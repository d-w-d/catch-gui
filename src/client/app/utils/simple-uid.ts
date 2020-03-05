let count = 0;

/**
 * Super simple mechanism for generating ids that are unique
 * throughout the lifetime of the running app
 */
export function simpleUid() {
  count++;
  return '_uid_' + count;
}
