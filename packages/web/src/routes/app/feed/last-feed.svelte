<script lang="ts">
  import type { TechFeed } from "@/lib/types";
  import { createEventDispatcher } from "svelte";
  import Feed from "./feed.svelte";
  import InView from "./in-view.svelte";

  export let root: HTMLElement;
  export let item: TechFeed;

  const dispatch = createEventDispatcher<{ visible: void }>();
</script>

<InView {root} on:visible={() => dispatch("visible")}>
  <Feed {item} />
</InView>
