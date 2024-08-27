<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import { toast } from 'svelte-french-toast';
  export let formData;
  const { form, errors, enhance, submitting } = superForm(formData, {
    onResult: async ({ result }) => {
      if (result.type == 'success') {
        toast.success(result?.data?.message || 'product is added successfully', {
          position: 'top-right',
          duration: 2000
        });
      }
    },
    onError: (data) => {
      toast.error(data.result.error.message, {
        position: 'top-right',
        duration: 5000
      });
    }
  });
</script>

<div class="card w-full max-w-sm border border-gray-200 bg-base-100 shadow-xl dark:border-gray-700">
  <figure class="p-8">
    <img
      src="https://www.dropbox.com/s/mlor33hzk73rh0c/x14423.png?dl=1"
      alt="product"
      class="h-[20rem] object-contain"
    />
  </figure>
  <div class="card-body px-5 pb-5">
    <h2 class="card-title text-xl font-light text-gray-900 dark:text-white">
      Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
    </h2>

    <div class="flex items-center justify-between">
      <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
      <form action="/cart/?/addToCart" method="post" use:enhance>
        <input type="hidden" bind:value={$form.product_id} />
        <button class="btn btn-primary" disabled={$submitting}
          >+
          {#if $submitting}
            <span class="loading loading-spinner"></span>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          {/if}
        </button>
      </form>
    </div>
  </div>
</div>
