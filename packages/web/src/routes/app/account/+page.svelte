<script lang="ts">
  import { goto } from "$app/navigation";
  import { createDashboardQuery } from "@/lib/api/dashboard";
  import { createMeQuery } from "@/lib/api/me";
  import Button from "@/lib/components/button.svelte";
  import Popover from "@/lib/components/popover.svelte";
  import Error from "@/lib/components/status/error.svelte";
  import Loading from "@/lib/components/status/loading.svelte";
  import { avatar } from "@/lib/utils/image";
  import { auth } from "@/lib/utils/storage";
  import { hoursAndMinutesSince } from "@/lib/utils/time";
  import { useQueryClient as getQueryClient } from "@tanstack/svelte-query";
  import { beginning } from "../stores";
  import ActivitiesChart from "./activities-chart.svelte";
  import EditDialog from "./edit-dialog.svelte";
  import TopCategories from "./top-categories.svelte";

  const title = "Account";
  const description = "View and manage your account and its dashboard";
  const client = getQueryClient();
  const me = createMeQuery();
  const dashboard = createDashboardQuery();

  let open = false;
  let editing = false;

  function openEdit() {
    open = false;
    editing = true;
  }

  async function logout() {
    auth.clear();
    await client.invalidateQueries(["users", "me"]);
    await goto("/");
  }

  const options = {
    navigation: [
      { icon: "/icons/glance.svg", label: "Glance", click: () => goto("/app") },
      {
        icon: "/icons/feeds.svg",
        label: "Feeds",
        click: () => goto("/app/feed"),
      },
    ],
    settings: [
      {
        icon: "/icons/edit.svg",
        label: "Edit",
        command: "⇧⌘E",
        click: openEdit,
      },
      {
        icon: "/icons/account.svg",
        label: "Account",
        click: () => goto("/app/account"),
      },
    ],
    logout: {
      label: "Logout",
      icon: "/icons/logout.svg",
      command: "⇧⌘Q",
      click: logout,
    },
  };

  $: time = hoursAndMinutesSince($beginning);
  $: maxEngagements =
    $dashboard.data?.user?.activities?.reduce(
      (acc, curr) => (curr.engagements > acc ? curr.engagements : acc),
      0
    ) ?? 1;
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === "Escape") {
      open = false;
      editing = false;
    }
    const isEdit = e.metaKey && e.shiftKey && (e.key === "E" || e.key === "e");
    const isLogout =
      e.metaKey && e.shiftKey && (e.key === "Q" || e.key === "q");
    if (isEdit) {
      openEdit();
    }
    if (isLogout) {
      logout();
    }
  }}
/>

<svelte:head>
  <title>{title}</title>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>

<div
  class="flex flex-col items-center justify-start w-full text-text md:mt-6 flex-1"
>
  {#if $me.isLoading || $dashboard.isLoading || !$me.data?.user || !$dashboard.data?.user}
    <Loading />
  {:else if $me.error}
    <Error label="Not logged in" error={$me.error} />
  {:else if $dashboard.error}
    <Error label="Failed to load dashboard" error={$dashboard.error} />
  {:else}
    <div class="flex items-center justify-start mb-2 p-2 md:p-3 w-full gap-2">
      <!-- Profile -->
      <img
        class="w-16 md:w-20 p-2 relative aspect-square object-cover rounded-xl"
        src={avatar($me.data.user.username)}
        alt={`Avatar for ${$me.data.user.username}`}
      />
      <div class="flex flex-col items-start flex-1 h-full px-2 py-3">
        <span class="font-medium text-text text-lg md:text-2xl">
          {$me.data.user.username}
        </span>
        <span
          class="font-light text-text/75 text-[0.675rem] leading-tight md:text-sm"
        >
          {$me.data.user.email}
        </span>
      </div>

      <!-- Settings -->
      <div class="flex items-center justify-end">
        <div class="relative">
          <Button
            class="relative hover:bg-white/10 active:bg-white/10 p-1 md:p-2 z-10"
            on:click={() => (open = !open)}
          >
            <img
              src="/icons/settings.svg"
              alt="Settings"
              class="w-5 md:w-6 aspect-square"
            />
          </Button>
          <Popover bind:open>
            <div
              class="flex flex-col px-2 items-center justify-center w-full rounded-xl
                md:w-52 font-medium overflow-hidden md:rounded-md p-1 shadow-md"
            >
              <div class="flex w-full items-center p-2">
                <h3 class="text-base font-bold text-text">My Account</h3>
              </div>
              <span class="w-full h-[1px] bg-text/20 my-1" />
              {#each options.navigation as opt (opt.label)}
                <Button
                  class="flex items-center gap-2 w-full px-2 py-2 text-start rounded text-text hover:bg-neutral-900 active:bg-neutral-900"
                  on:click={opt.click}
                >
                  <img src={opt.icon} alt="Edit" class="w-4" />
                  <span> {opt.label} </span>
                  {#if "command" in opt}
                    <span class="ml-auto font-extralight text-text/90 text-sm">
                      {opt.command}
                    </span>
                  {/if}
                </Button>
              {/each}
              <span class="w-full h-[1px] bg-text/20 my-1" />
              {#each options.settings as opt (opt.label)}
                <Button
                  class="flex items-center gap-2 w-full px-2 py-2 text-start rounded text-text hover:bg-neutral-900 active:bg-neutral-900"
                  on:click={opt.click}
                >
                  <img src={opt.icon} alt="Edit" class="w-4" />
                  <span> {opt.label} </span>
                  {#if "command" in opt}
                    <span class="ml-auto font-extralight text-text/90 text-sm">
                      {opt.command}
                    </span>
                  {/if}
                </Button>
              {/each}
              <span class="w-full h-[1px] bg-text/20 my-1" />
              <Button
                class="flex items-center gap-2 w-full px-2 py-2 text-start rounded text-text hover:bg-neutral-900 active:bg-neutral-900"
                on:click={options.logout.click}
              >
                <img src={options.logout.icon} alt="Edit" class="w-4" />
                <span> {options.logout.label} </span>
                {#if "command" in options.logout}
                  <span class="ml-auto font-extralight text-text/90 text-sm">
                    {options.logout.command}
                  </span>
                {/if}
              </Button>
            </div>
          </Popover>
        </div>
      </div>
    </div>

    <!-- Quick stats -->
    <div class="flex w-full p-2 md:p-3 items-center justify-around">
      <div class="flex justify-center flex-col flex-[2]">
        <span class="font-light text-sm md:text-lg">Engangement</span>
        <div class="flex gap-2 items-end">
          <span class="font-semibold text-xl md:text-3xl">
            {$dashboard.data.user.engagenments}
          </span>
          <span class="font-light mr-1">news</span>
        </div>
      </div>
      <div class="flex justify-center flex-col flex-[3] md:flex-[3]">
        <span class="font-light text-sm md:text-lg">Time spent</span>
        <div class="flex gap-2 items-end">
          <span class="font-semibold text-xl md:text-3xl">
            {time.hours % 24}
          </span>
          <span class="font-light mr-1">hr</span>
          <span class="font-semibold text-xl md:text-3xl">
            {time.minutes}
          </span>
          <span class="font-light">min</span>
        </div>
      </div>
    </div>

    <!-- Activities -->
    <ActivitiesChart activities={$dashboard.data.user.activities} />

    <!-- Categories -->
    <TopCategories topCategories={$dashboard.data.user.topCategories} />
  {/if}
</div>

{#if $me.data?.user}
  <EditDialog bind:editing me={$me.data?.user ?? null} />
{/if}
