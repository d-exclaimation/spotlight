<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade, scale } from "svelte/transition";

  interface $$Props {
    show: boolean;
  }

  export let show: $$Props["show"];

  const dispatch = createEventDispatcher<{ close: void }>();

  function close() {
    show = false;
    dispatch("close");
  }

  function escape(e: KeyboardEvent) {
    if (e.key === "Escape" && show) {
      close();
    }
  }
</script>

<svelte:window on:keydown={escape} />

{#if show}
  <div
    class="fixed inset-0 z-[60] bg-text/10 backdrop-blur select-none outline-none"
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 150 }}
    on:click={close}
    on:keydown={escape}
  />

  <div
    class="fixed top-1/2 left-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 w-max h-max"
    in:scale={{ duration: 300, opacity: 0, start: 0.9 }}
    out:fade={{ duration: 150 }}
  >
    <slot />
  </div>
{/if}
