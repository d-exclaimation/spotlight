<script>
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import "../app.css";

  export let data;
</script>

<QueryClientProvider client={data.queryClient}>
  <slot />
</QueryClientProvider>
