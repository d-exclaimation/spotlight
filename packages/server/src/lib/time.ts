export function hoursSince(date: Date) {
  const diff = new Date().getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60));
}

export function minutesSince(date: Date) {
  const diff = new Date().getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60));
}
