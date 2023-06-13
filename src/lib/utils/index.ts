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
