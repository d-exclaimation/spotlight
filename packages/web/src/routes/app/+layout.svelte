<script lang="ts">
  import { browser } from "$app/environment";
  import { createMeQuery } from "@/lib/api/me";
  import Redirect from "@/lib/components/redirect.svelte";
  import { tracking } from "@/lib/utils/storage";
  import { onMount } from "svelte";
  import NavMenu from "./nav-menu.svelte";
  import { beginning } from "./stores";

  const me = createMeQuery();

  onMount(() => {
    if (!browser) return;
    const newStart = tracking.get() ?? new Date();
    beginning.set(newStart);
    tracking.set(newStart);
  });
</script>

<slot />

<NavMenu />

{#if !$me.isLoading && $me.data && !$me.data.user}
  <Redirect href="/" reload />
{/if}
