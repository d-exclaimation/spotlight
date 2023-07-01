<script lang="ts">
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
    "flex flex-col items-center justify-center pt-4 md:pt-6 w-[90%] mt-12 md:mt-16 rounded-lg",
    reverse ? "md:flex-row-reverse" : "md:flex-row",
    $$restProps.class
  )}
>
  <div class="flex flex-col w-full md:w-[40%] mt-6 md:mt-0 px-6 gap-3">
    <div
      class="w-12 md:w-16 p-2 md:p-3 mb-1 rounded-xl bg-text/30 backdrop-blur-xl"
    >
      <img class="aspect-square" src={icon} {alt} />
    </div>
    <span class="font text-text text-lg md:text-2xl">
      {title}
    </span>

    <p class="text-text/75 text-sm md:text-lg">
      <slot />
    </p>
  </div>

  <img
    class="max-h-[40rem] md:max-h-[36rem] w-auto h-auto aspect-auto block"
    src={preview}
    {alt}
  />
</div>
