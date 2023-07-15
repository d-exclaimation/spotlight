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
    item.type === "ask" || item.type === "poll"
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
    hover:brightness-105 active:brightness-105 col-span-2`,
    bg
  )}
  href={link(item.url)}
  target="_blank"
  on:click={() => {
    $mutation.mutate({ title: item.title });
  }}
>
  <span
    class="w-full flex-1 flex items-center break-words text-2xl md:text-3xl"
  >
    {item.title}
  </span>

  <div class="flex w-full items-center justify-start mt-2 gap-2 text-sm">
    {#if item.type === "ask" || item.type === "poll"}
      <svg
        class="w-6 aspect-square md:w-8 rounded-full"
        viewBox="-1 0 19 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-5.861 2.781a1.918 1.918 0 0 0 1.487-3.13A2.65 2.65 0 0 0 7.965 5.88a2.703 2.703 0 1 0-3.2 4.356c-.005.07-.01.14-.01.21a2.703 2.703 0 0 0 4.84 1.659 1.91 1.91 0 0 0 .961.26zM6.661 9.042a.593.593 0 1 1-.587-.627.581.581 0 0 1 .587.627zm2.06 0a.593.593 0 1 1-.587-.627.581.581 0 0 1 .587.627zm2.061 0a.593.593 0 1 1-.587-.627.581.581 0 0 1 .587.627zm2.694 4.018a.826.826 0 1 0-.826.826.826.826 0 0 0 .826-.826z"
        />
      </svg>
    {:else if item.type === "job"}
      <svg
        class="w-6 aspect-square md:w-8 rounded-full"
        viewBox="-1 0 19 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-2.995-1.899a.79.79 0 0 0-.792-.784h-1.584v-.075a.317.317 0 0 0-.287-.315v-.37a.794.794 0 0 0-.792-.791H6.988a.794.794 0 0 0-.791.791v.371a.318.318 0 0 0-.281.314V6.9h-1.59a.79.79 0 0 0-.792.784v.785h1.308a1.029 1.029 0 0 1 2.054 0h3.164a1.029 1.029 0 0 1 2.053 0h1.309zm-.346 1.544h-.962a1.03 1.03 0 0 1-2.055 0H6.896a1.03 1.03 0 0 1-2.055 0H3.88v3.61a.318.318 0 0 0 .317.316h8.563a.318.318 0 0 0 .317-.317zm-7.207.337a.396.396 0 0 0 .396-.396v-.633a.396.396 0 0 0-.792 0v.633a.396.396 0 0 0 .396.396zM9.966 6.14l.001.002v.372a.318.318 0 0 0-.262.311V6.9H7.257v-.075a.317.317 0 0 0-.269-.312v-.371l.002-.002zm1.12 3.425a.396.396 0 0 0 .396-.396v-.633a.396.396 0 0 0-.791 0v.633a.396.396 0 0 0 .396.396z"
        />
      </svg>
    {:else if item.title.startsWith("Show HN") || item.title.startsWith("Tell HN")}
      <svg
        class="w-6 aspect-square md:w-8 rounded-full"
        viewBox="-1 0 19 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-2.828.124a5.09 5.09 0 1 0-8.688 3.599.396.396 0 0 0 .56-.56 4.298 4.298 0 1 1 6.078 0 .396.396 0 1 0 .56.56 5.056 5.056 0 0 0 1.49-3.599zm-2.992 2.097a2.966 2.966 0 1 0-4.194 0 .396.396 0 1 0 .56-.56 2.174 2.174 0 1 1 3.074 0 .396.396 0 0 0 .56.56zm-.661 2.8a.396.396 0 0 0-.396-.396h-.644v-3.55a1.03 1.03 0 1 0-.792 0v3.55H7.46a.396.396 0 1 0 0 .792h2.08a.396.396 0 0 0 .396-.396z"
        />
      </svg>
    {:else}
      <svg
        class="w-6 aspect-square md:w-8 rounded-full"
        viewBox="-1 0 19 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.916 7.916 0 0 1 7.917 7.917zM13.1 6.647h-1.233V5.95a.334.334 0 0 0-.333-.333H4.086a.334.334 0 0 0-.333.333v6.194c0 .183.003.393.006.467l.012.065a1.058 1.058 0 0 0 .8.83l.076.018c.09.005.312.01.495.01h7.146a1.186 1.186 0 0 0 1.186-1.187V7.02a.375.375 0 0 0-.374-.373zm-2.52.933H5.087v.791h5.491zM7.423 9.314H5.088v2.507h2.336zm3.082 1.722h-2.22v.792h2.22zm.002-1.726h-2.22v.791h2.22zm2.174-1.872v4.909a.395.395 0 0 1-.79 0V7.438z"
        />
      </svg>
    {/if}
    <span class="font-medium">
      {item.time_ago}
    </span>
    <span>·</span>
    <span class="font-bold">
      {item.user ?? "anonymous"}
    </span>
  </div>
</a>
