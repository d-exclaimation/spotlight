<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { tw } from "../tailwind";
  import Input from "./input.svelte";

  interface $$Props extends HTMLInputAttributes {
    id: string;
    value: string;
    label?: string;
    classes?: { root?: string; label?: string; input?: string };
    error?: string;
  }

  export let id: $$Props["id"];
  export let value: $$Props["value"];
  export let classes: $$Props["classes"] = {};
  export let error: string | undefined = undefined;
</script>

<div
  class={tw(
    "flex w-full flex-col items-start justify-center gap-2",
    classes?.root
  )}
>
  <label
    class={tw(
      "text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center",
      classes?.label
    )}
    for={id}
  >
    <span
      class="transition-all data-[error=true]:opacity-0 data-[error=true]:-z-0 data-[error=true]:translate-y-5"
      data-error={!!error}
    >
      {$$restProps.label || "Email"}
    </span>
    <span
      class="absolute opacity-0 -z-10 translate-y-5 transition-all data-[error=true]:opacity-100 data-[error=true]:z-0 data-[error=true]:translate-y-0 text-red-300"
      data-error={!!error}
    >
      {error}
    </span>
  </label>
  <Input {...$$restProps} {id} class={classes?.input} bind:value />
</div>
