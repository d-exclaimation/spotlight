<script lang="ts">
  import { createMeQuery } from "@/lib/api/me";
  import Redirect from "@/lib/components/redirect.svelte";
  import Navmenu from "./navmenu.svelte";

  const me = createMeQuery();
</script>

<slot />

<Navmenu />

{#if !$me.isLoading && $me.data && !$me.data.user}
  <Redirect href="/" reload />
{/if}
