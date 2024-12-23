<script lang="ts">
	import type { Book as BookType } from '$lib/models/book';
	import Book from '$lib/assets/book/Book.svelte';
	import { world } from '../world';

	let { books }: { books: BookType[] } = $props();
</script>

<div id="bookshelf" use:world.droppable={{ overlap: 1 }}>
	{#each books as book}
		<Book {book}></Book>
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
