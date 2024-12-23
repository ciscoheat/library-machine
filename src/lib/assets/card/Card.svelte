<script lang="ts">
	import type { Card } from '$lib/models/card';
	import { world } from '$lib/assets/world';

	let { card }: { card: Card } = $props();

	const pos = $state({ x: 180, y: 300 });
</script>

<div
	class="card"
	style="--x: {pos.x}px; --y: {pos.y}px"
	use:world.draggable={{ object: card, pos }}
></div>

<style>
	.card {
		position: relative;
		z-index: 3;
		--size: 12vw;
		background-image: url('./card.svg');
		background-repeat: no-repeat;
		width: var(--size);
		height: calc(var(--size) * 0.7);
		transform: translate(var(--x), var(--y)) rotate(-10deg);
	}
</style>
