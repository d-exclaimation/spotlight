/**
 * Returns the number of hours since the given date.
 * @param date The date to compare to.
 * @returns The number of hours as an integer (rounded down)
 */
export function hoursSince(date: Date) {
  const diff = new Date().getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60));
}

/**
 * Returns the number of minutes since the given date.
 * @param date The date to compare to.
 * @returns The number of minutes as an integer (rounded down)
 */
export function minutesSince(date: Date) {
  const diff = new Date().getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60));
}
