<script lang="ts">
  import { enter, exit } from "@/lib/utils/transition";
</script>

<div
  class="flex items-center justify-center min-w-[100vw] min-h-screen"
  in:enter
  out:exit
>
  You are in <code class="px-1 font-mono text-blue-800">/app/account</code>
</div>
