<script lang="ts">
  import { createMeQuery } from "@/lib/api/me";
  import { enter, exit } from "@/lib/utils/transition";
  import Info from "./info.svelte";

  const me = createMeQuery();
</script>

<svelte:head>
  <title>Account</title>
</svelte:head>

<div
  class="flex flex-col mt-6 items-start justify-start h-[100vh] overflow-y-scroll w-full px-6 max-w-2xl bg-background md:border-x border-white/40"
  in:enter
  out:exit
>
  <h1
    class="pt-8 pb-4 p-2 text-2xl font-bold z-30 sticky top-0 bg-background/75 text-text backdrop-blur border-b border-black/50 w-full"
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
      <div
        class="relative flex w-full z-40 flex-col items-center pt-2 overflow-visible mb-6 md:mb-10 justify-center"
      >
        <span
          class="absolute w-24 md:w-36 aspect-square rounded-full bg-rose-600/80 translate-x-2 blur-xl"
        />
        <span
          class="absolute w-24 md:w-36 aspect-square rounded-full bg-indigo-500/80 -translate-x-2 blur-xl"
        />
        <img
          class="w-24 md:w-36 relative aspect-square object-cover rounded-full"
          src={`https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${$me.data.user.email}`}
          alt={`Avatar for ${$me.data.user.username}`}
        />
      </div>
      <div
        class="flex flex-col gap-8 md:gap-10 items-center justify-start w-full"
      >
        <span class="font-bold text-text text-lg md:text-2xl">
          {$me.data.user.username}
        </span>

        <div
          class="flex flex-col items-start justify-center w-full gap-4 md:gap-8"
        >
          <span class="font-semibold text-text text-lg md:text-2xl px-1">
            About you
          </span>
          <Info
            icon="📣"
            label="Bio"
            value={`Hello there! I'm ${$me.data.user.username}`}
          />

          <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <Info icon="📬" label="Email" value={$me.data.user.email} />
            <Info icon="🏖️" label="Location" value="Earth" />
            <Info icon="🏂" label="Hobby" value="Sleeping" />
            <Info icon="🍹" label="Interest" value="Politics" />
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
