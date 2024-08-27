<script lang="ts">
  import type { PageData } from './$types';
  import ShoppingCart from './ShoppingCart.svelte';
  export let data: PageData;
</script>

<main class="bg-base-100 py-8 md:py-16">
  <div class="container mx-auto px-4 2xl:px-0">
    <h2 class="text-xl font-semibold sm:text-2xl">Shopping Cart</h2>
    <ShoppingCart pageData={data} />
  </div>
</main>
