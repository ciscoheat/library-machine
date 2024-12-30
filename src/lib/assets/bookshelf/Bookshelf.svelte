<script lang="ts">
	import type { Book as BookType } from '$lib/models/book';
	import Book from '$lib/assets/book/Book.svelte';
	import { world } from '../world';

	let { items }: { items: BookType[] } = $props();

	const itemPos: number[] = [0];
	for (const item of items) {
		const thickness = Math.max(35, item.pages / 15);
		itemPos.push(thickness + (itemPos.at(-1) ?? 0));
	}
</script>

<div id="bookshelf" use:world.droppable={{ overlap: 1 }}>
	{#each items as book, i}
		<Book {book} startPos={itemPos[i]}></Book>
	{/each}
</div>

<style>
	#bookshelf {
		display: flex;
		align-items: end;
		gap: 1px;
		background-image: url('./wood.jpg');
		border: 8px solid rgb(145, 111, 75);
	}
</style>
