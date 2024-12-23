<script lang="ts">
	import { onMount } from 'svelte';
	import interact from 'interactjs';

	//const pos = { x: 100, y: 200 };
	let scanner: HTMLDivElement;

	onMount(() => {
		interact(scanner).dropzone({
			ondrop(e) {
				console.log(e.relatedTarget, 'was dropped into', e.target);
			}
		});
	});
</script>

<div class="scanner" bind:this={scanner}></div>

<style>
	.scanner {
		border-radius: 1vw;
		--width: 280px;
		--height: 280px;
		background-color: crimson;
		height: var(--height);
		width: var(--width);
		transform: translate(170%, 80%);
	}
</style>
