<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { createMeQuery, createWaitlistMutation } from "@/lib/api/me";
  import { isTRPCError } from "@/lib/api/trpc";
  import Button from "@/lib/components/button.svelte";
  import Dialog from "@/lib/components/dialog.svelte";
  import Textfield from "@/lib/components/textfield.svelte";
  import { tw } from "@/lib/tailwind";
  import { auth } from "@/lib/utils/storage";
  import { useQueryClient as getQueryClient } from "@tanstack/svelte-query";

  let show = $page.url.searchParams.get("waitlist") === "true";
  let email = "";
  let error = "";

  $: {
    if (show) {
      goto("/?waitlist=true");
    } else {
      goto("/");
    }
  }

  const client = getQueryClient();
  const me = createMeQuery();
  const mutation = createWaitlistMutation({
    onSuccess: async (res) => {
      if (!res.token) {
        error = "Email already in use";
        return;
      }
      error = "";
      show = false;
      email = "";
      auth.set({ token: res.token });
      await client.invalidateQueries(["users", "me"]);
    },
    onError: (err) => {
      if (isTRPCError(err)) {
        error = err.cause?.message ?? "Invalid email address";
      }
    },
  });
</script>

{#if !!$me.data?.user}
  <a
    class={tw(`relative mt-10 animate-slide-down rounded font-medium
    text-text [animation-delay:1.5s] before:absolute before:left-0 
    before:top-0 before:h-full before:w-full before:border-b text-sm
    before:border-text before:transition-all before:content-[''] 
    hover:before:scale-x-100 active:before:scale-x-100 md:mt-16 md:text-lg 
    md:before:scale-x-0 md:before:border-b-2`)}
    href="/app"
  >
    Open &rarr;
  </a>
{:else}
  <button
    class={tw(`relative mt-10 animate-slide-down rounded text-sm 
    font-medium text-text [animation-delay:1.5s] before:absolute 
    before:left-0 before:top-0 before:h-full before:w-full before:border-b  
    before:border-text before:transition-all before:content-[''] 
    hover:before:scale-x-100 active:before:scale-x-100 md:mt-16 md:text-base
    md:before:scale-x-0 md:before:border-b-2`)}
    on:click={() => {
      show = true;
    }}
  >
    Sign up for the waitlist
  </button>
{/if}

<Dialog bind:show>
  <div
    class="flex flex-col rounded-md p-6 shadow bg-black max-w-[90vw] w-[32rem]"
  >
    <div class="flex items-start w-full justify-between">
      <span class="text-xl font-medium text-text"> Join the waitlist </span>

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
        {error}
        placeholder="Enter your email address"
      />

      <div class="flex justify-between items-center w-full mt-2">
        <Button
          class="bg-red-700 mt-4 text-text"
          on:click={() => (show = false)}
        >
          Cancel
        </Button>
        <Button
          class="bg-accent mt-4 text-text"
          disabled={!email.length || $mutation.isLoading}
          on:click={() => {
            $mutation.mutate({ email });
          }}
        >
          {#if $mutation.isLoading}
            ...
          {:else}
            Sign up
          {/if}
        </Button>
      </div>
    </div>
  </div>
</Dialog>
