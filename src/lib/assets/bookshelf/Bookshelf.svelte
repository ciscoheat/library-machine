<script lang="ts">
	import Item from '$lib/assets/item/Item.svelte';
	import { world } from '../world';
	import { sum } from '$lib/utils';
	import type { Library } from '$lib/data/library';

	let { items }: { items: Library['makesOffer'] } = $props();

	const shelfItems = $derived(
		items.map((item, i) => ({
			item: item.itemOffered,
			thickness:
				item.itemOffered['@type'] === 'Book'
					? Math.max(35, item.itemOffered.numberOfPages / 15)
					: 25,
			startPos: i
		}))
	);
</script>

<div id="bookshelf" use:world.droppable={{ overlap: 1 }}>
	{#each shelfItems as shelfItem, i}
		{@const totalThickness =
			i == 0 ? 0 : sum(...shelfItems.slice(0, i).map((item) => item.thickness))}
		<Item item={shelfItem.item} startPos={totalThickness} thickness={shelfItem.thickness}
		></Item>
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
