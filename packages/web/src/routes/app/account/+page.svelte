<script lang="ts">
  import { createMeQuery } from "@/lib/api/me";
  import Button from "@/lib/components/button.svelte";
  import Popover from "@/lib/components/popover.svelte";
  import { tw } from "@/lib/tailwind";
  import { enter, exit } from "@/lib/utils/transition";

  const me = createMeQuery();

  let open = false;
</script>

<svelte:head>
  <title>Account</title>
</svelte:head>

<div
  class="flex flex-col items-start justify-start h-[100vh] overflow-y-scroll w-full px-6 max-w-2xl bg-background md:border-x border-text/40"
  in:enter
  out:exit
>
  <h1
    class="pt-8 pb-4 p-2 text-2xl font-bold z-40 sticky top-0 bg-background/75 text-text backdrop-blur border-b border-black/50 w-full"
  >
    Profile
  </h1>
  <div
    class="flex flex-col items-center justify-start w-full text-text md:mt-6 flex-1"
  >
    {#if $me.isLoading || !$me.data?.user}
      <div class="flex flex-col items-center justify-center w-full py-6 h-4/5">
        <span class="font-semibold text-lg text-text">Loading</span>
        <span class="font-bold text-text/75 animate-pulse text-xl md:text-2xl">
          ...
        </span>
      </div>
    {:else if $me.error}
      <div class="flex flex-col items-center justify-center w-full py-6 h-4/5">
        <span class="font-semibold text-lg text-text">No news</span>
        <span class="font-medium text-text/75">
          Error: {$me.error?.toString()}
        </span>
      </div>
    {:else}
      <div class="flex items-center justify-start mb-2 p-2 md:p-3 w-full gap-2">
        <img
          class="w-16 md:w-20 p-2 relative aspect-square object-cover rounded-xl"
          src={`https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${$me.data.user.email}`}
          alt={`Avatar for ${$me.data.user.username}`}
        />
        <div class="flex flex-col items-start flex-1 h-full px-2 py-3">
          <span class="font-bold text-text text-lg md:text-2xl">
            {$me.data.user.username}
          </span>
          <span
            class="font-medium text-text/75 text-[0.675rem] leading-tight md:text-sm"
          >
            {$me.data.user.email}
          </span>
        </div>
        <div class="flex items-center justify-end">
          <div class="relative">
            <Button
              class="relative hover:bg-white/10 active:bg-white/10 p-1 md:p-2 z-10"
              on:click={() => (open = !open)}
            >
              <img
                src="/icons/settings.svg"
                alt="Settings"
                class="w-5 md:w-6 aspect-square"
              />
            </Button>
            <Popover bind:open>
              <div
                class="flex flex-col items-center justify-center w-28 md:w-32 text-sm md:text-base font-medium"
              >
                <Button
                  class="w-full text-start text-indigo-200 md:text-text bg-background md:hover:bg-indigo-200 md:active:bg-indigo-200 md:hover:text-background md:active:text-background"
                  on:click={() => (open = false)}
                >
                  Edit
                </Button>
                <span class="w-[90%] h-[1px] bg-text/20" />
                <Button
                  class="w-full text-start text-rose-200 md:text-text bg-background md:hover:bg-rose-200 md:active:bg-rose-200 md:hover:text-background md:active:text-background"
                  on:click={() => (open = false)}
                >
                  Logout
                </Button>
              </div>
            </Popover>
          </div>
        </div>
      </div>

      <div class="flex w-full p-2 md:p-3 items-center justify-around">
        <div class="flex justify-center flex-col flex-1">
          <span class="font-light text-sm md:text-lg">Viewed</span>
          <span class="font-semibold text-xl md:text-3xl">1,587</span>
        </div>
        <div class="flex justify-center flex-col flex-1">
          <span class="font-light text-sm md:text-lg">Enganged</span>
          <span class="font-semibold text-xl md:text-3xl">87</span>
        </div>
        <div class="flex justify-center flex-col flex-[2] md:flex-[3]">
          <span class="font-light text-sm md:text-lg">Time spent</span>
          <div class="flex gap-2 items-end">
            <span class="font-semibold text-xl md:text-3xl"> 4.5 </span>
            <span class="font-light mr-1">hr</span>
            <span class="font-semibold text-xl md:text-3xl"> 14.5 </span>
            <span class="font-light">min</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full my-2 md:my-3 p-2 md:p-3 gap-2">
        <span class="font-semibold">Activities</span>
        <div class="flex w-full items-end h-40 max-w-full justify-start gap-1">
          {#each { length: 10 } as _, i (i)}
            {@const height = Math.round(Math.random() * 6 + 2)}
            <div
              class={tw(
                "w-[9%] shrink-0 h-36 rounded",
                height > 6
                  ? "bg-blue-200"
                  : height > 4
                  ? "bg-emerald-200"
                  : height > 2
                  ? "bg-amber-200"
                  : "bg-rose-200"
              )}
              style={`height:${height}rem`}
            />
          {/each}
        </div>
      </div>

      <div class="flex flex-col w-full my-2 md:my-3 p-2 md:p-3 gap-2">
        <span class="font-semibold">Top categories</span>
        <div class="flex flex-col w-full gap-2 divide-y divide-text/20">
          {#each { length: 5 } as _, i (i)}
            <div
              class="flex flex-col md:flex-row items-start md:items-start justify-between p-2 gap-2"
            >
              <span class="font-medium">Sport</span>
              <span class="font-light">
                1,587
                <span class="font-extralight">engagements</span>
              </span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
