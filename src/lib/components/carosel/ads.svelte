<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	let options = { loop: false };
	let plugins = [Autoplay()];
</script>

<div class="embla__container" use:emblaCarouselSvelte={{ options, plugins }}>
	<div class="embla__slide">Slide 1</div>
	<div class="embla__slide">Slide 2</div>
	<div class="embla__slide">Slide 3</div>
</div>
