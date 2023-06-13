<script lang="ts">
  import { best } from "@/lib/api/news";
  import { tw } from "@/lib/tailwind";
  import { dedup } from "@/lib/utils";
  import { createInfiniteQuery } from "@tanstack/svelte-query";
  import { swipe } from "svelte-gestures";
  import { fly } from "svelte/transition";

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
  $: length = item?.title?.split(" ").length ?? 0;
  $: size =
    length <= 4
      ? "text-6xl md:text-8xl"
      : length <= 8
      ? "text-5xl md:text-7xl"
      : length <= 12
      ? "text-4xl md:text-6xl"
      : length <= 16
      ? "text-3xl md:text-5xl"
      : length <= 20
      ? "text-2xl md:text-4xl"
      : length <= 24
      ? "text-xl md:text-3xl"
      : length <= 28
      ? "text-lg md:text-2xl"
      : length <= 32
      ? "text-base md:text-xl"
      : "text-base md:text-lg";
</script>

{#if $query.isLoading}
  <span>Loading ...</span>
{:else if $query.error}
  <span>Error: {$query.error?.toString()}</span>
{:else if !item}
  <div class="flex flex-col items-center justify-center w-full py-6 h-4/5" />
{:else}
  <div class="relative max-w-lg w-[90vw] h-[75vh] mt-15">
    {#key item.id}
      <div
        class={tw(`flex flex-col relative justify-between
        max-w-lg w-[90vw] h-[75vh] bg-primary2 text-white 
        break-words font-bold rounded-2xl py-10 px-8
        transition-all duration-500 ease-in-out
        cursor-grab active:cursor-grabbing select-none`)}
        in:fly={{ y: "100%", duration: 300, delay: 250 }}
        out:fly={{ y: "-100%", duration: 300 }}
        use:swipe={{
          timeframe: 300,
          minSwipeDistance: 100,
        }}
        on:swipe={(event) => {
          if (event.detail.direction === "top") {
            if (items.length - index <= 5) {
              $query.fetchNextPage();
            }
            index = Math.min(index + 1, items.length - 1);
          }
        }}
      >
        <span class={tw("max-w-full", size)}>{item.title}</span>

        <div class="flex flex-row w-full items-center justify-between">
          <span>
            {item.time_ago}
          </span>
          <span>
            {item.domain}
          </span>
        </div>
      </div>
    {/key}
  </div>
{/if}
