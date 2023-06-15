<script lang="ts">
  import { discover } from "@/lib/api/news";
  import { dedup } from "@/lib/utils";
  import { enter, exit } from "@/lib/utils/transition";
  import { createInfiniteQuery } from "@tanstack/svelte-query";
  import NewsBite from "./news-bite.svelte";
  import { index } from "./stores";

  const query = createInfiniteQuery({
    queryKey: ["best"],
    queryFn: ({ pageParam }) => discover({ page: pageParam }),
    getNextPageParam: ({ page }) => page + 1,
  });

  let direction: "top" | "bottom" = "top";

  $: items = dedup(
    $query.data?.pages?.flatMap(({ feeds }) => feeds) ?? [],
    ({ id }) => id
  );

  $: item = items.at($index);
</script>

<svelte:head>
  <title>Discover</title>
</svelte:head>

<div
  class="flex flex-col mt-6 items-start justify-start h-[100vh] overflow-y-scroll w-full px-6 max-w-2xl bg-background md:border-x border-white/40"
  in:enter
  out:exit
>
  <h1
    class="pt-8 pb-4 p-2 text-2xl font-bold z-20 sticky top-0 bg-background/75 text-text backdrop-blur border-b border-black/50 w-full"
  >
    Discover
  </h1>
  <div class="flex flex-col items-center justify-start w-full md:mt-6 flex-1">
    {#if $query.isLoading}
      <div class="flex flex-col items-center justify-center w-full py-6 h-4/5">
        <span class="font-semibold text-lg text-text">Loading</span>
        <span class="font-bold text-text/75 animate-pulse text-xl md:text-2xl">
          ...
        </span>
      </div>
    {:else if $query.error}
      <div class="flex flex-col items-center justify-center w-full py-6 h-4/5">
        <span class="font-semibold text-lg text-text">No news</span>
        <span class="font-medium text-text/75">
          Error: {$query.error?.toString()}
        </span>
      </div>
    {:else if !item}
      <div
        class="flex flex-col items-center justify-center w-full py-6 h-4/5"
      />
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
</div>
