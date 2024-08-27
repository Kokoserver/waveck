<script lang="ts">
  import type { PageData } from './$types';
  import CartItem from './CartItem.svelte';
  import OrderSummary from './OrderSummary.svelte';
  export let pageData: PageData;

  // Example cart items data
  let cartItems = [
    {
      id: 1,
      name: 'PC system All in One APPLE iMac (2023)',
      price: 1499,
      quantity: 2,
      image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg'
    },
    {
      id: 2,
      name: 'PC system All in One APPLE iMac (2023)',
      price: 1499,
      quantity: 2,
      image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg'
    },
    {
      id: 3,
      name: 'PC system All in One APPLE iMac (2023)',
      price: 1499,
      quantity: 2,
      image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg'
    }
    // ... other items
  ];
</script>

<div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
  <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
    <div class="space-y-6">
      {#each cartItems as item (item.id)}
        <CartItem {item} updateForm={pageData.cartItemForm} />
      {/each}
    </div>
  </div>

  <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
    <OrderSummary />
  </div>
</div>
