<script lang="ts">
  export let label: string;
  export let error: unknown = "Unknown error";
</script>

<div class="flex flex-col items-center justify-center w-full py-6 h-4/5">
  <span class="font-semibold text-lg text-text">{label}</span>
  <span class="font-medium text-text/75">
    Error: {error?.toString()}
  </span>
</div>
