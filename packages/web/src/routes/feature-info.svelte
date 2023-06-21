<script lang="ts">
  import { tw } from "@/lib/tailwind";

  interface $$Props {
    class?: string;
    icon: string;
    alt: string;
    title: string;
  }

  export let icon: $$Props["icon"];
  export let alt: $$Props["alt"];
  export let title: $$Props["title"];
</script>

<div
  class={tw(
    "rounded-lg p-10 md:p-14 bg-neutral-700/70 flex items-center justify-center",
    $$restProps.class
  )}
>
  <div class="flex flex-col gap-3 md:px-4">
    <div class="w-14 md:w-16 p-4 rounded-xl bg-text/30 backdrop-blur-xl">
      <img class="aspect-square" src={icon} {alt} />
    </div>
    <span class="text-text text-lg md:text-2xl"> {title} </span>

    <p class="text-text/75 text-sm md:text-lg">
      <slot />
    </p>
  </div>
</div>
