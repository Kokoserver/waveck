<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	export let data: PageData;

	const { form, message, errors } = superForm(data.form);
	if ($message) {
		console.log($message);
	}
</script>

<form action="/" method="post">
	<div>
		<input type="text" name="first_name" id="" bind:value={$form.first_name} />
		{#if $errors.first_name}
			<p>{$errors.first_name[0]}</p>
		{/if}
	</div>
	<div>
		<input type="text" name="last_name" id="" bind:value={$form.last_name} />
		{#if $errors.last_name}
			<p>{$errors.last_name[0]}</p>
		{/if}
	</div>
	<div>
		<input type="email" name="email" id="" bind:value={$form.email} />
		{#if $errors.email}
			<p>{$errors.email[0]}</p>
		{/if}
	</div>
	<div>
		<input type="password" name="password" id="" bind:value={$form.password} />
		{#if $errors.password}
			<p>{$errors.password[0]}</p>
		{/if}
	</div>

	<button type="submit">Register</button>
</form>
