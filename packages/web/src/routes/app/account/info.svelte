<script lang="ts">
  export let icon: string;
  export let label: string;
  export let value: string;
</script>

<div class="flex w-full items-center gap-2">
  <span
    class="p-1 ring-[1.5px] w-12 text-lg flex items-center justify-center aspect-square ring-text/40 rounded-full"
  >
    {icon}
  </span>
  <div class="flex flex-col w-[75%]">
    <span class="font-medium text-text/80 text-sm leading-tight">
      {label}
    </span>
    <span class="text-base max-w-full truncate">
      {value}
    </span>
  </div>
</div>
