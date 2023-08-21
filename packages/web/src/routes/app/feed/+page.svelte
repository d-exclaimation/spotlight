<script lang="ts">
  import { createFeedsQuery } from "@/lib/api/news";
  import Error from "@/lib/components/status/error.svelte";
  import Loading from "@/lib/components/status/loading.svelte";
  import { dedup } from "@/lib/utils";
  import BubbleFeed from "./bubble-feed.svelte";
  import Feed from "./feed.svelte";
  import InView from "./in-view.svelte";
  import LastFeed from "./last-feed.svelte";

  export let data;

  const title = "Feeds";
  const description = "A feed of latest news";
  const query = createFeedsQuery({
    initialData: data.initial,
  });

  $: paginated = dedup(
    $query.data?.pages?.flatMap(({ news }) => news) ?? [],
    ({ id }) => id
  );

  let view: HTMLDivElement;
</script>

<svelte:head>
  <title>{title}</title>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>

{#if $query.isLoading || $query.isInitialLoading}
  <div
    class="relative flex flex-col md:flex-row items-center justify-center md:justify-between w-full shrink-0 md:mt-6 flex-1"
  >
    <Loading />
  </div>
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
    class="flex flex-col items-center justify-start md:grid md:grid-cols-3 grid-flow-row-dense w-full gap-2 md:mt-3"
    bind:this={view}
  >
    {#each paginated as item, i (item.id)}
      {#if i == 0 || (item.points && item.points >= 10)}
        <BubbleFeed {item} />
      {:else if paginated.length - i < 3}
        <LastFeed
          root={view}
          {item}
          on:visible={() => {
            if ($query.isFetchingNextPage) return;
            $query.fetchNextPage();
          }}
        />
      {:else}
        <Feed {item} />
      {/if}
    {/each}
    <InView
      root={view}
      on:visible={() => {
        if ($query.isFetchingNextPage) return;
        $query.fetchNextPage();
      }}
    >
      <button
        class="h-16 flex items-center w-full justify-center text-text animate-pulse text-lg"
        disabled={$query.isFetchingNextPage}
        on:click={() => $query.fetchNextPage()}
      >
        {$query.isFetchingNextPage ? "..." : "Load more"}
      </button>
    </InView>
  </div>
{/if}
