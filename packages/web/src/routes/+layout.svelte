<script>
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { Toaster } from "svelte-french-toast";
  import "../app.css";

  export let data;
</script>

<Toaster
  toastOptions={{
    className:
      "!bg-text/10 !backdrop-blur-xl !ring-[1px] !ring-text/20 !text-text",
    duration: 2000,
  }}
/>
<QueryClientProvider client={data.queryClient}>
  <slot />
</QueryClientProvider>
