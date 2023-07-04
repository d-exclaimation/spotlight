<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { createMeQuery } from "@/lib/api/me";
  import { tracking } from "@/lib/utils/storage";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import NavMenu from "./nav-menu.svelte";
  import { beginning } from "./stores";

  const ROUTES = [
    { name: "Glance", path: "/app" },
    { name: "Feeds", path: "/app/feed" },
    { name: "Dashboard", path: "/app/account" },
  ];
  const me = createMeQuery();

  $: name = ROUTES.find((r) => r.path === $page.url.pathname)?.name ?? "Glance";

  onMount(() => {
    const unsub = me.subscribe((res) => {
      if (!res.isLoading && res.data && !res.data.user) {
        goto("/");
      }
    });

    return unsub;
  });

  onMount(() => {
    if (!browser) return;
    const newStart = tracking.get() ?? new Date();
    beginning.set(newStart);
    tracking.set(newStart);
  });
</script>

<div
  class="flex flex-col items-start justify-start h-[100vh] overflow-y-scroll w-full px-5 md:px-6 max-w-2xl bg-background"
>
  <div
    class="flex items-center justify-between pt-8 pb-4 p-2 z-30 sticky top-0 bg-background/75 backdrop-blur border-b border-black/50 w-full"
  >
    {#key $page.url.pathname}
      <h1
        class="text-2xl font-bold text-text"
        in:fly|local={{ x: -25, duration: 250, delay: 250 }}
        out:fly|local={{ x: 25, duration: 250 }}
      >
        {name}
      </h1>
    {/key}
  </div>
  {#key $page.url.pathname}
    <div class="flex flex-col w-full h-full animate-content">
      {#if !$me.isLoading && $me.data && !$me.data.user}
        <span />
      {:else}
        <slot />
      {/if}
    </div>
  {/key}
</div>

<NavMenu routes={ROUTES} />
