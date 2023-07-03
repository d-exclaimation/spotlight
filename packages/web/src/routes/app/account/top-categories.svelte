<script lang="ts">
  import type { Dashboard } from "@/lib/api/trpc";
  import { fly } from "svelte/transition";

  export let topCategories: Dashboard["topCategories"];

  let mode = "bento" as "list" | "bento";

  $: [first, second, third, fourth, last] = topCategories;
  $: empty = topCategories.length === 0;
</script>

<div class="flex flex-col w-full my-2 md:my-3 p-2 md:p-3 gap-2">
  <div class="flex items-center justify-between w-full mb-2">
    <span class="font-medium">Top categories</span>
    <div class="flex flex-row items-center">
      <button
        class="rounded-l-md px-2 bg-text/5 transition-all data-[active=true]:text-background data-[active=true]:bg-primary"
        data-active={mode === "bento"}
        on:click={() => (mode = "bento")}
      >
        Bento
      </button>
      <button
        class="rounded-r-md px-2 bg-text/5 transition-all data-[active=true]:text-background data-[active=true]:bg-primary"
        data-active={mode === "list"}
        on:click={() => (mode = "list")}
      >
        List
      </button>
    </div>
  </div>
  <div class="flex relative items-center justify-center w-full">
    {#if mode === "bento"}
      <div
        class="flex flex-col md:flex-row items-center justify-center w-full h-96 gap-1 data-[empty=true]:opacity-30 data-[empty=true]:blur"
        data-empty={empty}
        in:fly={{ x: 20, duration: 300 }}
      >
        <!-- 1st, 2nd, and 3rd -->
        <div
          class="flex-[5] h-full w-full flex flex-col items-center justify-center gap-1"
        >
          <div
            class="flex-1 w-full rounded-lg relative flex flex-col items-center justify-center px-4 py-2 text-blue-200 bg-text/5"
          >
            <span class="font-mono font-bold text-6xl md:text-8xl">
              {first?.category ?? "ai"}
            </span>
            <span class="text-sm md:text-base text-text/50">
              {first?.engagements ?? 0} news read
            </span>
          </div>
          <div
            class="flex-1 w-full flex flex-row items-center justify-center gap-1"
          >
            <div
              class="flex-1 h-full w-full rounded-lg relative flex flex-col items-center justify-center text-2xl text-green-200 bg-text/5"
            >
              <span class="font-mono font-bold text-xl md:text-3xl">
                {second.category}
              </span>
              <span class="text-sm text-text/50">
                {second.engagements} news read
              </span>
            </div>
            <div
              class="flex-1 h-full w-full rounded-lg relative flex flex-col items-center justify-center text-2xl text-amber-200 bg-text/5"
            >
              <span class="font-mono font-bold text-xl md:text-3xl">
                {third.category}
              </span>
              <span class="text-sm text-text/50">
                {third.engagements} news read
              </span>
            </div>
          </div>
        </div>

        <!-- 4th and last -->
        <div
          class="flex-[2] h-full w-full flex flex-row md:flex-col items-center justify-center gap-1"
        >
          <div
            class="flex-[1] md:flex-[2] w-full h-full rounded-lg relative flex flex-col items-center justify-center text-2xl text-rose-200 bg-text/5"
          >
            <span class="font-mono font-bold text-base md:text-xl">
              {fourth.category}
            </span>
            <span class="text-xs text-text/50">
              {fourth.engagements} news read
            </span>
          </div>
          <div
            class="flex-[1] w-full h-full rounded-lg relative flex flex-col items-center justify-center text-2xl text-neutral-200 bg-text/5"
          >
            <span class="font-mono font-bold text-base md:text-xl">
              {last.category}
            </span>
            <span class="text-xs text-text/50">
              {last.engagements} news read
            </span>
          </div>
        </div>
      </div>
    {:else}
      <div
        class="flex flex-col w-full gap-1 data-[empty=true]:opacity-30 data-[empty=true]:blur"
        data-empty={empty}
        in:fly={{ x: 20, duration: 300 }}
      >
        {#each topCategories as { category, engagements } (category)}
          <div
            class="flex flex-col md:flex-row items-start justify-between px-3 p-2 gap-2 bg-text/5 rounded-md"
          >
            <span class="font-normal text-lg md:text-xl">{category}</span>
            <span class="font-light">
              {engagements}
              <span class="font-extralight">engagements</span>
            </span>
          </div>
        {/each}
      </div>
    {/if}
    {#if empty}
      <div
        class="absolute flex flex-col gap-2 w-full items-center h-56 justify-center"
      >
        <span class="font-semibold text-text"> No engagenments </span>
        <span class="text-text text-sm">
          You haven't engage with any news in any category
        </span>
      </div>
    {/if}
  </div>
</div>
