<script lang="ts">
  import { tw } from "@/lib/tailwind";
  import { onDestroy, onMount } from "svelte";
  import { fly } from "svelte/transition";
  import JoinWaitlist from "./join-waitlist.svelte";

  const PHRASES = ["Streamlined", "Supercharged", "Simplified"];
  const DELAY = 5_000;

  let ref = undefined as number | undefined;
  let index = 0;

  $: phrase = PHRASES[index];

  onMount(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    ref = setInterval(() => {
      index = (index + 1) % PHRASES.length;
    }, DELAY);
  });

  onDestroy(() => {
    clearInterval(ref);
  });
</script>

<svelte:head>
  <title>Spotlight</title>
</svelte:head>

<div class="flex flex-col items-start justify-start min-h-screen min-w-[100vw]">
  <nav class="flex items-center justify-start min-w-full px-6 md:px-10 py-6">
    <a class="flex items-center justify-center gap-1 md:gap-2" href="/">
      <img class="w-4 h-4 md:w-6 md:h-6" src="/spotlight.svg" alt="brand" />
      <h3 class="font-semibold text-base md:text-xl">Spotlight</h3>
    </a>
  </nav>

  <!-- Main -->
  <div class="flex flex-col items-center justify-center h-[75vh] w-full">
    <div class="mt-5 flex flex-col items-center justify-center md:mt-8">
      <div class="flex items-center justify-center gap-3 md:gap-4">
        <span class="animate-slide-down text-4xl font-bold md:text-8xl">
          Browsing
        </span>
        <div
          class={tw(`relative animate-slide-up
          font-bold [animation-delay:0.5s] before:absolute
          before:left-0 before:top-0 before:h-full before:w-full 
          before:animate-expand-right before:border-b before:border-black 
          before:content-[''] before:[animation-delay:1.25s]
          md:text-8xl md:before:border-b-2 min-w-max text-4xl
          flex items-center justify-center`)}
        >
          news
        </div>
      </div>
      <div
        class={tw(`animate-slide-right font-bold min-w-max min-h-max md:mt-1
        [animation-delay:1s] flex items-center justify-center relative`)}
      >
        {#key phrase}
          <div
            class={tw(`text-5xl md:text-9xl leading-tight
            text-transparent font-bold pb-2 md:pb-3 transition-all pt-1
            bg-gradient-to-r from-primary via-primary to-accent bg-clip-text`)}
            in:fly={{ y: 20, duration: 200 }}
          >
            {phrase}
          </div>
        {/key}
      </div>
    </div>

    <!-- Coming soon button -->
    <JoinWaitlist />
  </div>
</div>
