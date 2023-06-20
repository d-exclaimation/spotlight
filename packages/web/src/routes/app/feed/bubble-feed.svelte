<script lang="ts">
  import { tw } from "@/lib/tailwind";
  import { link } from "@/lib/utils/link";
  import type { AppOutput } from "@spotlight/server";

  export let item: AppOutput["newest"]["news"][number];

  $: bg =
    item.type === "ask"
      ? "bg-orange-200"
      : item.type === "job"
      ? "bg-emerald-200"
      : item.title.startsWith("Show HN") || item.title.startsWith("Tell HN")
      ? "bg-rose-200"
      : "bg-primary";
</script>

<a
  class={tw(
    `flex flex-col items-center justify-center
    rounded-lg text-background w-full p-4 md:p-6 my-2 
    hover:brightness-105 active:brightness-105`,
    bg
  )}
  href={link(item.url)}
  target="_blank"
>
  <span class="w-full break-words text-xl md:text-2xl">
    {item.title}
  </span>

  <div class="flex w-full items-center justify-start mt-2 gap-2 text-sm">
    <span class="font-medium">
      {item.time_ago}
    </span>
    <span>·</span>
    <span class="font-bold">
      {item.user ?? "anonymous"}
    </span>
  </div>
</a>
