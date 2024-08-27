<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-french-toast';
	import type { PageData } from './$types';
	import FormControl from '$lib/components/form/FormControl.svelte';
	import FormLabel from '$lib/components/form/FormLabel.svelte';
	import FormInput from '$lib/components/form/FormInput.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	export let data: PageData;

	const { form, errors, enhance, submitting, message } = superForm(data.form, {
		onResult: async ({ result }) => {
			console.log(result);
			if (result.type == 'success') {
				toast.success(
					result?.data?.message || 'Password was reset successfully',
					{
						position: 'top-right',
						duration: 2000
					}
				);
				if (browser) {
					await goto('/login');
				}
			}
		},
		onError: () => {
			console.log('message');
			toast.error($message, {
				position: 'top-right',
				duration: 2000
			});
		}
	});
	$: {
		$form.token = $page.url.searchParams.get('token') || '';
	}
</script>

<div class="hero min-h-screen w-full bg-base-200">
	<div class="hero-content w-full flex-col gap-5 md:gap-20 lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-2xl font-bold md:text-5xl">Password Reset</h1>
			<p class="py-6">Please enter your new password to reset your account.</p>
		</div>
		<div class="card w-full max-w-md shrink-0 bg-base-100 shadow-2xl">
			<form
				class="card-body"
				method="post"
				action="/reset-password"
				use:enhance
			>
				<FormControl>
					<FormInput
						inputType="hidden"
						id="token"
						name="token"
						bind:value={$form.token}
						errorMessage={$errors.token ? $errors.token[0] : ''}
					/>
				</FormControl>

				<FormControl>
					<FormLabel forName="password" label="Password" />

					<FormInput
						inputType="password"
						id="password"
						name="password"
						placeholder="Password"
						bind:value={$form.password}
						errorMessage={$errors.password ? $errors.password[0] : ''}
					/>
				</FormControl>
				<FormControl formControlClass="mt-6">
					<button class="btn btn-primary {$submitting ? 'btn-disabled' : ''}">
						{#if $submitting}
							submitting <span class="loading loading-spinner"></span>
						{:else}
							submit
						{/if}
					</button>
				</FormControl>
			</form>
		</div>
	</div>
</div>
+
