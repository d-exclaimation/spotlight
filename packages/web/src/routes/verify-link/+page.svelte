<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { createSignup2Mutation } from "@/lib/api/me";
  import Button from "@/lib/components/button.svelte";
  import PinInput from "@/lib/components/pin-input.svelte";
  import Textfield from "@/lib/components/textfield.svelte";
  import { auth } from "@/lib/utils/storage";
  import { useQueryClient as getQueryClient } from "@tanstack/svelte-query";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Navbar from "../navbar.svelte";

  const client = getQueryClient();
  const signup2 = createSignup2Mutation();

  const _code = $page.url.searchParams.get("code") || "";
  const _email = $page.url.searchParams.get("email") || "";

  const title = "Getting started";
  const description = "Browsing news streamlined";

  onMount(async () => {
    const code = $page.url.searchParams.get("code") || "";
    const email = $page.url.searchParams.get("email") || "";
    if (!code || code.length !== 8 || !email) {
      return;
    }
    const res = await $signup2.mutateAsync({ email, code });
    if (res.token) {
      auth.set({ token: res.token });
      await client.invalidateQueries(["users", "me"]);
    }
    await goto(res.token ? "/welcome" : "/login");
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
  class="flex flex-col items-start justify-start min-h-screen min-w-full bg-gradient-to-br from-background via-background to-secondary"
>
  <Navbar />

  <div
    class="flex flex-col items-center justify-center h-[80vh] w-full"
    transition:fade={{ duration: 200 }}
  >
    <div class="max-w-md w-[85vw] flex flex-col">
      <div class="flex flex-col justify-center w-full h-full">
        <span class="text-lg md:text-xl font-medium text-text">
          Verifying your account
        </span>
        <span class="text-text/75 text-sm md:text-base mt-1">
          Please wait while we log you in
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
              >
                8 digit code
              </span>
            </label>
            <PinInput id="code" value={_code} length={8} />
          </div>
          <Textfield
            id="email"
            placeholder="Enter your email"
            value={_email}
            disabled
          />
        </div>
        <Button
          class="bg-accent mt-4 text-text font-medium animate-pulse text-xl"
          disabled
        >
          ...
        </Button>
      </div>
    </div>
  </div>
</div>
