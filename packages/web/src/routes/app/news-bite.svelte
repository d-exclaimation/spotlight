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

  $: bg =
    item.type === "ask"
      ? "bg-orange-600 saturate-[.75]"
      : item.type === "job"
      ? "bg-emerald-600 saturate-[.75]"
      : item.title.startsWith("Show HN")
      ? "bg-amber-600 saturate-[.75]"
      : "bg-primary2";

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
    `flex flex-col relative justify-between
    max-w-lg w-full h-[70vh] md:h-[75vh] text-white 
    break-words font-bold rounded-2xl py-10 px-8
    transition-all duration-500 ease-in-out
    cursor-grab active:cursor-grabbing select-none`,
    bg
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
  <span class={tw("max-w-full break-words", size)}>{item.title}</span>

  <div class="flex flex-col w-full items-center justify-center">
    <div class="flex flex-row w-full items-end justify-between">
      <span class="text-xs md:text-sm">
        by {item.user ?? "anonymous"}
      </span>
    </div>
    <div class="flex flex-row w-full items-end justify-between">
      <span class="text-xs md:text-sm font-normal">
        {item.time_ago}
      </span>
      <a
        class="text-xs md:text-sm hover:underline cursor-pointer"
        href={item.url}
      >
        {item.domain || "news.ycombinator.com"}
      </a>
    </div>
  </div>
</div>
