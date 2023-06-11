<script lang="ts">
  import Dialog from "@/lib/components/dialog.svelte";
  import { tw } from "@/lib/tailwind";

  let show = false;
</script>

<button
  class={tw(`relative mt-10 animate-slide-down rounded text-sm font-medium
  text-blue-950 [animation-delay:1.5s] before:absolute before:left-0 
  before:top-0 before:h-full before:w-full before:border-b 
  before:border-black before:transition-all before:content-[''] 
  hover:before:scale-x-100 active:before:scale-x-100 md:mt-16 md:text-base 
  md:before:scale-x-0 md:before:border-b-2`)}
  on:click={() => (show = true)}
>
  Coming soon
</button>

<Dialog bind:show>
  <div
    class="flex flex-col rounded-md p-6 shadow bg-white max-w-[90vw] w-[32rem]"
  >
    <div class="flex items-start w-full justify-between">
      <span class="text-xl font-semibold"> Join the waitlist </span>
      <button on:click={() => (show = false)}>
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 5L4.99998 19M5.00001 5L19 19"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div class="flex flex-col items-center justify-center mt-4">
      <div class="flex w-full flex-col items-start justify-center gap-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="email"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          class={tw(`flex h-10 w-full rounded-md border border-zinc-300
          bg-transparent px-3 py-2 text-sm ring-offset-zinc-200 
          file:border-0 file:bg-transparent file:text-sm file:font-medium 
          placeholder:text-zinc-400/75 focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-zinc-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed 
          disabled:opacity-50`)}
          placeholder="Enter your email address"
        />
      </div>
      <button
        class={tw(`w-full rounded-md bg-primary text-black px-4 py-2
        mt-4 hover:brightness-105 active:brightness-105 focus-visible:ring-2 
        focus-visible:ring-zinc-300 focus-visible:ring-offset-2 
        disabled:cursor-not-allowed disabled:opacity-50`)}
      >
        Sign up
      </button>
    </div>
  </div>
</Dialog>
