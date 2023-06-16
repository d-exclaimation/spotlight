<script lang="ts">
  import { createMeQuery } from "@/lib/api/me";
  import { trpc } from "@/lib/api/trpc";
  import Button from "@/lib/components/button.svelte";
  import Dialog from "@/lib/components/dialog.svelte";
  import Textfield from "@/lib/components/textfield.svelte";
  import { tw } from "@/lib/tailwind";
  import { auth } from "@/lib/utils/storage";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ learn: void }>();

  let show = false;
  let email = "";

  const client = useQueryClient();
  const me = createMeQuery();
  const mutation = createMutation({
    mutationKey: ["waitlist", "join"],
    mutationFn: trpc.preregister.mutate,
    onSuccess: async (res) => {
      if (res.token) {
        auth.set({ token: res.token });
        await client.invalidateQueries(["users", "me"]);
      }
      show = false;
      email = "";
    },
  });
</script>

{#if !!$me.data?.user}
  <a
    class={tw(`relative mt-10 animate-slide-down rounded font-medium
    text-text [animation-delay:1.5s] before:absolute before:left-0 
    before:top-0 before:h-full before:w-full before:border-b  
    before:border-text before:transition-all before:content-[''] 
    hover:before:scale-x-100 active:before:scale-x-100 md:mt-16 md:text-base 
    md:before:scale-x-0 md:before:border-b-2`)}
    href="/app"
  >
    Open &rarr;
  </a>
{:else}
  <button
    class={tw(`relative mt-10 animate-slide-down rounded text-sm font-medium
    text-text [animation-delay:1.5s] before:absolute before:left-0 
    before:top-0 before:h-full before:w-full before:border-b  
    before:border-text before:transition-all before:content-[''] 
    hover:before:scale-x-100 active:before:scale-x-100 md:mt-16 md:text-base 
    md:before:scale-x-0 md:before:border-b-2`)}
    on:click={() => (show = true)}
  >
    Sign up for the waitlist
  </button>

  <button
    class="text-text/70 text-xs mt-8 animate-slide-down [animation-delay:1.75s]"
    on:click={() => dispatch("learn")}
  >
    <span class="block animate-bounce [animation-duration:2s]">
      Learn more &darr;
    </span>
  </button>
{/if}

<Dialog bind:show>
  <div
    class="flex flex-col rounded-md p-6 shadow bg-black max-w-[90vw] w-[32rem]"
  >
    <div class="flex items-start w-full justify-between">
      <span class="text-xl font-semibold text-text"> Join the waitlist </span>

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
    <span class="text-text/75 text-sm md:text-base mt-1">
      Sign up for the waitlist to get early access to the app.
    </span>
    <div class="flex flex-col items-center justify-center mt-4">
      <Textfield
        id="email"
        bind:value={email}
        placeholder="Enter your email address"
      />

      <div class="flex justify-between items-center w-full mt-2">
        <Button class="bg-red-700 text-text" on:click={() => (show = false)}>
          Cancel
        </Button>
        <Button
          class="bg-accent text-text font-medium"
          disabled={!email.length || $mutation.isLoading}
          on:click={() => {
            $mutation.mutate({ email });
          }}
        >
          Sign up
        </Button>
      </div>
    </div>
  </div>
</Dialog>
