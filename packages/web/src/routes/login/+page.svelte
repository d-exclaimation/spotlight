<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    createLogin2Mutation,
    createLoginMutation,
    createMeQuery,
  } from "@/lib/api/me";
  import { isTRPCError } from "@/lib/api/trpc";
  import Button from "@/lib/components/button.svelte";
  import PinInput from "@/lib/components/pin-input.svelte";
  import Textfield from "@/lib/components/textfield.svelte";
  import { tw } from "@/lib/tailwind";
  import { auth } from "@/lib/utils/storage";
  import { useQueryClient as getQueryClient } from "@tanstack/svelte-query";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import { fly } from "svelte/transition";
  import Navbar from "../navbar.svelte";

  let email = "";
  let code = "";
  let error = "";
  let submitted = false;

  $: if (email) {
    error = "";
  }

  const title = "Login to Spotlight";
  const description = "Browsing news streamlined";
  const client = getQueryClient();
  const me = createMeQuery();
  const login = createLoginMutation({
    onSuccess: (res) => {
      if (!res.user) {
        error = "Account not found";
        toast.error("Login failed");
        return;
      }
      error = "";
      submitted = true;
      toast.success("Check your email for a magic link");
    },
    onError: (err) => {
      if (isTRPCError(err)) {
        error = err.cause?.message ?? "Invalid email address";
        toast.error("Login failed");
      }
    },
  });

  const login2 = createLogin2Mutation({
    onSuccess: async (res) => {
      if (!res.token) {
        error = "Invalid login code";
        toast.error("Login failed");
        return;
      }
      auth.set({ token: res.token });
      await client.invalidateQueries(["users", "me"]);
      await goto("/app");
      email = "";
      code = "";
      error = "";
      submitted = false;
      toast.success("Welcome back!");
    },
    onError: (err) => {
      if (isTRPCError(err)) {
        error = err.cause?.message ?? "Invalid login code";
        toast.error("Login failed");
      }
    },
  });

  onMount(() => {
    const unsub = me.subscribe((res) => {
      if (!res.isLoading && res.data?.user) {
        goto("/app");
      }
    });

    return unsub;
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
  class="flex flex-col items-start justify-start min-h-[100dvh] min-w-full bg-gradient-to-br from-background via-background to-secondary"
>
  <Navbar />

  <div class="flex flex-col items-center justify-center h-[80dvh] w-full">
    <div class="max-w-md w-[85dvw] flex flex-col">
      {#if submitted}
        <div
          class="flex flex-col w-full"
          in:fly={{ duration: 300, y: "100%", delay: 300 }}
          out:fly={{ duration: 300, y: "100%" }}
        >
          <span class="text-lg md:text-xl font-medium text-text">
            Login to Spotlight
          </span>
          <span class="text-text/75 text-sm md:text-base mt-1">
            Enter the code sent to your email
          </span>
          <div class="flex flex-col items-center justify-center mt-4">
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
          </div>
          <Button
            class={tw(
              "bg-accent mt-4 text-text font-medium",
              $login2.isLoading && "animate-pulse"
            )}
            disabled={!code.length || $login2.isLoading}
            on:click={() => $login2.mutate({ code })}
          >
            {#if $login2.isLoading}
              ...
            {:else}
              Login
            {/if}
          </Button>
        </div>
      {:else}
        <div
          class="flex flex-col w-full"
          in:fly={{ duration: 300, y: "-100%", delay: 300 }}
          out:fly={{ duration: 300, y: "-100%" }}
        >
          <span class="text-lg md:text-xl font-semibold text-text">
            Login to Spotlight
          </span>
          <span class="text-text/75 text-sm md:text-base mt-1">
            Enter your email
          </span>
          <div class="flex flex-col items-center justify-center mt-4">
            <Textfield
              id="email"
              placeholder="Enter your email address"
              bind:value={email}
              {error}
            />
          </div>
          <Button
            class={tw(
              "bg-accent mt-4 text-text font-medium",
              $login.isLoading && "animate-pulse"
            )}
            disabled={!email.length || $login.isLoading}
            on:click={() => $login.mutate({ email })}
          >
            {#if $login.isLoading}
              ...
            {:else}
              Continue
            {/if}
          </Button>
        </div>
      {/if}
    </div>
  </div>
</div>
