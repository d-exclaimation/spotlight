<script lang="ts">
  import { tw } from "@/lib/tailwind";

  const MAP_WIDTH = 26;
  const OBSTACLE_SIZE = 2.5;
  const OPTIMAL_RATE = 8.333333333333334 * 4;
  const GRAVITY = 0.08;
  const TERMINAL_VELOCITY = 0.85;
  const OBSTACLE_SPEED = 0.85;
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

  $: chance = Math.min(0.55, distance / GAME_END) + 0.1;
  $: threshold =
    chance < 0.25 ? 60 : chance < 0.5 ? 50 : chance < 0.75 ? 40 : 30;

  $: wind = [
    { x: (MAP_WIDTH - ((distance + 18) % MAP_WIDTH)).toFixed(1), y: 0 },
    { x: (MAP_WIDTH - ((distance + 6) % MAP_WIDTH)).toFixed(1), y: -1 },
    { x: (MAP_WIDTH - ((distance + 12) % MAP_WIDTH)).toFixed(1), y: 1 },
  ];

  function moveObstacles() {
    obstacles = obstacles
      .map((o) => ({ ...o, x: o.x + OBSTACLE_SPEED }))
      .filter((o) => o.x < MAP_WIDTH + OBSTACLE_SIZE);
  }

  function hitting() {
    return obstacles.some((o) => {
      return (
        o.x > MAP_WIDTH - OBSTACLE_SIZE &&
        o.x < MAP_WIDTH + OBSTACLE_SIZE &&
        height < OBSTACLE_SIZE
      );
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
  <link rel="preload" as="image" href="/assets/dead.webp" />
</svelte:head>

<svelte:window
  on:keypress={(e) => {
    if (e.key === " ") {
      action();
    }
  }}
/>

<svelte:body on:click={action} />

<div
  class="relative flex items-center justify-center w-[26rem] max-w-[100vw] overflow-x-hidden overflow-y-visible min-h-[16rem] md:scale-150"
>
  <div class="flex flex-col items-start justify-center w-full h-full mt-8">
    <div
      class="relative w-12 h-12 z-10 flex-grow-0 flex items-center justify-center"
      style={`transform: translateY(${(-height).toFixed(3)}rem);`}
    >
      {#if distance > Math.round(GAME_END * (3 / 4)) && !dead}
        <img
          class="absolute w-[110%] h-[110%] -translate-x-5"
          src="/assets/aura.gif"
          alt="fire"
        />
      {/if}
      <img
        class="aspect-auto w-12 h-12 relative z-10"
        src={dead && distance > 0
          ? "/assets/dead.webp"
          : "/assets/speed-penguin.gif"}
        alt="player"
      />
    </div>
    <span
      class="h-[1px] mt-[0.1rem] w-full bg-gradient-to-r from-text/30 via-text to-text/30"
    />
    {#each wind as { x, y } (y)}
      <span
        class="h-[2px] z-0 rounded-full w-10 absolute bg-text/20"
        style={`transform: translate(${x}rem, ${y}rem);`}
      />
    {/each}
    {#each obstacles as { x, src }}
      <img
        class="h-10 w-10 absolute"
        {src}
        alt="obstacle"
        style={`
        transform: translateX(${MAP_WIDTH - x}rem);
        -webkit-transform: translateX (${MAP_WIDTH - x}rem);
        `}
      />
    {/each}
  </div>

  <span
    class={tw(
      "absolute top-10 right-2 font-extralight leading-none font-mono",
      distance > GAME_END
        ? "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-500"
        : distance > Math.round(GAME_END * (3 / 4))
        ? "text-green-500"
        : distance > Math.round(GAME_END * (2 / 4))
        ? "text-yellow-500"
        : distance > Math.round(GAME_END * (1 / 4))
        ? "text-orange-500"
        : "text-red-500"
    )}
  >
    {distance}m
  </span>

  {#if dead}
    <span class="absolute text-text/60 font-light max-w-[90%] text-center">
      Press <span class="font-black font-mono">⎵</span> or
      <span class="font-semibold">tap</span> to start a new game
    </span>
  {/if}
</div>

<span class="text-text font-light mt-3 max-w-[90%] text-center text-3xl">
  Oops! You've ventured off the map.
</span>
<span class="text-text/75 font-light mt-1 max-w-[90%] text-center text-xl">
  Let's get you back on track
</span>

<div class="flex items-center justify-center w-full mt-2">
  {#if distance > GAME_END}
    <a
      class={tw(`relative rounded text-text/50 font-light before:absolute 
      before:left-0 before:top-0 before:h-full before:w-full before:border-b 
      before:border-text/40 before:transition-all before:content-[''] 
      hover:before:scale-x-100 active:before:scale-x-100 
      md:before:scale-x-0 md:before:border-b-2`)}
      href="/"
    >
      Back to the home page
    </a>
  {:else}
    <span class="text-text/50 font-light max-w-[90%] text-center">
      Reach 2000m to get back to the home page
    </span>
  {/if}
</div>
