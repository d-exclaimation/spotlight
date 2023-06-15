<script lang="ts">
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { tw } from "@/lib/tailwind";
  import type { TechFeed } from "@/lib/types";
  import { createEventDispatcher } from "svelte";
  import { swipe } from "svelte-gestures";
  import { fly, type FlyParams } from "svelte/transition";

  export let item: TechFeed;
  export let direction: "top" | "bottom";

  const dispatch = createEventDispatcher<{
    prev: void;
    next: void;
  }>();

  let ref: HTMLAnchorElement;
  let isNavigating = false;

  $: length = item?.title?.split(" ").length ?? 0;
  $: size =
    length <= 4
      ? "text-5xl md:text-7xl"
      : length <= 8
      ? "text-4xl md:text-6xl"
      : length <= 12
      ? "text-4xl md:text-5xl"
      : length <= 16
      ? "text-2xl md:text-4xl"
      : length <= 20
      ? "text-xl md:text-3xl"
      : length <= 24
      ? "text-lg md:text-2xl"
      : "text-base md:text-xl";

  $: filter =
    item.type === "ask"
      ? "after:bg-orange-500/5"
      : item.type === "job"
      ? "after:bg-emerald-500/5"
      : item.title.startsWith("Show HN") || item.title.startsWith("Tell HN")
      ? "after:bg-rose-500/5"
      : "after:bg-indigo-500/5";

  $: bg =
    item.type === "ask"
      ? "bg-[url('/cover/ask.webp')]"
      : item.type === "job"
      ? "bg-[url('/cover/jobs.webp')]"
      : item.title.startsWith("Show HN") || item.title.startsWith("Tell HN")
      ? "bg-[url('/cover/show.webp')]"
      : item.id % 3 === 0
      ? "bg-[url('/cover/news-1.webp')]"
      : item.id % 3 === 1
      ? "bg-[url('/cover/news-2.webp')]"
      : "bg-[url('/cover/news-3.webp')]";

  beforeNavigate(() => {
    isNavigating = true;
  });

  afterNavigate(() => {
    isNavigating = false;
  });

  function smartfly(node: Element, params: FlyParams) {
    if (!isNavigating) {
      return fly(node, params);
    }

    return {};
  }
</script>

<div
  class={tw(
    `flex flex-col relative justify-end
    w-full h-[85dvh] md:h-[80vh] text-text
    break-words gap-2 bg-cover md:gap-4 
    rounded-lg transition-all duration-500 ease-in-out
    cursor-grab active:cursor-grabbing select-none
    after:absolute after:inset-0 after:z-10 after:rounded-lg
    after:bg-indigo-500/10`,
    bg,
    filter
  )}
  in:smartfly={{
    y: direction === "top" ? "100%" : "-100%",
    duration: 300,
    delay: 275,
  }}
  out:smartfly={{ y: direction === "top" ? "-100%" : "100%", duration: 300 }}
  use:swipe={{
    timeframe: 300,
    minSwipeDistance: 50,
  }}
  on:dblclick={() => ref.click()}
  on:swipe={(event) => {
    if (
      event.detail.direction !== "top" &&
      event.detail.direction !== "bottom"
    ) {
      return;
    }
    direction = event.detail.direction;
    dispatch(direction === "top" ? "next" : "prev");
  }}
>
  <div
    class={tw(`flex flex-col w-full items-center py-10
    px-4 justify-end gap-4 md:gap-6 bg-gradient-to-t md:px-8
    from-background from-65% via-background/50 relative z-20`)}
  >
    <span class={tw("max-w-full break-words", size)}>{item.title}</span>

    <div
      class="flex flex-col md:flex-row-reverse w-full items-end justify-center"
    >
      <div
        class="flex flex-col md:flex-row w-full items-start md:items-end justify-end"
      >
        <a
          bind:this={ref}
          class="font-bold hover:underline cursor-pointer"
          href={item.url}
          target="_blank"
        >
          {item.domain || "news.ycombinator.com"}
        </a>
      </div>
      <div
        class="flex flex-row md:flex-col w-full gap-2 md:gap-0 items-start md:justify-end"
      >
        <span class="text-xs md:text-sm font-medium md:font-bold">
          {item.type} by {item.user ?? "anonymous"}
        </span>
        <span class="text-xs md:text-sm font-normal">
          {item.time_ago}
        </span>
      </div>
    </div>
  </div>
</div>
