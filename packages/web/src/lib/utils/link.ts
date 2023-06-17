/**
 * Fix links to be absolute
 */
export function link(url: string) {
  if (url.startsWith("/item?")) {
    return `https://news.ycombinator.com${url}`;
  }
  if (url.startsWith("item?")) {
    return `https://news.ycombinator.com/${url}`;
  }
  return url;
}
