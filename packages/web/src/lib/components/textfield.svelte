<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { tw } from "../tailwind";
  import Input from "./input.svelte";

  interface $$Props extends HTMLInputAttributes {
    id: string;
    value: string;
    classes?: { root?: string; label?: string; input?: string };
  }

  export let id: $$Props["id"];
  export let value: $$Props["value"];
  export let classes: $$Props["classes"] = {};
</script>

<div
  class={tw(
    "flex w-full flex-col items-start justify-center gap-2",
    classes?.root
  )}
>
  <label
    class={tw(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      classes?.label
    )}
    for={id}
  >
    Email
  </label>
  <Input
    {...$$restProps}
    {id}
    class={classes?.input}
    bind:value
    placeholder="Enter your email address"
  />
</div>
