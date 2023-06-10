<script lang="ts">
  import { fade, scale } from "svelte/transition";

  let show = false;
</script>

<svelte:head>
  <title>Join undrline</title>
</svelte:head>

<button
  class="px-4 py-2 bg-slate-100 rounded-md transition-all hover:bg-sky-200 active:bg-sky-200"
  on:click={() => (show = true)}
>
  Open
</button>

{#if show}
  <button
    class="fixed inset-0 bg-black/5 backdrop-blur-sm z-10 flex items-center justify-center cursor-pointer"
    transition:fade={{ duration: 300 }}
    on:click={() => (show = false)}
  />
  <div
    class="fixed z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex items-center justify-center bg-white rounded-md shadow w-96 h-40"
    in:scale={{ start: 0.95, duration: 300, delay: 100 }}
    out:fade={{ duration: 300 }}
  >
    Hello
  </div>
{/if}
