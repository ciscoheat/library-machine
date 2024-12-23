<script lang="ts">
	import type { Card as CardType } from '$lib/models/card';

	import { books } from '$lib';
	import Bookshelf from '$lib/assets/bookshelf/Bookshelf.svelte';
	import CardReader from '$lib/assets/card-reader/CardReader.svelte';
	import Card from '$lib/assets/card/Card.svelte';
	import Printer from '$lib/assets/printer/Printer.svelte';
	import Scanner from '$lib/assets/scanner/Scanner.svelte';
	import Screen from '$lib/assets/screen/Screen.svelte';
	import { world } from '$lib/assets/world';
	import { ObjectRfidScanner } from '$lib/rfidScanner';

	let card = { rfid: 'abcdefgh' } satisfies CardType;

	let scanner = new ObjectRfidScanner((rfid) => {
		console.log(rfid);
	});

	let cardReader = new ObjectRfidScanner((rfid) => {
		console.log(rfid);
	});
</script>

<main>
	<Bookshelf {books}></Bookshelf>
	<div id="library"><Screen></Screen></div>
	<div id="table" use:world.droppable>
		<Printer></Printer>
		<Scanner {scanner}></Scanner>
		<CardReader {cardReader}></CardReader>
		<Card {card}></Card>
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
