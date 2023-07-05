<script lang="ts">
  import { tw } from "@/lib/tailwind";

  export let action: string;
  export let title: string;
  export let href: string;
</script>

<a
  class={tw(`relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md
  focus:outline-none group bg-white/10 w-[20rem] md:w-[28rem]`)}
  {href}
>
  <div class="flex w-full items-center justify-between">
    <div class="flex items-center">
      <div class="text-base">
        <p class="font-medium text-text group-hover:underline">{action}</p>
        <span class="inline text-text/50">
          <span>{title}</span>
        </span>
      </div>
    </div>
    <div class="shrink-0">
      <slot />
    </div>
  </div>
</a>
