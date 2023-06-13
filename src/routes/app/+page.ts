import { best } from "@/lib/api/news";

export async function load({ fetch, parent }) {
  const { queryClient } = await parent();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["best"],
    queryFn: async () => best({ page: 1 }, fetch),
  });
}
