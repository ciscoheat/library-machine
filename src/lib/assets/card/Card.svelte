<script lang="ts">
	import { world } from '$lib/assets/world';
	import type { LibraryCard } from '$lib/data/library';

	let { card }: { card: LibraryCard } = $props();

	const pos = $state({ x: 70, y: 0 });
</script>

<div
	class="card"
	style="--x: {pos.x}px; --y: {pos.y}px"
	use:world.draggable={{ object: card, pos }}
></div>

<style>
	.card {
		grid-area: table;
		position: relative;
		z-index: 3;
		--size: 100px;
		background-image: url('./card.svg');
		background-repeat: no-repeat;
		width: var(--size);
		height: calc(var(--size) * 0.7);
		transform: translate(var(--x), var(--y)) rotate(-10deg);
	}
</style>
