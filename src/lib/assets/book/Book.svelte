<script lang="ts">
	import type { Book } from '$lib/models/book';
	import { world } from '$lib/assets/world';

	let { book }: { book: Book } = $props();
	let pos = $state({ x: 0, y: 0 });
</script>

<div
	class="book"
	style="--width: {Math.max(35, book.pages / 15)}px; --x: {pos.x}px; --y: {pos.y}px"
	use:world.draggable={{ object: book, pos }}
>
	{book.title}
</div>

<style>
	.book {
		max-height: 170px;
		display: flex;
		min-width: var(--width);
		text-align: center;
		padding: 10px 5px;
		border: 2px solid #333;
		background-color: rgb(233, 79, 57);
		writing-mode: vertical-rl;
		line-height: 1.25em;
		transform: translate(calc(var(--x) + 6px), calc(var(--y) - 2px)) rotate(175deg);
		touch-action: none;
		user-select: none;
		z-index: 2;
	}
</style>
