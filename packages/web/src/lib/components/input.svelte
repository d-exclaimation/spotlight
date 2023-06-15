<script lang="ts">
  import { tw } from "@/lib/tailwind";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface $$Props extends HTMLInputAttributes {
    value: string;
  }

  export let value: string;
</script>

<input
  {...$$restProps}
  class={tw(
    `flex h-10 w-full rounded-md border border-zinc-300
    bg-transparent px-3 py-2 text-sm ring-offset-zinc-200 
    file:border-0 file:bg-transparent file:text-sm 
    file:font-medium placeholder:text-zinc-400/75 font-medium
    focus-visible:outline-none focus-visible:ring text-text
    focus-visible:ring-zinc-300/30 focus-visible:ring-offset-1
    disabled:cursor-not-allowed disabled:opacity-50`,
    $$restProps.class
  )}
  autocapitalize="off"
  bind:value
/>
