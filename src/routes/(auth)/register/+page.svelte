<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-french-toast';
	import type { PageData } from './$types';
	import FormControl from '$lib/components/form/FormControl.svelte';
	import FormLabel from '$lib/components/form/FormLabel.svelte';
	import FormInput from '$lib/components/form/FormInput.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	const { form, errors, enhance, submitting } = superForm(data.form, {
		onResult: async ({ result }) => {
			if (result.type == 'success') {
				toast.success('Registration successful!', {
					position: 'top-right',
					duration: 2000
				});
				await goto('/login');
			}
		}
	});
</script>

<div class="hero min-h-screen w-full bg-base-200">
	<div class="hero-content w-full flex-col gap-5 md:gap-20 lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-2xl font-bold md:text-5xl">Welcome to Waveck</h1>
			<p class="py-6">
				Kindly fill out your information to get your account setup
			</p>
		</div>
		<div class="card w-full max-w-md shrink-0 bg-base-100 shadow-2xl">
			<form class="card-body" method="post" action="/register" use:enhance>
				<FormControl>
					<FormLabel forName="first_name" label="First Name" />
					<FormInput
						inputType="text"
						name="first_name"
						id="first_name"
						placeholder="First Name"
						bind:value={$form.first_name}
						errorMessage={$errors.first_name ? $errors.first_name[0] : ''}
					/>
				</FormControl>
				<FormControl>
					<FormLabel forName="last_name" label="Last Name" />
					<FormInput
						inputType="text"
						name="last_name"
						id="last_name"
						placeholder="Last Name"
						bind:value={$form.last_name}
						errorMessage={$errors.last_name ? $errors.last_name[0] : ''}
					/>
				</FormControl>
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
				</FormControl>
				<FormControl formControlClass="mt-6">
					<button class="btn btn-primary {$submitting ? 'btn-disabled' : ''}">
						{#if $submitting}
							<span class="loading loading-spinner"></span>
						{:else}
							Register
						{/if}
					</button>
				</FormControl>
				<p class="mt-6 text-center">
					Already have an account? <a href="/login">Login</a>
				</p>
			</form>
		</div>
	</div>
</div>
