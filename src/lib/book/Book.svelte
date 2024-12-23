<script lang="ts">
	import type { Book } from '$lib/data';
	let { book }: { book: Book } = $props();
</script>

<div class="book" style="--width: {Math.max(35, book.pages / 15)}px">{book.title}</div>

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
		transform: translate(6px, -3px) rotate(175deg);
	}
</style>
