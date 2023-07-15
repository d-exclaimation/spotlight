<script lang="ts">
  import { tw } from "@/lib/tailwind";
  import { fade } from "svelte/transition";

  export let open: boolean;

  function close() {
    open = false;
  }

  function escape(e: KeyboardEvent) {
    if (e.key === "Escape" && open) {
      close();
    }
  }
</script>

<svelte:window on:keydown={escape} />

{#if open}
  <div
    class="md:hidden fixed inset-0 z-[60] md:-z-10 bg-text/10 backdrop-blur select-none outline-none"
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 150 }}
    on:click={close}
    on:keydown={escape}
  />
{/if}

<div
  class={tw(`fixed flex min-w-max right-3 bottom-10 left-3 origin-top-left 
  bg-background backdrop-blur-lg rounded-md ring-[1px] ring-text/[.15]
  opacity-0 translate-y-full -z-10 transition-all duration-500
  data-[visible=true]:z-[70] data-[visible=true]:translate-y-0 
  data-[visible=true]:opacity-100 md:absolute md:origin-top-right 
  md:mt-2 md:-translate-y-5 md:bottom-[unset] md:left-[unset] md:duration-300`)}
  data-visible={open}
>
  <slot />
</div>
