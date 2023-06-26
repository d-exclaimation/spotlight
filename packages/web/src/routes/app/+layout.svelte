<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { createMeQuery } from "@/lib/api/me";
  import Redirect from "@/lib/components/redirect.svelte";
  import { tracking } from "@/lib/utils/storage";
  import { enter } from "@/lib/utils/transition";
  import { onMount } from "svelte";
  import NavMenu from "./nav-menu.svelte";
  import { beginning } from "./stores";

  const ROUTES = [
    { name: "Glance", path: "/app" },
    { name: "Feeds", path: "/app/feed" },
    { name: "Account", path: "/app/account" },
  ];
  const me = createMeQuery();

  $: name = ROUTES.find((r) => r.path === $page.url.pathname)?.name ?? "Glance";

  onMount(() => {
    if (!browser) return;
    const newStart = tracking.get() ?? new Date();
    beginning.set(newStart);
    tracking.set(newStart);
  });
</script>

{#key $page.url.pathname}
  <div
    class="flex flex-col items-start justify-start h-[100vh] overflow-y-scroll w-full px-5 md:px-6 max-w-2xl bg-background"
    in:enter
  >
    <div
      class="flex items-center justify-between pt-8 pb-4 p-2 z-30 sticky top-0 bg-background/75 backdrop-blur border-b border-black/50 w-full"
    >
      <h1 class="text-2xl font-bold text-text">{name}</h1>
    </div>
    <slot />
  </div>
{/key}

<NavMenu routes={ROUTES} />

{#if !$me.isLoading && $me.data && !$me.data.user}
  <Redirect href="/" reload />
{/if}
