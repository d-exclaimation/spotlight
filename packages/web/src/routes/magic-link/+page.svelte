<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { createLogin2Mutation } from "@/lib/api/me";
  import Button from "@/lib/components/button.svelte";
  import PinInput from "@/lib/components/pin-input.svelte";
  import { auth } from "@/lib/utils/storage";
  import { useQueryClient as getQueryClient } from "@tanstack/svelte-query";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Navbar from "../navbar.svelte";

  const client = getQueryClient();
  const login2 = createLogin2Mutation();

  const _code = $page.url.searchParams.get("code") || "";

  onMount(async () => {
    const code = $page.url.searchParams.get("code") || "";
    if (!code || code.length !== 8) {
      return;
    }
    const res = await $login2.mutateAsync({ code });
    if (res.token) {
      auth.set({ token: res.token });
      await client.invalidateQueries(["users", "me"]);
    }
    await goto(res.token ? "/app" : "/login");
  });
</script>

<div
  class="flex flex-col items-start justify-start min-h-screen min-w-[100vw] bg-gradient-to-br from-background via-background to-secondary"
>
  <Navbar />

  <div
    class="flex flex-col items-center justify-center h-[80vh] w-full"
    transition:fade={{ duration: 200 }}
  >
    <div class="max-w-md w-[85vw] flex flex-col">
      <div class="flex flex-col justify-center w-full h-full">
        <span class="text-lg md:text-xl font-semibold text-text">
          Logging in to Spotlight
        </span>
        <span class="text-text/75 text-sm md:text-base mt-1">
          Please wait while we log you in
        </span>
        <div class="flex flex-col items-center justify-center mt-4">
          <div
            class="flex w-full flex-col items-start justify-center gap-2 md:gap-3"
          >
            <label
              class="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="code"
            >
              8 digit code
            </label>
            <PinInput id="code" value={_code} disabled length={8} />
          </div>
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
