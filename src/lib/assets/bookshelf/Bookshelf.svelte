<script lang="ts">
	import type { Book as BookType } from '$lib/models/book';
	import type { DropEvent } from '@interactjs/actions/drop/DropEvent';
	import type { DragEvent } from '@interactjs/actions/drag/plugin';
	import Book from '$lib/assets/book/Book.svelte';
	import { world } from '../world';

	let { items }: { items: BookType[] } = $props();

	function ondrop(e: DropEvent) {
		if (!e.relatedTarget.classList.contains('book')) return;
		//e.relatedTarget.classList.add('shelved');
	}

	function ondragleave(e: DragEvent) {
		if (!e.relatedTarget?.classList.contains('book')) return;
		//setTimeout(() => e.relatedTarget?.classList.remove('shelved'), 1000);
	}
</script>

<div id="bookshelf" use:world.droppable={{ overlap: 1, ondrop, ondragleave }}>
	{#each items as book}
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
