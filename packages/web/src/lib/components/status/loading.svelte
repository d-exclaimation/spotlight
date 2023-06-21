<script lang="ts">
  import { tw } from "@/lib/tailwind";
</script>

<div class="flex flex-row items-center justify-center w-full py-6 gap-2 h-4/5">
  {#each { length: 4 } as _, i (i)}
    <span
      class={tw(
        "w-3 aspect-square rounded-full bg-text animate-heavy-bounce [animation-fill-mode:backwards]",
        i === 0
          ? "[animation-delay:0]"
          : i === 1
          ? "[animation-delay:0.25s]"
          : i === 2
          ? "[animation-delay:0.5s]"
          : "[animation-delay:0.75s]"
      )}
    />
  {/each}
</div>
