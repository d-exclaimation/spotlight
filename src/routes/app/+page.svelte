<script lang="ts">
  import { best } from "@/lib/api/news";
  import { dedup } from "@/lib/utils";
  import { createInfiniteQuery } from "@tanstack/svelte-query";
  import NewsBite from "./news-bite.svelte";

  const query = createInfiniteQuery({
    queryKey: ["best"],
    queryFn: ({ pageParam }) => best({ page: pageParam }),
    getNextPageParam: ({ page }) => page + 1,
  });

  let index = 0;

  $: items = dedup(
    $query.data?.pages?.flatMap(({ feeds }) => feeds) ?? [],
    ({ id }) => id
  );

  $: item = items.at(index);
</script>

{#if $query.isLoading}
  <span>Loading ...</span>
{:else if $query.error}
  <span>Error: {$query.error?.toString()}</span>
{:else if !item}
  <div class="flex flex-col items-center justify-center w-full py-6 h-4/5" />
{:else}
  <div class="relative max-w-lg w-[90vw] h-[75vh]">
    {#key item.id}
      <NewsBite
        {item}
        on:swipe={(event) => {
          if (event.detail.direction === "top") {
            if (items.length - index <= 10) {
              $query.fetchNextPage();
            }
            index = Math.min(index + 1, items.length - 1);
          }
          if (event.detail.direction === "bottom") {
            index = Math.max(index - 1, 0);
          }
        }}
      />
    {/key}
  </div>
{/if}
<div class="h-16 flex items-center w-full justify-center" />
