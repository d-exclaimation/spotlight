<script lang="ts">
  import { news } from "@/lib/api/news.js";
  import { createQuery } from "@tanstack/svelte-query";

  const query = createQuery({
    queryKey: ["news"],
    queryFn: () => news(),
  });
</script>

{#if $query.isLoading}
  <span>Loading ...</span>
{:else if $query.error || !$query.data}
  <span>Error: {$query.error?.toString()}</span>
{:else}
  <div class="flex flex-col items-center justify-center w-full py-6 mb-10">
    {#each $query.data as item}
      <div
        class="flex flex-col items-center justify-center w-[90%] p-4 m-4 bg-background ring-[2px] ring-secondary rounded"
      >
        {item.title}
      </div>
    {/each}
  </div>
{/if}
