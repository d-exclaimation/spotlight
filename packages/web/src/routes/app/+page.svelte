<script lang="ts">
  import { best } from "@/lib/api/news";
  import { dedup } from "@/lib/utils";
  import { enter, exit } from "@/lib/utils/transition";
  import { createInfiniteQuery } from "@tanstack/svelte-query";
  import NewsBite from "./news-bite.svelte";
  import { index } from "./stores";

  const query = createInfiniteQuery({
    queryKey: ["best"],
    queryFn: ({ pageParam }) => best({ page: pageParam }),
    getNextPageParam: ({ page }) => page + 1,
  });

  let direction: "top" | "bottom" = "top";

  $: items = dedup(
    $query.data?.pages?.flatMap(({ feeds }) => feeds) ?? [],
    ({ id }) => id
  );

  $: item = items.at($index);
</script>

<div class="relative max-w-lg w-[90vw] h-[75vh]" in:enter out:exit>
  {#if $query.isLoading}
    <span>Loading ...</span>
  {:else if $query.error}
    <span>Error: {$query.error?.toString()}</span>
  {:else if !item}
    <div class="flex flex-col items-center justify-center w-full py-6 h-4/5" />
  {:else}
    {#key item.id}
      <NewsBite
        {item}
        bind:direction
        on:next={() => {
          if (items.length - $index <= 10) {
            $query.fetchNextPage();
          }
          index.update((prev) => Math.min(prev + 1, items.length - 1));
        }}
        on:prev={() => {
          index.update((prev) => Math.max(prev - 1, 0));
        }}
      />
    {/key}
  {/if}
</div>
<div class="h-16 flex items-center w-full justify-center" />
