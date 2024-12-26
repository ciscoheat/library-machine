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
	import { ArrayPrinter } from '$lib/printer.svelte';

	let card = { rfid: 'abcdefgh' } satisfies CardType;

	let scanner = new ObjectRfidScanner((rfid) => {
		console.log(rfid);
	});

	let cardReader = new ObjectRfidScanner((rfid) => {
		console.log(rfid);
	});

	let printer = new ArrayPrinter();
</script>

<main>
	<Bookshelf {books}></Bookshelf>
	<div id="library"><Screen></Screen></div>
	<div id="table" use:world.droppable>
		<Printer lines={printer.lines}></Printer>
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
	#library {
		display: flex;
		justify-content: center;
	}
	#table {
		background-color: rgb(228, 221, 188);
		width: 100%;
		display: grid;
		grid-template-areas:
			'printer printer card-reader'
			'table scanner scanner';
		grid-template-rows: 40% 60%;
		justify-items: center;
		align-items: center;
		border-radius: 3vw;
	}

	:global(#table > *) {
		touch-action: none;
		user-select: none;
	}
</style>
