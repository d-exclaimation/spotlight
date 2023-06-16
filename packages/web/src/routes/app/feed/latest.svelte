<script lang="ts">
  import { tw } from "@/lib/tailwind";
  import type { TechFeed } from "@/lib/types";

  export let latest: TechFeed;

  $: bg =
    latest.type === "ask"
      ? "bg-orange-600 saturate-[.75]"
      : latest.type === "job"
      ? "bg-emerald-600 saturate-[.75]"
      : latest.title.startsWith("Show HN") || latest.title.startsWith("Tell HN")
      ? "bg-rose-600 saturate-[.75]"
      : "bg-primary2";
</script>

<a
  class={tw(
    `flex flex-col items-center justify-center
    rounded-lg text-white w-full p-4 md:p-6 my-2 
    hover:brightness-105 active:brightness-105`,
    bg
  )}
  href={latest.url}
  target="_blank"
>
  <span class="w-full break-words text-xl md:text-2xl">
    {latest.title}
  </span>

  <div class="flex w-full items-center justify-start mt-2 gap-2 text-sm">
    <span class="font-medium">
      {latest.time_ago}
    </span>
    <span>·</span>
    <span class="font-bold">
      {latest.user ?? "anonymous"}
    </span>
  </div>
</a>
