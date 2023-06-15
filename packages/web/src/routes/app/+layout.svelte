<script lang="ts">
  import { page } from "$app/stores";
  import { createMeQuery } from "@/lib/api/me";
  import Redirect from "@/lib/components/redirect.svelte";
  import { tw } from "@/lib/tailwind";
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";

  const BUBBLE = "navbar-bubble";
  const ROUTES = [
    { name: "Discover", path: "/app" },
    { name: "Feeds", path: "/app/feed" },
    { name: "Account", path: "/app/account" },
  ];

  const [send, receive] = crossfade({
    fallback: (node) => {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });

  const me = createMeQuery();
</script>

<slot />

<nav
  class="fixed bottom-5 bg-background z-50 rounded-full gap-4 shadow-lg p-2 backdrop-blur-md flex items-center justify-center ring-[1px] ring-text/30"
>
  {#each ROUTES as { name, path } (path)}
    <a
      class={tw(`hover:bg-accent/50 active:bg-accent/50 relative 
      rounded-full px-3 py-1.5 text-sm font-medium
      transition focus-visible:outline-2 outline-sky-400 
      [-webkit-tap-highlight-color:transparent]`)}
      href={path}
      data-sveltekit-preload-code
    >
      {#if $page.url.pathname === path}
        <span
          in:receive={{ key: BUBBLE }}
          out:send={{ key: BUBBLE }}
          class="absolute inset-0 z-[60] bg-accent rounded-full"
        />
      {/if}
      <span
        class="relative z-[60] text-text data-[active=true]:text-text"
        data-active={$page.url.pathname === path}
      >
        {name}
      </span>
    </a>
  {/each}
</nav>

{#if !$me.isLoading && $me.data && !$me.data.user}
  <Redirect href="/" reload />
{/if}
