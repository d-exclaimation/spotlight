<script lang="ts">
  import { tw } from "@/lib/tailwind";

  const OPTIMAL_RATE = 8.333333333333334 * 4;
  const GRAVITY = 0.07;
  const TERMINAL_VELOCITY = 0.85;
  const OBSTACLE_SPEED = 0.875;
  const JUMP_COUNT = 2;
  const GAME_END = 2000;
  const OBSTACLES = [
    "/assets/obs1.gif",
    "/assets/obs2.gif",
    "/assets/obs3.gif",
    "/assets/obs4.webp",
    "/assets/obs5.webp",
    "/assets/obs6.webp",
    "/assets/obs7.gif",
  ];

  let previous = 0;
  let delta = 0;
  let dead = true;
  let obstacles = [] as { x: number; src: string }[];
  let height = 0;
  let velocity = 0;
  let distance = 0;
  let jump = JUMP_COUNT;

  $: chance = Math.min(0.85, distance / GAME_END) + 0.1;
  $: threshold =
    chance < 0.25
      ? 60
      : chance < 0.5
      ? 50
      : chance < 0.75
      ? 40
      : chance < 0.9
      ? 30
      : 25;

  function moveObstacles() {
    obstacles = obstacles
      .map((o) => ({ ...o, x: o.x + OBSTACLE_SPEED }))
      .filter((o) => o.x < 39);
  }

  function hitting() {
    return obstacles.some((o) => {
      return o.x > 32.5 && o.x < 37.5 && height < 2.75;
    });
  }

  function reset() {
    dead = false;
    obstacles = [];
    height = 0;
    velocity = 0;
    distance = 0;
    jump = JUMP_COUNT;
    requestAnimationFrame(nextFrame);
  }

  function nextFrame(frame: number) {
    const rate = (frame - previous) / OPTIMAL_RATE;

    if (delta + rate < 1) {
      delta += rate;
      return requestAnimationFrame(nextFrame);
    }

    delta = 0;
    distance += 1;
    height = Math.max(0, height + velocity);

    if (hitting()) {
      dead = true;
      return;
    }

    if (height === 0) {
      velocity = 0;
      jump = JUMP_COUNT;
    } else {
      velocity = velocity - GRAVITY;
    }
    if (distance % threshold === 0 && Math.random() <= chance) {
      obstacles.push({
        x: 0,
        src: OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)],
      });
    }
    moveObstacles();
    previous = frame;
    requestAnimationFrame(nextFrame);
  }

  function action() {
    if (dead) {
      reset();
      return;
    }
    if (jump) {
      velocity = TERMINAL_VELOCITY / (jump > 1 ? 1 : 1.5);
      jump--;
    }
  }
</script>

<svelte:head>
  {#each OBSTACLES as href (href)}
    <link rel="preload" as="image" {href} />
  {/each}
</svelte:head>

<svelte:window
  on:keypress={(e) => {
    if (e.key === " ") {
      action();
    }
  }}
/>

<svelte:body on:click={action} />

<div class="flex sm:hidden items-center justify-center text-text/60">
  Turn your phone sideways to play!
</div>
<div
  class="relative hidden sm:flex items-center justify-center w-[40rem] max-w-[90vw] min-h-[10rem]"
>
  <div class="flex flex-col items-start justify-center w-full px-10">
    <img
      class="aspect-auto w-20 h-20 flex-grow-0"
      src={dead && distance > 0
        ? "/assets/dead.gif"
        : "/assets/speed-penguin.gif"}
      alt="player"
      style={`transform: translateY(${(-height).toFixed(3)}rem);`}
    />
    <span
      class="h-[1px] w-full bg-gradient-to-r from-text/30 via-text to-text/30"
    />
    {#if !dead}
      <span
        class="h-[1px] w-4 absolute bg-text/30"
        style={`transform: translateX(${(35 - (distance % 35)).toFixed(
          3
        )}rem);`}
      />
      <span
        class="h-[1px] w-3 absolute bg-text/30"
        style={`
        transform: translate(${(35 - ((distance - 16) % 35)).toFixed(
          3
        )}rem, -1rem);
        `}
      />
      <span
        class="h-[1px] w-3 absolute bg-text/30"
        style={`
        transform: translate(${(35 - ((distance - 8) % 35)).toFixed(
          3
        )}rem, 1rem);
        `}
      />
      <span
        class="h-[1px] w-6 absolute bg-text/30"
        style={`
        transform: translate(${(35 - ((distance - 24) % 35)).toFixed(
          3
        )}rem, -1.5rem);
        `}
      />
    {/if}
    {#each obstacles as { x, src }}
      <img
        class="h-12 w-12 absolute"
        {src}
        alt="obstacle"
        style={`
        transform: translate(${35 - x}rem, 0.5rem);
        -webkit-transform: translate(${35 - x}rem, 0.5rem);
        `}
      />
    {/each}
  </div>

  <span class="absolute top-5 right-5 text-text/50 font-extralight font-mono">
    {distance}m ({(chance * 100).toFixed(1)}%/{threshold}m)
  </span>

  {#if dead}
    <span class="absolute text-text/40 font-light max-w-[90%] text-center">
      Press <span class="font-bold font-mono">⎵</span> or
      <span class="font-semibold">tap</span> to start a new game
    </span>
  {/if}
</div>

<span class="text-text font-light mt-3 max-w-[90%] text-center text-xl">
  Oops! You've ventured off the map. Let's get you back on track
</span>

<div class="flex items-center justify-center w-full mt-2">
  {#if distance > GAME_END}
    <a
      class={tw(`relative rounded text-text/40 font-light before:absolute 
      before:left-0 before:top-0 before:h-full before:w-full before:border-b 
      before:border-text/40 before:transition-all before:content-[''] 
      hover:before:scale-x-100 active:before:scale-x-100 
      md:before:scale-x-0 md:before:border-b-2`)}
      href="/"
    >
      Back to the home page
    </a>
  {:else}
    <span class="text-text/40 font-light max-w-[90%] text-center">
      Reach 2000m to get back to the home page
    </span>
  {/if}
</div>
