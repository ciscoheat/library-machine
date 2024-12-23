<script lang="ts">
	import type { Book as BookType } from '$lib/data';
	import Book from '$lib/book/Book.svelte';
	let { books }: { books: BookType[] } = $props();
</script>

<div id="bookshelf">
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
		border: 8px solid rgb(163, 123, 79);
	}
</style>
