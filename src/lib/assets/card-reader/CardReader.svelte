<script lang="ts">
	import type { RfidScanner } from '$lib/rfidScanner';
	import type { DropzoneOptions } from '@interactjs/actions/drop/plugin';

	import { world } from '$lib/assets/world';

	let { cardReader }: { cardReader: RfidScanner } = $props();

	const events: DropzoneOptions = {
		ondrop(e) {
			//console.log(e.relatedTarget);
			const item = world.get(e.relatedTarget);
			if (item) cardReader.scan(item);
		},
		overlap: 0.15
	};
</script>

<div id="card-reader" use:world.droppable={events}></div>

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
