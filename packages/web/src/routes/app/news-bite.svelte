<script lang="ts">
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { tw } from "@/lib/tailwind";
  import { link } from "@/lib/utils/link";
  import type { AppOutput } from "@spotlight/server";
  import { createEventDispatcher } from "svelte";
  import { swipe } from "svelte-gestures";
  import { fly, type FlyParams } from "svelte/transition";

  export let item: AppOutput["curation"]["news"][number];
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
    w-full h-[87dvh] md:h-[82vh] text-text
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
    const dir = event.detail.direction;
    if (dir === "right") {
      ref.click();
      return;
    }
    if (dir !== "top" && dir !== "bottom") {
      return;
    }
    direction = dir;
    dispatch(dir === "top" ? "next" : "prev");
  }}
>
  <div
    class={tw(`flex flex-col w-full items-center py-10
    px-4 justify-end gap-4 md:gap-6 bg-gradient-to-t md:px-8
    from-background from-65% via-background/50 relative z-20`)}
  >
    <div class="w-full flex items-center">
      <span
        class={tw(
          "max-w-[90%] break-words text-left [text-wrap:balance]",
          size
        )}
      >
        {item.title}
      </span>
    </div>

    <div
      class="flex flex-col md:flex-row-reverse w-full items-end justify-center"
    >
      <div class="flex flex-col md:flex-row w-full md:items-end justify-end">
        <a
          bind:this={ref}
          class="font-bold hover:underline md:text-lg cursor-pointer flex items-center gap-1 md:gap-2"
          href={link(item.url)}
          target="_blank"
          on:touchend={() => {
            console.log("touchend");
          }}
          on:click={() => {
            console.log("click");
          }}
        >
          {item.domain || "news.ycombinator.com"}
          <svg
            class="w-3 aspect-square md:w-4 mt-0.5 md:mt-1 animate-bounce-r"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M650 400L150 400M150 400L350 600M150 400L350 200"
              stroke="white"
              stroke-width="66.6667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
