<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    createMeQuery,
    createSignup2Mutation,
    createSignupMutation,
  } from "@/lib/api/me";
  import { isTRPCError } from "@/lib/api/trpc";
  import Button from "@/lib/components/button.svelte";
  import Dialog from "@/lib/components/dialog.svelte";
  import PinInput from "@/lib/components/pin-input.svelte";
  import Textfield from "@/lib/components/textfield.svelte";
  import { tw } from "@/lib/tailwind";
  import { auth } from "@/lib/utils/storage";
  import { useQueryClient as getQueryClient } from "@tanstack/svelte-query";
  import { fly } from "svelte/transition";

  let show = false;
  let submitted = false;
  let username = "";
  let email = "";
  let code = "";
  let error = "";

  const client = getQueryClient();
  const me = createMeQuery();
  const signup = createSignupMutation({
    onSuccess: (res) => {
      if (!res.success) {
        error = "Email already in use";
        return;
      }
      error = "";
      submitted = true;
    },
    onError: (err) => {
      if (isTRPCError(err)) {
        error = err.cause?.message ?? "Invalid email address";
      }
    },
  });
  const signup2 = createSignup2Mutation({
    onSuccess: async (res) => {
      if (!res.token) {
        error = "Invalid login code";
        return;
      }
      auth.set({ token: res.token });
      await client.invalidateQueries(["users", "me"]);
      await goto("/welcome");
      username = "";
      email = "";
      code = "";
      error = "";
      submitted = false;
    },
    onError: (err) => {
      if (isTRPCError(err)) {
        error = err.cause?.message ?? "Invalid login code";
      }
    },
  });

  function cancel() {
    show = false;
    username = "";
    email = "";
    code = "";
    error = "";
    submitted = false;
  }
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
    class={tw(`relative mt-10 animate-slide-down rounded font-medium
    text-text [animation-delay:1.5s] before:absolute before:left-0 
    before:top-0 before:h-full before:w-full before:border-b text-sm
    before:border-text before:transition-all before:content-[''] 
    hover:before:scale-x-100 active:before:scale-x-100 md:mt-16 md:text-lg 
    md:before:scale-x-0 md:before:border-b-2`)}
    on:click={() => {
      show = true;
    }}
  >
    Get started
  </button>
{/if}

<Dialog bind:show>
  <div
    class="flex flex-col rounded-md p-6 shadow bg-black max-w-[95vw] w-[32rem]"
  >
    <div class="flex flex-col items-center justify-center">
      <div class="flex flex-col w-full">
        <div class="flex items-start w-full justify-between">
          {#if submitted}
            <span
              class="text-lg md:text-xl font-medium text-text"
              in:fly={{ y: "2.5rem", duration: 300, opacity: 0 }}
            >
              Verify your email
            </span>
          {:else}
            <span class="text-lg md:text-xl font-medium text-text">
              Join Spotlight
            </span>
          {/if}

          <button on:click={cancel}>
            <svg
              class="w-6 h-6 fill-white text-text"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5L4.99998 19M5.00001 5L19 19"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        {#if submitted}
          <span
            class="text-text/75 text-sm md:text-base mt-1"
            in:fly={{ y: "2.5rem", duration: 300, delay: 15, opacity: 0 }}
          >
            Enter the code sent to your email
          </span>
        {:else}
          <span class="text-text/75 text-sm md:text-base mt-1">
            Enter your details to create an account
          </span>
        {/if}
        {#if submitted}
          <div
            class="flex flex-col items-center justify-center gap-3 mt-4"
            in:fly={{ y: "2.5rem", duration: 300, delay: 30, opacity: 0 }}
          >
            <div
              class="flex w-full flex-col items-start justify-center gap-2 md:gap-3"
            >
              <label
                class="flex items-center text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="code"
              >
                <span
                  class="transition-all data-[error=true]:opacity-0 data-[error=true]:-z-0 data-[error=true]:translate-y-5"
                  data-error={!!error}
                >
                  8 digit code
                </span>
                <span
                  class="absolute opacity-0 -z-10 translate-y-5 transition-all data-[error=true]:opacity-100 data-[error=true]:z-0 data-[error=true]:translate-y-0 text-red-300"
                  data-error={!!error}
                >
                  {error}
                </span>
              </label>
              <PinInput id="code" bind:value={code} length={8} />
            </div>
            <Textfield
              id="email"
              placeholder="Enter your email"
              value={email}
              disabled
            />
          </div>
        {:else}
          <div class="flex flex-col items-center justify-center gap-3 mt-4">
            <Textfield
              class="mb-2"
              id="username"
              label="Username"
              placeholder="Enter your username"
              bind:value={username}
            />
            <Textfield
              id="email"
              placeholder="Enter your email"
              bind:value={email}
              {error}
            />
          </div>
        {/if}
        <div class="flex justify-between items-center w-full mt-2">
          <Button class="bg-red-700 mt-4 text-text" on:click={cancel}>
            Cancel
          </Button>
          {#if submitted}
            <Button
              class={tw(
                "bg-accent mt-4 text-text font-medium",
                $signup2.isLoading && "animate-pulse"
              )}
              disabled={!code.length || $signup2.isLoading}
              on:click={() => $signup2.mutate({ email, code })}
            >
              {#if $signup2.isLoading}
                ...
              {:else}
                Continue
              {/if}
            </Button>
          {:else}
            <Button
              class={tw(
                "bg-accent mt-4 text-text font-medium",
                $signup.isLoading && "animate-pulse"
              )}
              disabled={!email.length || $signup.isLoading}
              on:click={() => $signup.mutate({ username, email })}
            >
              {#if $signup.isLoading}
                ...
              {:else}
                Continue
              {/if}
            </Button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</Dialog>
