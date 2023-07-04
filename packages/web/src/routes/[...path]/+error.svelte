<script lang="ts">
  import Game from "./game.svelte";

  const title = "404";
  const description = "Page not found";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>

<div
  class="flex flex-col flex-shrink-0 items-start justify-start min-h-[100dvh] min-w-full bg-gradient-to-br from-background via-background to-secondary"
>
  <nav class="flex items-center justify-between min-w-full px-6 md:px-16 py-6">
    <a class="flex items-center justify-center gap-1 md:gap-2" href="/">
      <img class="w-4 h-4 md:w-6 md:h-6" src="/spotlight.svg" alt="brand" />
      <h3 class="text-base md:text-xl text-text">Spotlight</h3>
    </a>
  </nav>

  <div class="flex flex-col items-center justify-center w-full mt-[20dvh]">
    <Game />
  </div>
</div>
