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
	<div id="library"><Screen></Screen></div>
	<div id="table">
		<Printer></Printer>
		<Scanner></Scanner>
		<CardReader></CardReader>
		<Card></Card>
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-rows: 200px 3fr 5fr;
		height: 100vh;
		background-color: #9bc0ed;
	}
	#table {
		background-color: rgb(228, 221, 188);
		width: 100%;
		display: grid;
		grid-template-areas: 'table';
		border-radius: 3vw;
	}

	:global(#table > *) {
		grid-area: table;
		touch-action: none;
		user-select: none;
	}
</style>
