<script lang="ts">
  import type { AppOutput } from "@spotlight/server";
  import { createEventDispatcher } from "svelte";
  import Feed from "./feed.svelte";
  import InView from "./in-view.svelte";

  export let root: HTMLElement;
  export let item: AppOutput["newest"]["news"][number];

  const dispatch = createEventDispatcher<{ visible: void }>();
</script>

<InView {root} on:visible={() => dispatch("visible")}>
  <Feed {item} />
</InView>
