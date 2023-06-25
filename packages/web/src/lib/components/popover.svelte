<script lang="ts">
  export let open: boolean;
</script>

<div
  class="absolute flex min-w-max right-0 origin-top-right bg-background backdrop-blur-lg rounded-md ring-[1px] ring-text/[.15] opacity-0 -translate-y-5 z-0 transition-all data-[visible=true]:z-[30] data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100"
  data-visible={open}
>
  <slot />
</div>
