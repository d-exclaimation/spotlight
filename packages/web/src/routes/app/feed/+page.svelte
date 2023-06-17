<script lang="ts">
  import { createFeedsQuery } from "@/lib/api/news";
  import Error from "@/lib/components/status/error.svelte";
  import Loading from "@/lib/components/status/loading.svelte";
  import { dedup } from "@/lib/utils";
  import { enter, exit } from "@/lib/utils/transition";
  import BubbleFeed from "./bubble-feed.svelte";
  import Feed from "./feed.svelte";
  import LastFeed from "./last-feed.svelte";

  const query = createFeedsQuery();

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
    <Loading />
  {:else if $query.error}
    <Error label="No news" error={$query.error} />
  {:else if paginated.length === 0}
    <div class="flex flex-col items-center justify-center w-full py-6 h-4/5">
      <span class="font-semibold text-lg text-text">No news</span>
      <span class="font-medium text-text/75">
        There's nothing at the moment
      </span>
    </div>
  {:else}
    <div
      class="flex flex-col items-center justify-center w-full divide-y divide-white/40"
    >
      {#each paginated as item, i (item.id)}
        {#if i % 8 === 0}
          <div
            class="flex flex-col items-center justify-center w-full p-2 md:p-4"
          >
            <BubbleFeed {item} />
          </div>
        {:else if paginated.length - i < 8}
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
