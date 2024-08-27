<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-french-toast';
	import type { PageData } from './$types';
	import FormControl from '$lib/components/form/FormControl.svelte';
	import FormLabel from '$lib/components/form/FormLabel.svelte';
	import FormInput from '$lib/components/form/FormInput.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	const { form, errors, enhance, submitting, message } = superForm(data.form, {
		onResult: async ({ result }) => {
			console.log(result);
			if (result.type == 'success') {
				toast.success(result?.data?.message || 'login successful', {
					position: 'top-right',
					duration: 2000
				});
				await goto('/login');
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
</script>

<div class="hero min-h-screen w-full bg-base-200">
	<div class="hero-content w-full flex-col gap-5 md:gap-20 lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-2xl font-bold md:text-5xl">Login now!</h1>
			<p class="py-6">
				Kindly fill out your information to login to your account.
			</p>
		</div>
		<div class="card w-full max-w-md shrink-0 bg-base-100 shadow-2xl">
			<form class="card-body" method="post" action="/login" use:enhance>
				<FormControl>
					<FormLabel forName="email" label="Email" />
					<FormInput
						inputType="email"
						id="email"
						name="email"
						placeholder="email"
						bind:value={$form.email}
						errorMessage={$errors.email ? $errors.email[0] : ''}
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
					<label for="" class="label">
						<a href="/forgot-password" class="link-hover link label-text-alt"
							>Forgot password?</a
						>
					</label>
				</FormControl>
				<FormControl formControlClass="mt-6">
					<button class="btn btn-primary {$submitting ? 'btn-disabled' : ''}">
						{#if $submitting}
							<span class="loading loading-spinner"></span>
						{:else}
							Login
						{/if}
					</button>
				</FormControl>
				<p class="mt-6 text-center">
					Don't have account yet? <a href="/register">Register</a>
				</p>
			</form>
		</div>
	</div>
</div>
+
