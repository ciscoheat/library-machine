<script lang="ts">
	import type { RfidScanner } from '$lib/rfidScanner';
	import { world } from '$lib/assets/world';

	let { scanner }: { scanner: RfidScanner } = $props();
</script>

<div id="card-reader" use:world.scanarea={{ scanner, overlap: 0.15 }}></div>

<style>
	#card-reader {
		grid-area: card-reader;
		justify-self: start;
		--size: 80px;
		background-image: url('./card-reader.svg');
		background-repeat: no-repeat;
		height: var(--size);
		width: var(--size);
	}
</style>
