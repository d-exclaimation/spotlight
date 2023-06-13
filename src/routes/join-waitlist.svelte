<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "@/lib/components/button.svelte";
  import Dialog from "@/lib/components/dialog.svelte";
  import Textfield from "@/lib/components/textfield.svelte";
  import { tw } from "@/lib/tailwind";
  import { onMount } from "svelte";

  let show = false;
  let email = "";

  onMount(() => {
    const data = localStorage.getItem("waitlist");
    if (!data) {
      return;
    }

    const { email } = JSON.parse(data);

    fetch(`/test/${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then(({ allowed }) => {
        if (allowed) {
          goto("/app");
        }
      });
  });
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
      <Textfield id="email" bind:value={email} />

      <div class="flex justify-between items-center w-full mt-2">
        <Button class="bg-accent" on:click={() => (show = false)}>
          Cancel
        </Button>
        <Button
          class="bg-primary"
          on:click={() => {
            if (!localStorage.getItem("waitlist")) {
              localStorage.setItem(
                "waitlist",
                JSON.stringify({
                  value: email,
                  timestamp: new Date().toISOString(),
                })
              );
            }
            show = false;
          }}
        >
          Sign up
        </Button>
      </div>
    </div>
  </div>
</Dialog>
