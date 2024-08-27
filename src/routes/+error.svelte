<script lang="ts">
	import { page } from '$app/stores';
</script>

<main
	class="grid h-screen grid-rows-[auto_1fr_auto] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
>
	<div class="text-center">
		<p class="text-base font-semibold text-indigo-600">{$page.status}</p>
		<h1
			class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
		>
			{$page.error?.message}
		</h1>
		<p class="mt-6 text-base leading-7 text-gray-600">
			Sorry, we couldn’t complete your request
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a href="/" class="btn btn-primary">Go back home</a>
			<a href="/contact" class="text-sm font-semibold text-gray-900"
				>Contact support <span aria-hidden="true">&rarr;</span></a
			>
		</div>
	</div>
</main>
