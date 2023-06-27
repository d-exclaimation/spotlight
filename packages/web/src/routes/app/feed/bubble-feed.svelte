<script lang="ts">
  import { createEngangementMutation } from "@/lib/api/dashboard";
  import type { News } from "@/lib/api/trpc";
  import { tw } from "@/lib/tailwind";
  import { link } from "@/lib/utils/link";
  import { useQueryClient as getQueryClient } from "@tanstack/svelte-query";

  export let item: News[number];

  const client = getQueryClient();
  const mutation = createEngangementMutation({
    onSuccess: async () => {
      await client.invalidateQueries(["users", "me", "dashboard"]);
    },
  });

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
  on:click={() => {
    $mutation.mutate({});
  }}
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
