<script lang="ts">
  import { tw } from "@/lib/tailwind";
  import type { TechFeed } from "@/lib/types";
  import { createEventDispatcher } from "svelte";
  import { swipe } from "svelte-gestures";
  import { fly } from "svelte/transition";

  export let item: TechFeed;

  const dispatch = createEventDispatcher<{
    swipe: { direction: "top" | "bottom" };
  }>();

  let direction: "top" | "bottom" = "top";

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
      ? "bg-orange-600"
      : item.type === "job"
      ? "bg-emerald-600"
      : item.title.startsWith("Show HN")
      ? "bg-purple-600"
      : "bg-primary2";
</script>

<div
  class={tw(
    `flex flex-col relative justify-between
    max-w-lg w-[90vw] h-[75vh] text-white 
    break-words font-bold rounded-2xl py-10 px-8
    transition-all duration-500 ease-in-out
    cursor-grab active:cursor-grabbing select-none`,
    bg
  )}
  in:fly={{
    y: direction === "top" ? "100%" : "-100%",
    duration: 300,
    delay: 275,
  }}
  out:fly={{ y: direction === "top" ? "-100%" : "100%", duration: 300 }}
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
    dispatch("swipe", { direction });
  }}
>
  <span class={tw("max-w-full break-words", size)}>{item.title}</span>

  <div class="flex flex-col w-full items-center justify-center">
    <div class="flex flex-row w-full items-end justify-between">
      <span class="text-xs">
        by {item.user ?? "anonymous"}
      </span>
    </div>
    <div class="flex flex-row w-full items-end justify-between">
      <span class="text-xs font-normal">
        {item.time_ago}
      </span>
      <a class="text-xs" href={item.url}>
        {item.domain || "news.ycombinator.com"}
      </a>
    </div>
  </div>
</div>
