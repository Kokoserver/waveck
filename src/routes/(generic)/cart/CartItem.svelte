<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import { toast } from 'svelte-french-toast';
  export let item;

  export let updateForm;
  const { enhance } = superForm(updateForm, {
    onResult: async ({ result }) => {
      console.log(result);
      if (result.type == 'success') {
        toast.success(result?.data?.message || 'cart was updated ', {
          position: 'top-right',
          duration: 2000
        });
      }
    },
    onError: (data) => {
      toast.error(data.result.error.message, {
        position: 'top-right',
        duration: 2000
      });
    }
  });
</script>

<div class="card bg-base-100 shadow">
  <div class="card-body p-4 sm:p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div class="flex items-center space-x-4 sm:space-x-6">
        <figure class="shrink-0">
          <img src={item.image} alt={item.name} class="h-20 w-20 object-contain" />
        </figure>

        <div class="min-w-0 flex-grow">
          <h3 class="truncate text-sm font-medium text-gray-900 dark:text-white sm:text-base">
            <a href="/shop/{item.id}" class="hover:underline">{item.name}</a>
          </h3>
          <div class="mt-2 flex items-center space-x-2 text-sm">
            <form action="?/removeCartItem" method="post" use:enhance>
              <input type="hidden" name="item_id" value={item.id} />
              <button
                class="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path></svg
                >
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between sm:mt-0 sm:justify-end sm:space-x-6">
        <div class="flex items-center space-x-2">
          <form action="?/decreaseItem" method="post" use:enhance>
            <input type="hidden" name="item_id" value={item.id} />
            <button class="btn btn-square btn-sm">-</button>
          </form>
          <input
            type="text"
            class="input input-sm input-bordered w-14 text-center"
            bind:value={item.quantity}
          />
          <form action="?/increaseItem" method="post" use:enhance>
            <input type="hidden" name="item_id" value={item.id} />
            <button class="btn btn-square btn-sm">+</button>
          </form>
        </div>

        <div class="text-right">
          <p class="text-base font-bold text-gray-900 dark:text-white">${item.price}</p>
        </div>
      </div>
    </div>
  </div>
</div>
