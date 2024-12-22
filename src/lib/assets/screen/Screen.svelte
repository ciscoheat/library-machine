<div id="screen">
	<div id="display">I AM ERROR</div>
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

		#display {
			width: calc(var(--width) * 0.83);
			margin-top: calc(var(--width) * 0.88 / 10.5);
			height: calc(var(--width) * 0.88 / 1.49);
		}
	}
</style>
