<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let href: string;

  onMount(() => {
    goto(href);
  });
</script>

<span />
