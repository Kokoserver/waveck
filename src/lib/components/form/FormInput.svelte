<script lang="ts">
	import { onMount } from 'svelte';

	export let inputType = 'text';
	export let id = '';
	export let name: string;
	export let inputClass = 'input-bordered';
	export let errorMessage = '';
	export let errorClass = '';
	export let disabled = false;
	export let pattern = '';
	export let minlength = 2;
	export let maxlength = 150;
	export let min = 0;
	export let max = 100;
	export let step = 1;
	export let placeholder = '';
	export let value: string | number | Date = '';
	export let options: string[] = [];
	export let selectedOption: string = '';
	export let selectedOptions: string[] = [];
	export let multiple = false;
	export let rows = 5;
	export let cols = 30;
	export let minDate = new Date('2022-01-01');
	export let maxDate = new Date('2022-12-31');

	function handleInput(event: Event) {
		const target = event.target as
			| HTMLInputElement
			| HTMLSelectElement
			| HTMLTextAreaElement;
		value = target.value;
	}
	function setInputType() {
		const element = document.getElementById(id) as HTMLInputElement;
		if (
			element &&
			!['select', 'textarea', 'date', 'number'].includes(inputType)
		) {
			element.type = inputType;
		}
	}
	onMount(() => {
		setInputType();
	});
</script>

<div class="form-control">
	{#if inputType === 'select'}
		{#if multiple}
			<select
				{name}
				{id}
				class={`select ${inputClass}`}
				bind:value={selectedOptions}
				{disabled}
				multiple
				on:change
			>
				{#each options as option}
					<option value={option}>{option}</option>
				{/each}
			</select>
		{:else}
			<select
				{id}
				{name}
				class={`select ${inputClass}`}
				bind:value={selectedOption}
				{disabled}
				on:change
			>
				{#each options as option}
					<option value={option}>{option}</option>
				{/each}
			</select>
		{/if}
	{:else if inputType === 'textarea'}
		<textarea
			{id}
			class={`textarea ${inputClass}`}
			{name}
			bind:value
			{disabled}
			{placeholder}
			{rows}
			{cols}
			{minlength}
			{maxlength}
			on:input={handleInput}
		></textarea>
	{:else if inputType === 'number'}
		<input
			{id}
			{name}
			type="number"
			class={`input ${inputClass}`}
			{pattern}
			bind:value
			{disabled}
			{placeholder}
			{min}
			{max}
			{step}
			on:input={handleInput}
		/>
	{:else if inputType === 'date'}
		<input
			{id}
			{name}
			type="date"
			class={`input ${inputClass}`}
			bind:value
			{disabled}
			{placeholder}
			min={minDate.toISOString().split('T')[0]}
			max={maxDate.toISOString().split('T')[0]}
			on:input={handleInput}
		/>
	{:else}
		<!-- Default to text input -->
		<input
			{id}
			{name}
			class={`input ${inputClass}`}
			bind:value
			{disabled}
			{placeholder}
			{minlength}
			{maxlength}
			on:input={handleInput}
		/>
	{/if}

	{#if errorMessage}
		<label for="error" class={`label ${errorClass}`}>
			<span id="error" class="label-text-alt text-error">{errorMessage}</span>
		</label>
	{/if}
</div>
