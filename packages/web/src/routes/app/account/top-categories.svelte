<script lang="ts">
  import type { Dashboard } from "@/lib/api/trpc";

  export let topCategories: Dashboard["topCategories"];
</script>

<div class="flex flex-col w-full my-2 md:my-3 p-2 md:p-3 gap-2">
  <span class="font-medium">Top categories</span>
  {#if topCategories.length > 0}
    <div class="flex flex-col w-full gap-2 divide-y divide-text/20">
      {#each topCategories as { category, engagements } (category)}
        <div
          class="flex flex-col md:flex-row items-start md:items-start justify-between p-2 gap-2"
        >
          <span class="font-normal">{category}</span>
          <span class="font-light">
            {engagements}
            <span class="font-extralight">engagements</span>
          </span>
        </div>
      {/each}
    </div>
  {:else}
    <div class="flex flex-col gap-2 w-full items-center h-56 justify-center">
      <span class="font-semibold text-text"> No engagenments </span>
      <span class="text-text text-sm">
        You haven't engage with any news in any category
      </span>
    </div>
  {/if}
</div>
