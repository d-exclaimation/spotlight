<script lang="ts">
  import { createGlanceQuery } from "@/lib/api/news";
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
  <h1
    class="pt-8 pb-4 p-2 text-2xl font-bold z-30 sticky top-0 bg-background/75 text-text backdrop-blur border-b border-black/50 w-full"
  >
    Glance
  </h1>
  <div class="flex flex-col items-center justify-start w-full md:mt-6 flex-1">
    {#if $query.isLoading}
      <Loading />
    {:else if $query.error}
      <Error label="No news" error={$query.error} />
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
            if (items.length - $glance.current <= 10) {
              $query.fetchNextPage();
            }
            glance.update(({ current, on }) => {
              const next = Math.min(current + 1, items.length - 1);
              const stale = hoursSince(on) > 3;
              return {
                current: stale ? next : 0,
                on: new Date(),
              };
            });
          }}
          on:prev={() => {
            glance.update(({ current, on }) => {
              const prev = Math.max(current - 1, 0);
              const stale = hoursSince(on) > 3;
              return {
                current: stale ? prev : 0,
                on: new Date(),
              };
            });
          }}
        />
      {/key}
    {/if}
  </div>
</div>
