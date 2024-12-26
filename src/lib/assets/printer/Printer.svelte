<script lang="ts">
	import { world } from '$lib/assets/world';

	let { lines }: { lines: string[] } = $props();
</script>

<div class="printer" use:world.droppable={{ prevent: true }}>
	<pre class="paper">{lines.join('\n')}</pre>
</div>

<style>
	.printer {
		z-index: 2;
		grid-area: printer;
		justify-self: start;
		--width: 380px;
		--height: calc(var(--width) / 1.44);
		display: flex;
		justify-content: center;
		background-image: url('./printer.svg');
		background-repeat: no-repeat;
		width: var(--width);
		height: var(--height);
		transform: translate(10%, -20%);

		.paper {
			position: relative;
			font-size: 90%;
			padding: 3px;
			width: calc(var(--width) * 0.68);
			top: calc(var(--height) / 1.24);
			height: min-content;
			background-color: white;
			/*transform: rotate(180deg);*/
		}
	}
</style>
