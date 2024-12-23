<script lang="ts">
	import { onMount } from 'svelte';
	import interact from 'interactjs';

	const pos = { x: 180, y: 300 };
	let card: HTMLDivElement;

	onMount(() => {
		interact(card).draggable({
			listeners: {
				move: (event) => {
					pos.x += event.dx;
					pos.y += event.dy;
				}
			}
		});
	});
</script>

<div class="card" style="--x: {pos.x}px; --y: {pos.y}px" bind:this={card}></div>

<style>
	.card {
		--size: 12vw;
		background-image: url('./card.svg');
		background-repeat: no-repeat;
		width: var(--size);
		height: calc(var(--size) * 0.7);
		transform: translate(var(--x), var(--y)) rotate(-10deg);
	}
</style>
