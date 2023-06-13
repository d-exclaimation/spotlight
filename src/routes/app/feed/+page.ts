import { news } from "@/lib/api/news";

export async function load({ fetch, parent }) {
  const { queryClient } = await parent();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["news"],
    queryFn: async () => news(fetch, { page: 1 }),
  });
}
