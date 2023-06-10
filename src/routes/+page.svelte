<script lang="ts">
  import { tw } from "@/lib/tailwind";
  import { onDestroy, onMount } from "svelte";

  const PHRASES = ["Streamlined", "Supercharged", "Simplified"];
  const DELAY = 5_000;

  let ref = undefined as number | undefined;
  let index = 0;

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
  <title>Raylet</title>
</svelte:head>

<div class="flex flex-col items-center justify-center">
  <div class="mt-5 flex flex-col items-center justify-center md:mt-8">
    <div class="flex items-center justify-center gap-3 md:gap-4">
      <span class="animate-slide-down text-5xl font-bold md:text-8xl">
        Tech
      </span>
      <div
        class={tw(`relative animate-slide-up
        font-bold [animation-delay:0.5s] before:absolute
        before:left-0 before:top-0 before:h-full before:w-full 
        before:animate-expand-right before:border-b before:border-black 
        before:content-[''] before:[animation-delay:1.25s]
        md:text-8xl md:before:border-b-2 min-w-max text-5xl
        flex items-center justify-center`)}
      >
        stories
      </div>
    </div>
    <div
      class={tw(
        `animate-slide-right font-bold min-w-max min-h-max
        [animation-delay:1s] flex items-center justify-center relative`
      )}
    >
      {#each PHRASES as phrase, i}
        <div
          class={tw(`absolute z-10 text-5xl md:text-8xl opacity-0 translate-y-20 transition-all
          data-[shown=true]:opacity-100 data-[shown=true]:translate-y-0 leading-tight
          text-transparent overflow-visible font-bold duration-500
          bg-gradient-to-r from-primary via-primary to-accent bg-clip-text pb-3`)}
          data-shown={i === index}
        >
          {phrase}
        </div>
      {/each}
      <div class="opacity-0 font-bold text-5xl md:text-8xl">Supercharged</div>
    </div>
  </div>
  <button
    class={tw(`relative mt-10 animate-slide-down rounded text-sm font-medium
    text-blue-950 [animation-delay:1.5s] before:absolute before:left-0 
    before:top-0 before:h-full before:w-full before:border-b 
    before:border-black before:transition-all before:content-[''] 
    hover:before:scale-x-100 active:before:scale-x-100 md:mt-16 md:text-base 
    md:before:scale-x-0 md:before:border-b-2`)}
  >
    Coming soon
  </button>
</div>
