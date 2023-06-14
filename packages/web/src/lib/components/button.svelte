<script lang="ts">
  import { tw } from "@/lib/tailwind";
  import { createEventDispatcher } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  interface $$Props extends HTMLButtonAttributes {}

  const dispatch = createEventDispatcher<{ click: void }>();
</script>

<button
  {...$$restProps}
  class={tw(
    `rounded-md px-4 py-2 mt-4 hover:brightness-105 
    active:brightness-105 focus-visible:ring-2 
    focus-visible:ring-zinc-300 focus-visible:ring-offset-2 
    disabled:cursor-not-allowed disabled:opacity-50`,
    $$restProps.class
  )}
  on:click={() => dispatch("click")}
>
  <slot />
</button>
