<script lang="ts">
	import type { Book } from '$lib/data';
	let { book }: { book: Book } = $props();
</script>

<div class="book" style="--width: {Math.max(35, book.pages / 15)}px">{book.title}</div>

<style>
	.book {
		max-height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: var(--width);
		text-align: center;
		vertical-align: middle;
		padding: 10px 5px;
		border: 2px solid #333;
		background-color: rgb(233, 79, 57);
		writing-mode: vertical-rl;
		line-height: 1.25em;
		transform: rotate(175deg);
	}
</style>
