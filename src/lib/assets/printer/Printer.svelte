<script lang="ts">
	import { world } from '$lib/assets/world';
</script>

<div id="printer" use:world.droppable={{ prevent: true }}></div>

<style>
	#printer {
		--width: 380px;
		background-image: url('./printer.svg');
		background-repeat: no-repeat;
		width: var(--width);
		height: calc(var(--width) / 1.44);
		transform: translate(10%, -20%);
	}
</style>
