<script lang="ts">
  import { createGlanceQuery } from "@/lib/api/news";
  import Button from "@/lib/components/button.svelte";
  import Error from "@/lib/components/status/error.svelte";
  import Loading from "@/lib/components/status/loading.svelte";
  import { dedup } from "@/lib/utils";
  import { hoursSince } from "@/lib/utils/time";
  import { enter, exit } from "@/lib/utils/transition";
  import NewsBite from "./news-bite.svelte";
  import { glance } from "./stores";

  const query = createGlanceQuery();

  let direction: "top" | "bottom" = "top";

  $: items = dedup(
    $query.data?.pages?.flatMap(({ news }) => news) ?? [],
    ({ id }) => id
  );

  $: item = items.at($glance.current);
</script>

<svelte:head>
  <link rel="preload" as="image" href="/cover/news-1.webp" />
  <link rel="preload" as="image" href="/cover/news-2.webp" />
  <link rel="preload" as="image" href="/cover/news-3.webp" />
  <link rel="preload" as="image" href="/cover/jobs.webp" />
  <link rel="preload" as="image" href="/cover/ask.webp" />
  <link rel="preload" as="image" href="/cover/show.webp" />
  <title>Discover</title>
</svelte:head>

<div
  class="flex flex-col items-start justify-start h-[100vh] overflow-y-scroll w-full px-6 max-w-2xl bg-background md:border-x border-white/40"
  in:enter
  out:exit
>
  <div
    class="flex items-center justify-between pt-8 pb-4 p-2 z-30 sticky top-0 bg-background/75 backdrop-blur border-b border-black/50 w-full"
  >
    <h1 class="text-2xl font-bold text-text">Glance</h1>
    <Button
      class="text-text bg-background bg-accent/30 py-1 px-2 md:px-3 hover:bg-accent/50 active:bg-accent/50"
      on:click={async () => {
        await $query.refetch();
        glance.update(() => ({ current: 0, on: new Date() }));
      }}
    >
      <img class="w-4 md:w-5" src="/icons/shuffle.svg" alt="Shuffle" />
    </Button>
  </div>
  <div class="flex flex-col items-center justify-start w-full md:mt-6 flex-1">
    {#if $query.isLoading}
      <Loading />
    {:else if $query.error}
      <Error label="No news" error={$query.error} />
    {:else if !item}
      <Error label="No news" error={"No curated news"} />
    {:else}
      {#key item.id}
        <NewsBite
          {item}
          bind:direction
          on:next={() => {
            if (items.length - $glance.current <= 10) {
              $query.fetchNextPage();
            }
            glance.update(({ current, on }) => {
              const next = Math.min(current + 1, items.length - 1);
              const stale = hoursSince(on) > 3;
              return {
                current: !stale ? next : 0,
                on: new Date(),
              };
            });
          }}
          on:prev={() => {
            glance.update(({ current, on }) => {
              const prev = Math.max(current - 1, 0);
              const stale = hoursSince(on) > 3;
              return {
                current: !stale ? prev : 0,
                on: new Date(),
              };
            });
          }}
        />
      {/key}
    {/if}
  </div>
</div>
