<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { createMeQuery } from "@/lib/api/me";
  import { tw } from "@/lib/tailwind";
  import { onDestroy, onMount } from "svelte";
  import { fly } from "svelte/transition";
  import FeatureExplain from "./feature-explain.svelte";
  import Option from "./option.svelte";

  const me = createMeQuery();

  const TITLE = "message-title";
  const STAGES = [
    {
      kind: "only-title" as const,
      ms: 1500,
    },
    {
      kind: "title-and-taglines" as const,
      title: "Welcome to Spotlight",
      tagline: "We believe in a better way to read the news.",
      ms: 1500,
    },
    {
      kind: "title-and-taglines" as const,
      tagline: "One that is a breeze, not a chore.",
      ms: 1500,
    },
    {
      kind: "title-and-taglines" as const,
      tagline: "Long gone are the days of cluttered news sites.",
      ms: 1500,
    },
    {
      kind: "title-and-taglines" as const,
      tagline: "Time to put the Spotlight on what matters.",
      ms: 1500,
    },
    {
      kind: "glance" as const,
      info: "This is Glance",
      ms: 1500,
    },
    {
      kind: "glance" as const,
      info: "It's an infinitely scrolling feed of news articles curated just for you",
      ms: 2000,
    },
    {
      kind: "glance" as const,
      info: "Just swipe up to see the next article",
      ms: 2000,
    },
    {
      kind: "glance" as const,
      info: "or swipe down to see the previous one",
      ms: 2000,
    },
    {
      kind: "glance" as const,
      info: "It's that simple",
      ms: 2000,
    },
    {
      kind: "glance" as const,
      info: "But sometimes you don't want to waste time scrolling",
      ms: 2000,
    },
    {
      kind: "feeds" as const,
      info: "That's where Feeds come in",
      ms: 1500,
    },
    {
      kind: "feeds" as const,
      info: "Feeds are no nonsense collections of the latest news articles",
      ms: 2500,
    },
    {
      kind: "feeds" as const,
      info: "It's made for when you want to get straight to the point",
      ms: 2000,
    },
    {
      kind: "feeds" as const,
      info: "No time wasted",
      ms: 1500,
    },
    {
      kind: "feeds" as const,
      info: "Just news articles",
      ms: 2000,
    },
    {
      kind: "dashboard" as const,
      info: "And finally, the Dashboard",
      ms: 1500,
    },
    {
      kind: "dashboard" as const,
      info: "It's where you can see your account activities",
      ms: 2000,
    },
    {
      kind: "dashboard" as const,
      info: "The same activities we use to curate your Glance and Feeds",
      ms: 2500,
    },
    {
      kind: "dashboard" as const,
      info: "And you can also clear this data if you want",
      ms: 1500,
    },
    {
      kind: "dashboard" as const,
      info: "at any time, no questions asked",
      ms: 2000,
    },
    {
      kind: "continue" as const,
      ms: 0,
    },
  ];

  let index = 0;
  let ref = undefined as NodeJS.Timeout | number | undefined;

  $: stage = STAGES[index];

  function auto() {
    if (ref) clearTimeout(ref);
    if (index === STAGES.length - 1) {
      return;
    }

    index++;
    ref = setTimeout(auto, STAGES[index].ms);
  }

  function prev() {
    if (ref) clearTimeout(ref);
    index = Math.max(index - 1, 0);
  }

  function next() {
    if (ref) clearTimeout(ref);
    index = Math.min(index + 1, STAGES.length - 1);
  }

  onMount(() => {
    if (!browser) return;
    const unsub = me.subscribe((res) => {
      if (res.isLoading || !res.data || res.data.user) return;
      goto("/");
    });

    return unsub;
  });

  onDestroy(() => {
    if (ref) clearTimeout(ref);
  });
</script>

<div
  class="flex flex-col flex-shrink-0 items-start justify-start min-h-[100dvh] min-w-full bg-gradient-to-br from-background via-background to-secondary"
