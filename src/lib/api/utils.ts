type Fetch = typeof fetch;
export function query<T>(fn: (args: { fetch: Fetch }) => Promise<T>) {
  return async (_fetch: Fetch = fetch) => {
    return await fn({ fetch: _fetch });
  };
}
