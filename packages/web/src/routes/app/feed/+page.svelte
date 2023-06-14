<script lang="ts">
  import { news } from "@/lib/api/news";
  import { dedup } from "@/lib/utils";
  import { enter, exit } from "@/lib/utils/transition";
  import { createInfiniteQuery } from "@tanstack/svelte-query";
  import Feed from "./feed.svelte";
  import LastFeed from "./last-feed.svelte";
  import Latest from "./latest.svelte";

  const query = createInfiniteQuery({
    queryKey: ["news"],
    queryFn: ({ pageParam }) => news({ page: pageParam }),
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
  class="flex flex-col mt-6 items-start justify-start h-[100vh] overflow-y-scroll w-full px-6 max-w-2xl bg-white md:border-x"
  bind:this={view}
  in:enter
  out:exit
>
  <h1
    class="pt-8 pb-4 p-2 text-2xl font-bold sticky top-0 bg-white/75 backdrop-blur border-b border-black/50 w-full"
  >
    Feeds
  </h1>
  {#if $query.isLoading || $query.isInitialLoading}
    <span>Loading ...</span>
  {:else if $query.error}
    <span>Error: {$query.error?.toString()}</span>
  {:else if paginated.length === 0}
    <div class="flex flex-col items-center justify-center w-full py-6 h-4/5">
      <span class="font-semibold text-lg">No news</span>
      <span class="font-medium text-black/75">
        There's nothing at the moment
      </span>
    </div>
  {:else}
    {@const [latest, ...rest] = paginated}
    <div class="flex flex-col items-center justify-center w-full py-6 divide-y">
      <div class="flex flex-col items-center justify-center w-full p-2 md:p-4">
        <div
          class="flex w-full items-center justify-start font-semibold text-lg"
        >
          Latest
        </div>
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
