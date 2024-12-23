<script lang="ts">
	import type { RfidScanner } from '$lib/rfid';
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
		border-radius: 0.5vw;
		--width: 280px;
		--height: 280px;
		background-color: crimson;
		height: var(--height);
		width: var(--width);
		transform: translate(170%, 80%) skew(10deg);
	}
</style>
