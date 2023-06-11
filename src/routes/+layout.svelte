<script>
  import "../app.css";
</script>

<div class="flex flex-col items-start justify-start min-h-screen min-w-[100vw]">
  <nav class="flex items-center justify-start min-w-full px-6 md:px-10 py-6">
    <a class="flex items-center justify-center gap-1 md:gap-2" href="/">
      <img class="w-4 h-4 md:w-6 md:h-6" src="/spotlight.svg" alt="brand" />
      <h3 class="font-semibold text-base md:text-xl">Spotlight</h3>
    </a>
  </nav>
  <slot />
</div>
