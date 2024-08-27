<script lang="ts">
  import type { PageData } from './$types';
  import Ads from '$lib/components/carosel/ads.svelte';
  import Card from '$lib/components/product/card.svelte';
  export let data: PageData;
</script>

<section class="my-30 mx-auto">
  <Ads />
  <div class="my-10 grid grid-cols-4 gap-x-5 gap-y-10">
    {#each [1, 2, 3, 4, 5] as i}
      <Card formData={data.cartForm} />
    {/each}
  </div>
</section>
