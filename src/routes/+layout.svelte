<script>
	import { Toaster } from 'svelte-french-toast';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import '../app.css';
</script>

<Toaster />
<Navbar />
<main class="grid grid-rows-[auto_1fr_auto]">
	<slot />
</main>
<Footer />