>
  <nav class="flex items-center justify-between min-w-full px-6 md:px-16 py-6">
    <a class="flex items-center justify-center gap-1 md:gap-2" href="/">
      <img class="w-4 h-4 md:w-6 md:h-6" src="/spotlight.svg" alt="brand" />
      <h3 class="text-base md:text-xl text-text">Spotlight</h3>
    </a>
    <a
      class={tw(`relative rounded text-sm text-text before:absolute 
      before:left-0 before:top-0 before:h-full before:w-full before:border-b  
      before:border-text before:transition-all before:content-[''] 
      hover:before:scale-x-100 active:before:scale-x-100 md:text-base 
      md:before:scale-x-0 md:before:border-b-2 font-medium md:font-normal`)}
      href="/app"
      data-sveltekit-preload-code
    >
      Skip Intro
    </a>
  </nav>

  <div
    class="flex flex-col items-center justify-center w-full overflow-hidden mt-3 md:mt-0 min-h-[75dvh]"
  >
    {#if stage?.kind?.includes("title")}
      <span
        id={TITLE}
        in:fly={{ y: "5rem", duration: 400 }}
        out:fly={{ y: "-5rem", duration: 200 }}
        class={tw(
          "text-text text-3xl md:text-6xl font-bold w-[90%] text-center transition-all duration-500",
          stage?.kind !== "only-title" ? "text-xl md:text-2xl opacity-80" : ""
        )}
      >
        Welcome to Spotlight
      </span>
    {/if}
    {#if stage?.kind === "only-title"}
      <button
        class={tw(`relative mt-10 rounded text-sm text-text before:absolute 
        before:left-0 before:top-0 before:h-full before:w-full before:border-b  
        before:border-text before:transition-all before:content-[''] 
        hover:before:scale-x-100 active:before:scale-x-100 md:text-lg 
        md:before:scale-x-0 md:before:border-b-2 font-medium md:font-normal`)}
        on:click={auto}
      >
        Play intro
      </button>
    {:else if stage?.kind === "title-and-taglines"}
      <div class="flex flex-col items-center justify-center w-full gap-3 my-6">
        {#key stage.tagline}
          <span
            id={stage.tagline}
            in:fly={{ y: "5rem", duration: 400 }}
            class={tw(
              "text-text text-2xl md:text-5xl font-bold w-[90%] text-center transition-all duration-500"
            )}
          >
            {stage.tagline}
          </span>
        {/key}
      </div>
    {:else if stage?.kind === "glance"}
      <div
        class="flex flex-col items-center justify-center w-full"
        in:fly={{ y: "5rem", duration: 400 }}
      >
        <FeatureExplain
          class="bg-gradient-to-r from-sky-400 to-blue-600"
          alt="Spotlight's Glance"
          title={stage.info}
          preview="/banner/glance.png"
          reverse
        />
      </div>
    {:else if stage?.kind === "feeds"}
      <div
        class="flex flex-col items-center justify-center w-full"
        in:fly={{ x: "5rem", duration: 400 }}
      >
        <FeatureExplain
          class="bg-gradient-to-r from-emerald-600 to-green-400"
          alt="Spotlight's Feeds"
          title={stage.info}
          preview="/banner/feeds.png"
        />
      </div>
    {:else if stage?.kind === "dashboard"}
      <div
        class="flex flex-col items-center justify-center w-full"
        in:fly={{ x: "5rem", duration: 400 }}
      >
        <FeatureExplain
          class="bg-gradient-to-r from-rose-600 to-rose-400"
          alt="Spotlight's Feeds"
          title={stage.info}
          preview="/banner/account.png"
          reverse
        />
      </div>
    {:else}
      <div
        class="flex flex-col items-center justify-center w-full"
        in:fly={{ y: "5rem", duration: 400 }}
      >
        <span class="text-text text md:text-xl font-medium mb-4">
          So, it's time to choose your adventure here
        </span>

        <div class="flex flex-col items-center justify-center gap-3 md:gap-5">
          <Option title="Glance" action="Start swiping with" href="/app">
            <svg
              class="h-8 w-8 fill-black p-1.5 rounded-full bg-blue-300"
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1761_48)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M399.995 633.331C418.405 633.331 433.328 648.254 433.328 666.664V699.997C433.328 718.407 418.405 733.331 399.995 733.331C381.585 733.331 366.661 718.407 366.661 699.997V666.664C366.661 648.254 381.585 633.331 399.995 633.331ZM564.988 564.991C577.003 552.972 595.912 552.048 608.988 562.217L612.128 564.991L635.698 588.561C648.718 601.577 648.718 622.681 635.698 635.701C623.683 647.716 604.774 648.64 591.698 638.473L588.558 635.701L564.988 612.131C551.971 599.111 551.971 578.007 564.988 564.991ZM235.002 564.991C248.02 578.007 248.02 599.114 235.002 612.131L211.432 635.701C198.415 648.717 177.309 648.717 164.292 635.701C151.274 622.684 151.274 601.577 164.292 588.561L187.862 564.991C200.879 551.971 221.985 551.971 235.002 564.991ZM399.995 66.6641C417.09 66.6641 431.178 79.5322 433.104 96.1101L433.328 99.9974V136.678L705.841 409.191C726.129 429.479 713.269 463.539 685.861 466.463L682.035 466.664H563.328C547.885 542.737 480.628 599.997 399.995 599.997C321.883 599.997 256.322 546.26 238.261 473.74L236.663 466.664H117.96C89.2634 466.664 74.2838 433.479 91.5919 412.038L94.154 409.191L366.661 136.683V99.9974C366.661 81.5881 381.585 66.6641 399.995 66.6641ZM494.305 466.664H305.686C319.414 505.504 356.455 533.331 399.995 533.331C441.358 533.331 476.857 508.217 492.073 472.405L494.305 466.664ZM602.368 399.997L402.288 199.92L399.995 199.997L397.708 199.92L197.629 399.997H602.368Z"
                />
                <path
                  d="M513 447C513 472.196 501.147 496.359 480.05 514.175C458.952 531.991 430.337 542 400.5 542C370.663 542 342.048 531.991 320.95 514.175C299.853 496.359 288 472.196 288 447L400.5 447H513Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_1761_48">
                  <rect width="800" height="800" />
                </clipPath>
              </defs>
            </svg>
          </Option>
          <Option title="Feeds" action="Cut to the chase with" href="/app/feed">
            <svg
              class="h-8 w-8 fill-black p-1.5 rounded-full bg-green-300"
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M225 325H325V475H225V325ZM725 175V675C725 679.262 723.911 683.453 721.836 687.175C719.761 690.897 716.769 694.028 713.143 696.268C709.518 698.508 705.38 699.785 701.123 699.976C696.865 700.167 692.63 699.267 688.818 697.36L600 652.951L511.182 697.36C507.71 699.096 503.882 700 500 700C496.118 700 492.29 699.096 488.818 697.36L400 652.951L311.182 697.36C307.71 699.097 303.882 700.002 300 700.002C296.118 700.002 292.29 699.097 288.818 697.36L200 652.951L111.182 697.36C107.37 699.267 103.135 700.167 98.8771 699.976C94.6197 699.785 90.4818 698.508 86.8565 696.268C83.2312 694.028 80.2389 690.897 78.1638 687.175C76.0886 683.453 74.9995 679.262 75 675V175C75.0152 161.744 80.2879 149.035 89.6614 139.661C99.0349 130.288 111.744 125.015 125 125H675C688.256 125.015 700.965 130.288 710.339 139.661C719.712 149.035 724.985 161.744 725 175ZM375 300C375 293.37 372.366 287.011 367.677 282.323C362.989 277.634 356.63 275 350 275H200C193.37 275 187.011 277.634 182.323 282.323C177.634 287.011 175 293.37 175 300V500C175 506.63 177.634 512.989 182.323 517.677C187.011 522.366 193.37 525 200 525H350C356.63 525 362.989 522.366 367.677 517.677C372.366 512.989 375 506.63 375 500V300ZM625 450C625 443.37 622.366 437.011 617.677 432.323C612.989 427.634 606.63 425 600 425H450C443.37 425 437.011 427.634 432.322 432.322C427.634 437.011 425 443.37 425 450C425 456.63 427.634 462.989 432.322 467.678C437.011 472.366 443.37 475 450 475H600C606.63 475 612.989 472.366 617.677 467.677C622.366 462.989 625 456.63 625 450ZM625 350C625 343.37 622.366 337.011 617.677 332.323C612.989 327.634 606.63 325 600 325H450C443.37 325 437.011 327.634 432.322 332.322C427.634 337.011 425 343.37 425 350C425 356.63 427.634 362.989 432.322 367.678C437.011 372.366 443.37 375 450 375H600C606.63 375 612.989 372.366 617.677 367.677C622.366 362.989 625 356.63 625 350Z"
              />
            </svg>
          </Option>
          <Option
            title="Dashboard"
            action="Customise on your"
            href="/app/account"
          >
            <svg
              class="h-8 w-8 fill-black p-1.5 rounded-full bg-rose-300"
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M399.997 66.6641C215.997 66.6641 66.6641 215.997 66.6641 399.997C66.6641 583.997 215.997 733.331 399.997 733.331C583.997 733.331 733.331 583.997 733.331 399.997C733.331 215.997 583.997 66.6641 399.997 66.6641ZM399.997 166.664C455.331 166.664 499.997 211.331 499.997 266.664C499.997 321.997 455.331 366.664 399.997 366.664C344.664 366.664 299.997 321.997 299.997 266.664C299.997 211.331 344.664 166.664 399.997 166.664ZM399.997 639.997C316.664 639.997 242.997 597.331 199.997 532.664C200.997 466.331 333.331 429.997 399.997 429.997C466.331 429.997 598.997 466.331 599.997 532.664C556.997 597.331 483.331 639.997 399.997 639.997Z"
              />
            </svg>
          </Option>
        </div>
      </div>
    {/if}

    <div
      class="flex fixed bottom-5 rounded-full z-50 gap-4 p-2 backdrop-blur-md bg-text/10 items-center justify-center ring-[1px] md:ring-0 ring-text/20"
    >
      <button
        class="hover:bg-primary/30 active:bg-primary/30 rounded-full py-1.5 md:py-2 px-3 text-sm text-white font-medium"
        on:click={prev}
      >
        &larr;
      </button>
      <button
        class={tw(`relative rounded text-sm text-text before:absolute 
        before:left-0 before:top-0 before:h-full before:w-full before:border-b  
        before:border-text before:transition-all before:content-[''] 
        hover:before:scale-x-100 active:before:scale-x-100 md:text-base 
        md:before:scale-x-0 md:before:border-b-2 font-medium md:font-normal`)}
        on:click={auto}
      >
        Auto
      </button>
      <a
        class={tw(`relative rounded text-sm text-text before:absolute 
        before:left-0 before:top-0 before:h-full before:w-full before:border-b  
        before:border-text before:transition-all before:content-[''] 
        hover:before:scale-x-100 active:before:scale-x-100 md:text-base 
        md:before:scale-x-0 md:before:border-b-2 font-medium md:font-normal`)}
        href="/app"
        data-sveltekit-preload-code
      >
        Skip
      </a>
      <button
        class="hover:bg-primary/30 active:bg-primary/30 rounded-full py-1.5 md:py-2 px-3 text-sm text-white font-medium"
        on:click={next}
      >
        &rarr;
      </button>
    </div>
  </div>
</div>
