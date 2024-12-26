<script lang="ts">
	import { onMount } from 'svelte';

	const output = $state(['Scan a card to display its id']);

	let display: HTMLDivElement;

	export function print(line: string) {
		output.push(line);
		if (display && display.scrollHeight > display.offsetHeight) {
			output.shift();
		}
	}

	onMount(() => {
		//setInterval(() => print(Math.random().toString().slice(2)), 100);
	});
</script>

<div id="screen">
	<div id="display" bind:this={display}>
		{#each output as line}
			<div>{line}</div>
		{/each}
	</div>
</div>

<style>
	#screen {
		--width: 555px;
		display: flex;
		justify-content: center;
		background-image: url('./tv-01.svg');
		background-repeat: no-repeat;
		background-position: bottom bottom;
		background-size: contain;
		width: var(--width);
		height: calc(var(--width) * 0.88);
		transform: translate(0, 8%);

		#display {
			font-size: 96%;
			overflow: hidden;
			padding: 2px;
			width: calc(var(--width) * 0.83);
			margin-top: calc(var(--width) * 0.88 / 10.5);
			height: calc(var(--width) * 0.88 / 1.49);
		}
	}
</style>
