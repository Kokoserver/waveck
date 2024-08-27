<script lang="ts">
	import { toast } from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data: PageData;
	let page: { title: string; message?: string; isLoading?: boolean } = {
		title: 'Verifying Email',
		isLoading: true,
		message: 'Please wait while we verify your email'
	};
	$: {
		if (data.isError) {
			page.message = 'An error occurred while verifying your email';
			page.isLoading = false;
			toast.error(data.message);
			if (browser) {
				goto('/');
			}
		}
		if (!data.isError) {
			page.isLoading = false;
			toast.success('Email verified successfully', {
				duration: 5000,
				position: 'top-right'
			});
			if (browser) {
				if (data.redirectTo) {
					goto(data.redirectTo);
				}
				if (browser) {
					goto('/');
				}
			}
		}
	}
</script>

<div
	class="fixed bottom-0 left-0 right-0 top-0 z-50 grid h-screen w-screen grid-rows-[auto_1fr_auto] items-center justify-center bg-gray-300"
>
	<div class="flex flex-col items-center">
		<h2 class="text-md mb-4 font-bold">
			Please wait while we verify your email
		</h2>
		<div class="flex items-center justify-center">
			<span class="loading loading-bars loading-xs"></span>
			<span class="loading loading-bars loading-sm"></span>
			<span class="loading loading-bars loading-md"></span>
			<span class="loading loading-bars loading-lg"></span>
		</div>
	</div>
</div>
+
