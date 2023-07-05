<script lang="ts">
  import { tw } from "@/lib/tailwind";
  import { fly } from "svelte/transition";

  interface $$Props {
    class?: string;
    alt: string;
    title: string;
    preview: string;
    reverse?: boolean;
  }

  export let alt: $$Props["alt"];
  export let title: $$Props["title"];
  export let preview: $$Props["preview"];
  export let reverse: $$Props["reverse"] = false;
</script>

<div
  class={tw(
    "flex flex-col items-center justify-end md:justify-center pt-4 md:pt-6 max-w-4xl w-[90%] rounded-lg",
    reverse ? "md:flex-row-reverse" : "md:flex-row",
    $$restProps.class
  )}
>
  <div
    class="flex flex-col w-full md:w-[40%] min-h-[5.5rem] md:min-h-[unset] mt-6 md:mt-0 px-6 gap-3"
  >
    {#key title}
      <span
        class="font text-text text-xl md:text-3xl"
        in:fly={{ y: "1.25rem", duration: 400 }}
      >
        {title}
      </span>
    {/key}
  </div>

  <img
    class="max-h-[30rem] md:max-h-[27rem] w-auto h-auto aspect-auto block"
    src={preview}
    {alt}
  />
</div>
