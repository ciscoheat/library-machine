<script lang="ts">
	import Book from '$lib/assets/book/Book.svelte';
	import { world } from '../world';
	import { ItemType, type LibraryItem } from '$lib/data/libraryItem';
	import { sum } from '$lib/utils';

	let { items }: { items: LibraryItem[] } = $props();

	const shelfItems = $derived(
		items.map((item, i) => ({
			item,
			thickness: item.type === ItemType.Bluray ? 25 : Math.max(35, item.pages / 15),
			startPos: i
		}))
	);
</script>

<div id="bookshelf" use:world.droppable={{ overlap: 1 }}>
	{#each shelfItems as shelfItem, i}
		{@const totalThickness =
			i == 0 ? 0 : sum(...shelfItems.slice(0, i).map((item) => item.thickness))}
		<Book item={shelfItem.item} startPos={totalThickness} thickness={shelfItem.thickness}></Book>
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
