<script lang="ts">
	import type { Book as BookType } from '$lib/data';
	import Book from '../Book.svelte';
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
		border: 3px solid #666;
		min-height: 150px;
	}
</style>
