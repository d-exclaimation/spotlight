import { news } from "@/lib/api/news";

export async function load({ fetch, parent }) {
  const { queryClient } = await parent();
  await queryClient.prefetchQuery({
    queryKey: ["news"],
    queryFn: async () => news(fetch),
  });
}
