<script lang="ts">
  import { tw } from "@/lib/tailwind";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface $$Props extends HTMLInputAttributes {
    value: string;
    length: number;
  }

  export let value: $$Props["value"];
  export let length: $$Props["length"];

  let refs: HTMLInputElement[] = Array.from({ length }, () => null as any);
  let values = Array.from({ length }, () => "").map((_, i) => value[i] || "");
</script>

<div class="flex w-full gap-1 items-center justify-between">
  {#each { length } as _x, i (i)}
    <input
      {...$$restProps}
      class={tw(
        `flex w-9 h-9 md:h-10 md:w-10 rounded-md border border-zinc-300
        bg-transparent py-2 text-center text-text text-base
        ring-offset-zinc-200 placeholder:text-zinc-400/75 
        font-medium focus-visible:outline-none focus-visible:ring
        focus-visible:ring-zinc-300/30 focus-visible:ring-offset-1
        disabled:cursor-not-allowed disabled:opacity-50`,
        $$restProps.class
      )}
      autocapitalize="off"
      placeholder="☐"
      bind:value={values[i]}
      on:paste={(e) => {
        if (e instanceof ClipboardEvent) {
          const curr = e.clipboardData?.getData("text/plain") ?? "";
          if (curr.length > 1) {
            e.preventDefault();
            const chars = curr.split("");
            for (let i = 0; i < length; i++) {
              values[i] = chars[i].toUpperCase();
            }
            value = values.join("").toUpperCase();
            refs.at(-1)?.focus();
          }
        }
      }}
      on:input={(e) => {
        if (e instanceof InputEvent) {
          const curr = e.data ?? "";
          values[i] = curr.toUpperCase();
          value = values.join("");
          refs[i + 1]?.focus();
        }
      }}
      on:keydown={(e) => {
        if (e instanceof KeyboardEvent) {
          if (e.key === "Backspace") {
            e.preventDefault();
            values[i] = "";
            value = values.join("").toUpperCase();
            refs[i - 1]?.focus();
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            refs[i - 1]?.focus();
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            refs[i + 1]?.focus();
          }
        }
      }}
      bind:this={refs[i]}
    />
  {/each}
</div>
