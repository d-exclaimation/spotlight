<script lang="ts">
  import { createMeQuery } from "@/lib/api/me";
  import { trpc } from "@/lib/api/trpc";
  import Button from "@/lib/components/button.svelte";
  import Redirect from "@/lib/components/redirect.svelte";
  import Textfield from "@/lib/components/textfield.svelte";
  import { auth } from "@/lib/utils/storage";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import { fly } from "svelte/transition";
  import Navbar from "../navbar.svelte";

  let email = "";
  let code = "";
  let submitted = false;

  const client = useQueryClient();
  const me = createMeQuery();
  const login = createMutation({
    mutationKey: ["login", "first"],
    mutationFn: trpc.login.mutate,
    onSuccess(res) {
      submitted = !!res.user;
    },
  });

  const login2 = createMutation({
    mutationKey: ["login", "second"],
    mutationFn: trpc.login2.mutate,
    onSuccess(res) {
      if (res.token) {
        auth.set({ token: res.token });
        client.invalidateQueries(["users", "me"]);
      }
      email = "";
      code = "";
      submitted = false;
    },
  });
</script>

<div
  class="flex flex-col items-start justify-start min-h-screen min-w-[100vw] bg-gradient-to-br from-background via-background to-secondary"
>
  <Navbar />

  <div class="flex flex-col items-center justify-center h-[80vh] w-full">
    <div class="max-w-md w-[90vw] flex flex-col">
      {#if submitted}
        <div
          class="flex flex-col w-full"
          in:fly={{ duration: 300, y: "100%", delay: 300 }}
          out:fly={{ duration: 300, y: "100%" }}
        >
          <span class="text-lg md:text-xl font-semibold text-text">
            Login to Spotlight
          </span>
          <span class="text-text/75 text-sm md:text-base mt-1">
            Enter the code sent to your email
          </span>
          <div class="flex flex-col items-center justify-center mt-4">
            <Textfield
              id="code"
              label="8 digit code"
              placeholder="Enter the 8 digit code given in your email"
              bind:value={code}
            />
          </div>
          <Button
            class="bg-accent text-text font-medium"
            on:click={() => $login2.mutate({ code })}
          >
            Login
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
            />
          </div>
          <Button
            class="bg-accent text-text font-medium"
            on:click={() => $login.mutate({ email })}
          >
            Continue
          </Button>
        </div>
      {/if}
    </div>
  </div>
</div>

{#if !$me.isLoading && $me.data && $me.data.user}
  <Redirect href="/app" />
{/if}
