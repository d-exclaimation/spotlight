<script lang="ts">
  import { tw } from "@/lib/tailwind";
  export let height: number;
</script>

<div
  class={tw(
    "w-[9%] shrink-0 h-36 rounded animate-expand-y",
    height > 6
      ? "bg-blue-200"
      : height > 4
      ? "bg-emerald-200"
      : height > 2
      ? "bg-amber-200"
      : "bg-rose-200"
  )}
  style={`height:${height}rem`}
/>
