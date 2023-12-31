<script lang="ts">
  import { tw } from "@/lib/tailwind";
  import { onDestroy, onMount } from "svelte";
  import { fly } from "svelte/transition";
  import FeatureInfo from "./feature-info.svelte";
  import Feature from "./feature.svelte";
  import JoinWaitlist from "./join-waitlist.svelte";
  import Navbar from "./navbar.svelte";

  const PHRASES = ["Streamlined", "Supercharged", "Simplified"];
  const DELAY = 5_000;
  const title = "Spotlight";
  const description = "Browsing news streamlined";

  let ref = undefined as number | NodeJS.Timeout | undefined;
  let index = 0;

  $: phrase = PHRASES[index];

  onMount(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    ref = setInterval(() => {
      index = (index + 1) % PHRASES.length;
    }, DELAY);
  });

  onDestroy(() => {
    clearInterval(ref);
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>

<div
  class="flex flex-col flex-shrink-0 items-start justify-start min-h-screen min-w-full bg-gradient-to-br from-background via-background to-secondary"
>
  <Navbar />

  <!-- Main -->
  <div class="flex flex-col items-center justify-start w-full mb-8">
    <div
      class="flex flex-col items-center justify-center mt-16 sm:mt-18 md:mt-24"
    >
      <div class="flex items-center justify-center gap-3 md:gap-4">
        <span class="animate-slide-down text-text text-4xl md:text-8xl">
          Browsing
        </span>
        <div
          class={tw(`relative animate-slide-up text-text
          font-normal [animation-delay:0.5s] before:absolute
          before:left-0 before:top-0 before:h-full before:w-full 
          before:animate-expand-right before:border-b before:border-text 
          before:content-[''] before:[animation-delay:1.25s]
          md:text-8xl md:before:border-b-2 min-w-max text-4xl
          flex items-center justify-center`)}
        >
          news
        </div>
      </div>
      <div
        class={tw(`animate-slide-right min-w-max min-h-max md:mt-1
        [animation-delay:1s] flex items-center justify-center relative`)}
      >
        {#key phrase}
          <div
            class={tw(`text-4xl md:text-8xl leading-tight
            text-transparent font-medium pb-2 md:pb-3 transition-all pt-1
            bg-gradient-to-r from-primary via-primary to-accent bg-clip-text`)}
            in:fly={{ y: 20, duration: 200 }}
          >
            {phrase}
          </div>
        {/key}
      </div>
      <p
        class={tw(`animate-slide-right w-[90%] max-w-lg text-sm
        min-h-max [animation-delay:1.25s] flex text-center md:text-lg
        items-center justify-center relative text-text/75 mt-10`)}
      >
        Spotlight is a modern take for news consumption.
        <br />
        Stay informed in a glance, with a personalised, relevant, and informative
        news feed.
      </p>
    </div>

    <!-- Coming soon button -->
    <JoinWaitlist />
  </div>

  <!-- <div  class="h-[30vh]" /> -->
  <div class="flex w-full items-center justify-center">
    <span class="w-[50%] h-[1px] bg-gradient-to-r via-text/30 my-16 md:my-24" />
  </div>

  <!-- Feature 1: Spotlight's Glance -->
  <div class="flex flex-col items-center justify-center w-full">
    <span class="text-text text-xl md:text-3xl max-w-[90%]">
      Stay informed at a
      <span class="text-sky-400">Glance</span>
    </span>
    <Feature
      class="bg-gradient-to-r from-sky-400 to-blue-600"
      icon="/icons/glance.svg"
      alt="Spotlight's Glance"
      title="Curated news in a swipe"
      preview="/banner/glance.png"
    >
      Spotlight's Glance is a personalised news feed that is curated just for
      you. It's a clutter-free, easy to read news feed that you can swipe
      through.
    </Feature>

    <div class="flex flex-col md:flex-row w-[90%] text-text mt-4 gap-6">
      <FeatureInfo
        class="md:flex-[3]"
        icon="/icons/swipe-up.svg"
        alt="Swipe up"
        title="Just a breeze"
      >
        Goodbye to the days of opening multiple tabs and switching between them.
        Just swipe up and read the news you want to read.
      </FeatureInfo>

      <FeatureInfo
        class="md:flex-[2]"
        icon="/icons/bottomless.svg"
        alt="Bottomless"
        title="Unending"
      >
        You can swipe up as much as you want. We'll keep showing you articles
        that you'll love.
      </FeatureInfo>
    </div>
  </div>

  <div class="flex w-full items-center justify-center">
    <span class="w-[50%] h-[1px] bg-gradient-to-r via-text/30 my-16 md:my-24" />
  </div>

  <!-- Feature 2: Spotlight's Feeds -->
  <div class="flex flex-col items-center justify-center w-full">
    <span class="text-text text-xl md:text-3xl max-w-[90%]">
      Waste no time with
      <span class="text-green-400">Feeds</span>
    </span>

    <Feature
      class="bg-gradient-to-r from-emerald-600 to-green-400"
      icon="/icons/feeds.svg"
      alt="Spotlight's Feeds"
      title="One stop for the latest happenings"
      preview="/banner/feeds.png"
      reverse
    >
      Spotlight's Feeds is a quick, dead-simple, and intuitive stop to catch up
      on the latest happenings around the world. It's optimised for speed, so
      you can get the latest news in a jiffy.
    </Feature>

    <div class="flex flex-col md:flex-row w-[90%] text-text mt-4 gap-6">
      <FeatureInfo
        class="md:flex-[2]"
        icon="/icons/no-bs.svg"
        alt="No BS"
        title="Clutter free"
      >
        No more ads, no more distractions. Just the news you want to read.
      </FeatureInfo>

      <FeatureInfo
        class="md:flex-[3]"
        icon="/icons/brain.svg"
        alt="Knowledge"
        title="Informative"
      >
        We'll show you the latest news from the best sources. You'll never miss
        out on anything.
      </FeatureInfo>
    </div>
  </div>

  <div class="flex w-full items-center justify-center">
    <span class="w-[50%] h-[1px] bg-gradient-to-r via-text/30 my-16 md:my-24" />
  </div>

  <!-- Feature 1: Spotlight's Account Dashboard -->
  <div class="flex flex-col items-center justify-center w-full">
    <span class="text-text text-xl md:text-3xl text-center max-w-[90%]">
      Understand your preferences using
      <span class="text-rose-400">Dashboard</span>
    </span>

    <Feature
      class="bg-gradient-to-r from-rose-600 to-rose-400"
      icon="/icons/account.svg"
      alt="Spotlight's Dashboard"
      title="All your activities in one place"
      preview="/banner/account.png"
    >
      Spotlight's Dashboard is a one stop place to view all your activities and
      preferences. You can view your reading activities, your favourite topics,
      and manage all of that data and information.
    </Feature>

    <div class="flex flex-col md:flex-row w-[90%] text-text mt-4 gap-6">
      <FeatureInfo
        class="md:flex-[3]"
        icon="/icons/secure.svg"
        alt="secure"
        title="Secure and Private"
      >
        All your data is encrypted, stored securely, and only accessible by you.
      </FeatureInfo>

      <FeatureInfo
        class="md:flex-[2]"
        icon="/icons/friendly.svg"
        alt="friendly"
        title="User friendly"
      >
        You are in control of your data. You can delete it anytime you want.
      </FeatureInfo>
    </div>
  </div>

  <div class="h-[20vh]" />

  <div class="flex flex-col items-center justify-center w-full h-[75vh]">
    <span class="text-text text-2xl md:text-5xl">
      So what are you waiting for?
    </span>
    <span
      class="text-text/75 font-medium text-sm max-w-[90%] md:text-2xl mt-2 md:mt-3 text-center"
    >
      Get started with Spotlight today and start reading the news you want to
      read.
    </span>

    <button
      class={tw(`relative mt-10 rounded font-medium text-text before:absolute 
      before:left-0 before:top-0 before:h-full before:w-full before:border-b 
      text-sm before:border-text before:transition-all before:content-[''] 
      hover:before:scale-x-100 active:before:scale-x-100 md:mt-16 md:text-lg 
      md:before:scale-x-0 md:before:border-b-2`)}
      on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Get started
    </button>
  </div>
  <div class="h-[10vh]" />
</div>
