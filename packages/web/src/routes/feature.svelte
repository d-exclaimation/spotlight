<script lang="ts">
  import Button from "@/lib/components/button.svelte";
  import { tw } from "@/lib/tailwind";

  interface $$Props {
    class?: string;
    icon: string;
    alt: string;
    title: string;
    preview: string;
    reverse?: boolean;
  }

  export let icon: $$Props["icon"];
  export let alt: $$Props["alt"];
  export let title: $$Props["title"];
  export let preview: $$Props["preview"];
  export let reverse: $$Props["reverse"] = false;
</script>

<div
  class={tw(
    "flex flex-col items-center justify-center pt-4 md:pt-6 w-[90%] mt-20 md:mt-24 rounded-lg",
    reverse ? "md:flex-row-reverse" : "md:flex-row",
    $$restProps.class
  )}
>
  <div class="flex flex-col w-full md:w-[40%] mt-6 md:mt-0 px-6 gap-3">
    <div class="w-16 md:w-20 p-4 rounded-xl bg-text/30 backdrop-blur-xl">
      <img class="aspect-square" src={icon} {alt} />
    </div>
    <span class="font-bold text-text text-xl md:text-2xl">
      {title}
    </span>

    <p class="text-text/80 font-medium md:text-lg">
      <slot />
    </p>

    <Button
      class="px-4 py-2 max-w-fit rounded-lg bg-text/30 text-text font-bold md:text-lg"
    >
      Learn more
    </Button>
  </div>

  <img
    class="max-h-[40rem] md:max-h-[36rem] w-auto h-auto aspect-auto block"
    src={preview}
    {alt}
  />
</div>
