<script lang="ts">
  import { createEditMutation } from "@/lib/api/me";
  import { isTRPCError, type Me } from "@/lib/api/trpc";
  import Button from "@/lib/components/button.svelte";
  import Dialog from "@/lib/components/dialog.svelte";
  import Textfield from "@/lib/components/textfield.svelte";
  import { avatar } from "@/lib/utils/image";
  import { useQueryClient as getQueryClient } from "@tanstack/svelte-query";
  import toast from "svelte-french-toast";

  export let editing: boolean;
  export let me: Me;

  const client = getQueryClient();
  const mutation = createEditMutation({
    onSuccess: async (res) => {
      if (!res.user) {
        error = "Cannot edit a user that does not exist";
        toast.error("Profile update failed");
        return;
      }
      error = "";
      editing = false;
      username = res.user.username;
      toast.success("Profile updated");
      await client.invalidateQueries(["users", "me"]);
    },
    onError: (err) => {
      if (isTRPCError(err)) {
        error =
          err.cause?.message ?? "Name must be between 3 and 20 characters";
        toast.error("Profile update failed");
      }
    },
  });

  let username = me?.username ?? "";
  let error = "";
</script>

{#if me}
  <Dialog bind:show={editing}>
    <div
      class="flex flex-col rounded-md p-6 shadow bg-black max-w-[90vw] w-[32rem]"
    >
      <div class="flex items-start w-full justify-between">
        <span class="text-xl font-medium text-text"> Edit your profile </span>
        <button on:click={() => (editing = false)}>
          <svg
            class="w-6 h-6"
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
      <div class="flex w-full items-center my-2">
        <img
          class="w-16 md:w-20 relative aspect-square object-cover rounded-xl"
          src={avatar(username)}
          alt={`Avatar for ${username}`}
        />
      </div>
      <div class="flex flex-col items-center justify-center mt-4 gap-3">
        <Textfield
          id="username"
          label="Username"
          bind:value={username}
          {error}
          placeholder="Enter your username"
        />
        <Textfield
          id="email"
          label="Email"
          value={me?.email ?? ""}
          disabled
          placeholder="Enter your email address"
        />
        <Textfield
          id="join"
          label="Join at"
          value={me?.createdAt
            ? new Date(me.createdAt).toLocaleString("en-NZ")
            : ""}
          disabled
        />

        <div class="flex justify-between items-center w-full mt-2">
          <Button
            class="bg-red-700 text-text"
            on:click={() => (editing = false)}
          >
            Cancel
          </Button>
          <Button
            class="bg-accent text-text"
            disabled={!username.length || $mutation.isLoading}
            on:click={() => $mutation.mutate({ username })}
          >
            {#if $mutation.isLoading}
              ...
            {:else}
              Edit
            {/if}
          </Button>
        </div>
      </div>
    </div>
  </Dialog>
{/if}
