<script lang="ts">
  import { createMeQuery } from "@/lib/api/me";
  import Redirect from "@/lib/components/redirect.svelte";
  import NavMenu from "./nav-menu.svelte";

  const me = createMeQuery();
</script>

<slot />

<NavMenu />

{#if !$me.isLoading && $me.data && !$me.data.user}
  <Redirect href="/" reload />
{/if}
