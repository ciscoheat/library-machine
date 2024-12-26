<script lang="ts">
	import type { RfidScanner } from '$lib/rfidScanner';
	import type { DropzoneOptions } from '@interactjs/actions/drop/plugin';

	import { world } from '$lib/assets/world';

	let { scanner }: { scanner: RfidScanner } = $props();

	const events: DropzoneOptions = {
		ondrop(e) {
			//console.log(e.relatedTarget);
			const item = world.get(e.relatedTarget);
			if (item) scanner.scan(item);
		}
	};
</script>

<div class="scanner" use:world.droppable={events}></div>

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
