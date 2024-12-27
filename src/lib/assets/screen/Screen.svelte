<script lang="ts">
	import { Display, type ScreenState } from './screenStates';

	let { pinEntered }: { pinEntered: (buffer: string[]) => void } = $props();

	let screenState: ScreenState = $state({ display: Display.Welcome });
	let buffer: string[] = $state([]);

	function buffer_add(char: string) {
		buffer.push(char);
		if (buffer.length === 4) {
			pinEntered($state.snapshot(buffer));
			buffer = [];
		}
	}

	export function currentState() {
		return screenState;
	}

	export function display(newState: ScreenState) {
		screenState = Object.freeze(newState);
	}
</script>

{#snippet error(e: Error)}
	<div class="center content">
		<p>Something went wrong:</p>
		<pre>{e.message}</pre>
	</div>
{/snippet}

{#snippet welcome()}
	<div class="center content">
		<p>Welcome to the library borrowing machine!</p>
		<p><b>Please place your card on the reader.</b></p>
		<p>Books are available on the shelf above.</p>
	</div>
{/snippet}

{#snippet enterPIN(attempts: number)}
	<div class="center content">
		{#if attempts > 0}
			<p>Incorrect PIN. Please try again.</p>
		{:else}
			<p>Enter your PIN</p>
		{/if}
		<p>
			{#if buffer.length}{''.padEnd(buffer.length, '*')}{:else}&nbsp;{/if}
		</p>
		<div class="keypad">
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as number}
				<button onclick={() => buffer_add(String(number))}>{number}</button>
			{/each}
		</div>
	</div>
{/snippet}

{#snippet items(items: { title: string; expires: Date }[])}
	<div class="center content">
		<p>Scan the items on the dark red area.</p>
		<div class="buttons">
			<button>Finish with receipt</button>
			<button>Finish without receipt</button>
		</div>
		<table>
			<thead
				><tr>
					<th>Item</th>
					<th>Return on</th>
				</tr></thead
			>
			<tbody>
				{#each items as item}
					<tr>
						<td>{item.title}</td>
						<td>{item.expires.toISOString().slice(0, 10)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet thankYou()}
	<div class="center content">
		<p>Thank you for using the automatic borrowing service!</p>
	</div>
{/snippet}

<div id="screen">
	<div id="display">
		{#if screenState.display === Display.Welcome}{@render welcome()}{/if}
		{#if screenState.display === Display.EnterPIN}{@render enterPIN(screenState.attempts)}{/if}
		{#if screenState.display === Display.ThankYou}{@render thankYou()}{/if}
		{#if screenState.display === Display.Items}{@render items(screenState.items)}{/if}
		{#if screenState.display === Display.Error}{@render error(screenState.error)}{/if}
	</div>
</div>

<style>
	#screen {
		--width: 555px;
		display: flex;
		justify-content: center;
		background-image: url('./tv-01.svg');
		background-repeat: no-repeat;
		background-position: bottom bottom;
		background-size: contain;
		width: var(--width);
		height: calc(var(--width) * 0.88);
		transform: translate(0, 8%);

		#display {
			display: flex;
			justify-content: center;
			align-items: center;
			align-content: center;
			font-size: 96%;
			overflow: hidden;
			padding: 2px;
			width: calc(var(--width) * 0.83);
			margin-top: calc(var(--width) * 0.88 / 10.5);
			height: calc(var(--width) * 0.88 / 1.49);

			.center {
				text-align: center;
			}

			.content {
				border: 1px solid #aaa;
				padding: 1em;
				background-color: #fafafa;
				max-width: 80%;
				line-height: 1.75;
			}

			.keypad {
				place-self: center;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				button {
					width: min(4vw, 35px);
					border: 1px solid #aaa;
				}
			}

			table {
				min-width: 100%;
				thead {
					background-color: rgb(64, 122, 221);
					color: white;
				}
				tr {
					border: 1px solid #aaa;
				}
			}

			.buttons {
				margin-bottom: 1rem;
				display: flex;
				gap: 1rem;

				button {
					background-color: #ddd;
					border: 1px solid #aaa;
					padding: 0.25rem 0.4rem;
					border-radius: 0.25rem;
				}
			}
		}
	}
</style>
