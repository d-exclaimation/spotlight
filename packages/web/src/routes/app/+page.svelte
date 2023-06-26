<script lang="ts">
  import { createGlanceQuery } from "@/lib/api/news";
  import Error from "@/lib/components/status/error.svelte";
  import Loading from "@/lib/components/status/loading.svelte";
  import { dedup } from "@/lib/utils";
  import { hoursSince } from "@/lib/utils/time";
  import NewsBite from "./news-bite.svelte";
  import { glance } from "./stores";

  export let data;

  const title = "Glance";
  const description = "A glance at the hottest news";
  const query = createGlanceQuery({
    initialData: data.initial,
  });

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
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="twitter:title" content={title} />
  <meta name="description" content={description} />
  <meta name="twitter:description" content={description} />
  <meta property="og:description" content={description} />
</svelte:head>

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
