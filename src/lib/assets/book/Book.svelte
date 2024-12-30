<script lang="ts">
	import type { DragEvent } from '@interactjs/actions/drag/plugin';
	import type { Book } from '$lib/models/book';
	import { world } from '$lib/assets/world';

	let { book, startPos }: { book: Book; startPos: number } = $props();

	let thickness = Math.max(35, book.pages / 15);
	let pos = $state({ x: startPos, y: 0 });

	let shelved = $state(true);
	let lastShelved = $state(true);

	function onstart(e: DragEvent) {
		lastShelved = shelved;
		shelved = false;
		e.target.style.position = 'absolute';
	}

	function onend(e: DragEvent) {
		const droppedOnShelf = e.relatedTarget?.id === 'bookshelf';
		if (droppedOnShelf) pos.y = 0;

		if (!e.relatedTarget) shelved = lastShelved;
		else shelved = droppedOnShelf;
	}
</script>

<div
	class="book"
	class:shelved
	style="--thickness: {thickness}px; --x: {pos.x}px; --y: {pos.y}px"
	use:world.draggable={{ object: book, pos, onend, onstart }}
>
	{book.title}
</div>

<style>
	.book {
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

		&.shelved {
			transform: translate(calc(var(--x) + 6px), calc(var(--y) - 2px)) rotate(175deg);
			height: unset;
			max-height: 170px;
			line-height: 1.25em;
			writing-mode: vertical-rl;
			display: flex;
			width: var(--thickness);
			text-align: center;
			padding: 10px 5px;
		}
	}
</style>
