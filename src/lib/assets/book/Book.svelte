<script lang="ts">
	import type { Book } from '$lib/models/book';
	import { world } from '$lib/assets/world';

	let { book }: { book: Book } = $props();
	let pos = $state({ x: 0, y: 0 });
</script>

<div
	class="book shelved"
	style="--thickness: {Math.max(35, book.pages / 15)}px; --x: {pos.x}px; --y: {pos.y}px"
	use:world.draggable={{ object: book, pos }}
>
	{book.title}
</div>

<style>
	.book {
		text-align: center;
		height: 150px;
		max-width: 130px;
		padding: 30px 10px;
		border: 2px solid #333;
		background-color: rgb(233, 79, 57);
		touch-action: none;
		user-select: none;
		z-index: 3;
		transform: rotate(-2deg);

		&.shelved {
			height: unset;
			max-height: 170px;
			line-height: 1.25em;
			transform: translate(calc(var(--x) + 6px), calc(var(--y) - 2px)) rotate(175deg);
			writing-mode: vertical-rl;
			display: flex;
			min-width: var(--thickness);
			text-align: center;
			padding: 10px 5px;
		}
	}
</style>
