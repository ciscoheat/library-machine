<script lang="ts">
	import { books } from '$lib';
	import Bookshelf from '$lib/assets/bookshelf/Bookshelf.svelte';
	import CardReader from '$lib/assets/card-reader/CardReader.svelte';
	import Card from '$lib/assets/card/Card.svelte';
	import Printer from '$lib/assets/printer/Printer.svelte';
	import Scanner from '$lib/assets/scanner/Scanner.svelte';
	import Screen from '$lib/assets/screen/Screen.svelte';
</script>

<main>
	<Bookshelf {books}></Bookshelf>
	<Screen></Screen>
	<div id="table">
		<Scanner></Scanner>
		<Printer></Printer>
		<CardReader></CardReader>
		<Card></Card>
	</div>
</main>

<style lang="scss">
	#table {
		background-color: cornsilk;
		width: 100%;
		height: 50vh;
		display: grid;
		grid-template-areas: 'table';
	}

	:global(#table > *) {
		grid-area: table;
	}
</style>
