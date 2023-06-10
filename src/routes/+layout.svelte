<script>
  import { brand } from "@/lib/svg/brand";
  import "../app.css";
</script>

<div class="flex flex-col items-start justify-start min-h-screen min-w-[100vw]">
  <nav class="flex items-center justify-start min-w-full px-6 md:px-10 py-6">
    <div class="flex items-center justify-center gap-1 md:gap-2">
      <svg
        class="w-4 h-4 md:w-8 md:h-8"
        viewBox="0 0 56 56"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={brand} />
      </svg>
      <h3 class="font-semibold text-base md:text-xl">Raylet</h3>
    </div>
  </nav>
  <div class="flex items-center justify-center h-[75vh] w-full">
    <slot />
  </div>
</div>
