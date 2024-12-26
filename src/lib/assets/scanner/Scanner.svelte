<script lang="ts">
	import type { RfidScanner } from '$lib/rfidScanner';
	import { world } from '$lib/assets/world';

	let { scanner }: { scanner: RfidScanner } = $props();
</script>

<div class="scanner" use:world.scanarea={{ scanner, overlap: 0.5 }}></div>

<style>
	.scanner {
		justify-self: end;
		grid-area: scanner;
		border-radius: 0.5vw;
		--width: 50%;
		--height: 70%;
		background-color: crimson;
		height: var(--height);
		width: var(--width);
		transform: translate(-10%) skew(10deg);
	}
</style>
