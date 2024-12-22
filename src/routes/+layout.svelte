<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	let { children } = $props();
</script>

<svelte:head>
	<title>{page.data.title ?? 'DCI - Library Machine'}</title>
</svelte:head>

{@render children()}
