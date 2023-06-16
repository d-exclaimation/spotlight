<script lang="ts">
  import { feeds } from "@/lib/api/news";
  import { dedup } from "@/lib/utils";
  import { enter, exit } from "@/lib/utils/transition";
  import { createInfiniteQuery } from "@tanstack/svelte-query";
  import Feed from "./feed.svelte";
  import LastFeed from "./last-feed.svelte";
  import Latest from "./latest.svelte";

  const query = createInfiniteQuery({
    queryKey: ["news"],
    queryFn: ({ pageParam }) => feeds({ page: pageParam }),
    getNextPageParam: ({ page }) => page + 1,
  });

  $: paginated = dedup(
    $query.data?.pages?.flatMap(({ feeds }) => feeds) ?? [],
    ({ id }) => id
  );

  let view: HTMLDivElement;
</script>

<svelte:head>
  <title>Feeds</title>
</svelte:head>

<div
  class="flex flex-col items-start justify-start h-[100vh] overflow-y-scroll w-full px-6 max-w-2xl bg-background md:border-x border-white/40"
  bind:this={view}
  in:enter
  out:exit
>
  <h1
    class="pt-8 pb-4 p-2 text-2xl z-20 font-bold sticky top-0 bg-background/75 text-text backdrop-blur border-b border-black/50 w-full"
  >
    Feeds
  </h1>
  {#if $query.isLoading || $query.isInitialLoading}
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
  {:else if paginated.length === 0}
    <div class="flex flex-col items-center justify-center w-full py-6 h-4/5">
      <span class="font-semibold text-lg text-text">No news</span>
      <span class="font-medium text-text/75">
        There's nothing at the moment
      </span>
    </div>
  {:else}
    {@const [latest, ...rest] = paginated}
    <div
      class="flex flex-col items-center justify-center w-full divide-y divide-white/40"
    >
      <div class="flex flex-col items-center justify-center w-full p-2 md:p-4">
        <Latest {latest} />
      </div>
      {#each rest as item, i (item.id)}
        {#if rest.length - i < 5}
          <LastFeed
            root={view}
            {item}
            on:visible={() => {
              if ($query.isFetchingNextPage) return;
              $query.fetchNextPage({});
            }}
          />
        {:else}
          <Feed {item} />
        {/if}
      {/each}
      <div class="h-16 flex items-center w-full justify-center" />
    </div>
  {/if}
</div>
