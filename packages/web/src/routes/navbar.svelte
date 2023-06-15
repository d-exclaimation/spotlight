<script lang="ts">
  import { createMeQuery } from "@/lib/api/me";
  import { tw } from "@/lib/tailwind";

  const me = createMeQuery();
</script>

<nav class="flex items-center justify-between min-w-full px-6 md:px-16 py-6">
  <a class="flex items-center justify-center gap-1 md:gap-2" href="/">
    <img class="w-4 h-4 md:w-6 md:h-6" src="/spotlight.svg" alt="brand" />
    <h3 class="font-semibold text-base md:text-xl text-text">Spotlight</h3>
  </a>

  {#if !$me.isLoading && !$me.data?.user}
    <a
      class={tw(`relative rounded text-sm text-text before:absolute 
      before:left-0 before:top-0 before:h-full before:w-full before:border-b  
      before:border-text before:transition-all before:content-[''] 
      hover:before:scale-x-100 active:before:scale-x-100 md:text-base 
      md:before:scale-x-0 md:before:border-b-2 font-medium md:font-normal`)}
      href="/login"
    >
      Login
    </a>
  {/if}
</nav>
