/**
 * Remove duplicate items from an array by key function
 * @param arr The array to deduplicate
 * @param key The key function to use to determine uniqueness
 * @returns A deduplicated array
 */
export function dedup<T, K extends number | string>(
  arr: T[],
  key: (data: T) => K
) {
  const check = new Set<K>();
  return arr.filter((item) => {
    if (check.has(key(item))) {
      return false;
    }
    check.add(key(item));
    return true;
  });
}

/**
 * Clamp a number between a min and max value
 * @param x Given number
 * @param min The minimum value
 * @param max The maximum value
 * @returns A clamped number
 */
export function clamp(x: number, min: number, max: number) {
  return Math.min(max, Math.max(min, x));
}
