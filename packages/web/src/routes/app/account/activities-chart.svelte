<script lang="ts">
  import type { Dashboard } from "@/lib/api/trpc";
  import ChartBar from "./chart-bar.svelte";

  export let activities: Dashboard["activities"];

  $: maxEngagements =
    activities.reduce(
      (acc, curr) => (curr.engagements > acc ? curr.engagements : acc),
      0
    ) ?? 1;
</script>

<div class="flex flex-col w-full my-2 md:my-0 p-2 md:p-3 gap-2">
  <span class="font-semibold">Activities</span>
  <div class="flex w-full relative">
    {#if activities.length > 0}
      <div class="flex w-full items-end h-40 max-w-full justify-start gap-1">
        {#each activities as { date, engagements } (date)}
          {@const height = Math.round((engagements / maxEngagements) * 8)}
          <ChartBar {height} />
        {/each}
      </div>
    {:else}
      <div
        class="blur-md opacity-25 flex w-full items-end h-40 max-w-full justify-start gap-1"
      >
        {#each { length: 10 } as _, i (i)}
          {@const height = Math.round(Math.random() * 6 + 2)}
          <ChartBar {height} />
        {/each}
      </div>
      <div
        class="absolute flex flex-col gap-2 w-full items-center h-40 justify-center"
      >
        <span class="font-semibold text-text"> No recent activities </span>
        <span
          class="text-text text-xs md:text-sm break-words [text-wrap:balance] text-center"
        >
          You haven't engage with any news in the last 10 days
        </span>
        <a class="text-text text-sm underline flex items-center" href="/app">
          <svg
            class="aspect-square w-3 animate-bounce-r"
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
          Start engaging now
        </a>
      </div>
    {/if}
  </div>
</div>
