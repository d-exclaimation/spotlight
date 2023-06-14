<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let href: string;
  export let reload: boolean = false;

  onMount(() => {
    if (reload) {
      window.location.assign(href);
      return;
    }
    goto(href);
  });
</script>

<span />
