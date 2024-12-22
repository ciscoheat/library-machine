<script lang="ts">
	import { books } from '$lib';
	import Bookshelf from '$lib/assets/bookshelf/Bookshelf.svelte';
	import Screen from '$lib/assets/screen/Screen.svelte';
</script>

<main>
	<Bookshelf {books}></Bookshelf>
	<div id="table">
		<Screen></Screen>
		<div id="card-reader">CARD READER</div>
		<div id="printer">PRINTER</div>
		<div id="scanner">SCANNER</div>
	</div>
</main>

<style lang="scss">
	div[id] {
		border: 1px dashed #aaa;
	}
</style>
