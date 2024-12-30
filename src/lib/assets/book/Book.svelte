<script lang="ts">
	import type { DragEvent } from '@interactjs/actions/drag/plugin';
	import { world } from '$lib/assets/world';
	import type { LibraryItem } from '$lib/data/libraryItem';

	let { item, startPos, thickness }: { item: LibraryItem; startPos: number; thickness: number } =
		$props();

	let pos = $state({ x: startPos, y: 0 });
	let type = $derived.by(() => {
		switch (item.type) {
			case 1:
				return 'book';
			case 2:
				return 'bluray';
		}
	});

	let shelved = $state(true);
	let lastShelved = $state(true);

	function onstart(e: DragEvent) {
		lastShelved = shelved;
		shelved = false;
		e.target.classList.add('dragged');
	}

	function onend(e: DragEvent) {
		e.target.classList.remove('dragged');
		const droppedOnShelf = e.relatedTarget?.id === 'bookshelf';
		if (droppedOnShelf) pos.y = 0;

		if (!e.relatedTarget) shelved = lastShelved;
		else shelved = droppedOnShelf;
	}
</script>

<div
	class="item {type}"
	class:shelved
	style="--thickness: {thickness}px; --x: {pos.x}px; --y: {pos.y}px"
	use:world.draggable={{ object: item, pos, onend, onstart }}
>
	{item.title}
</div>

<style>
	.item {
		position: absolute;
		text-align: center;
		height: 150px;
		max-width: 130px;
		padding: 30px 10px;
		border: 2px solid #333;
		background-color: rgb(233, 79, 57);
		touch-action: none;
		user-select: none;
		z-index: 3;
		transform: translate(calc(var(--x) + 6px), calc(var(--y) - 2px)) rotate(-2deg);

		:global(&.dragged) {
			z-index: 4;
		}

		:global(&.book) {
			padding: 10px 5px;
		}

		:global(&.bluray) {
			font-size: 90%;
			padding: 10px 0;
			background-color: cornflowerblue;
		}

		&.shelved {
			transform: translate(calc(var(--x) + 6px), calc(var(--y) - 2px)) rotate(175deg);
			height: unset;
			max-height: 170px;
			line-height: 1.25em;
			writing-mode: vertical-rl;
			display: flex;
			width: var(--thickness);
			text-align: center;
		}
	}
</style>
