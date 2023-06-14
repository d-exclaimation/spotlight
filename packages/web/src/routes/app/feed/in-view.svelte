<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  export let root: HTMLElement;

  const dispatch = createEventDispatcher<{ visible: void }>();

  let checker: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch("visible");
          }
        });
      },
      {
        root,
      }
    );

    observer.observe(checker);
  });
</script>

<div class="w-full h-max" bind:this={checker}>
  <slot />
</div>
