<template>
	<div class="controlsContainer">
		<h1 class="title">
			PANAME <br />
			FLAMBÉ
		</h1>

		<form oninput="output.value = Math.round(range.valueAsNumber + 1996)">
			<div class="range">
				<div class="slider">
					<span class="rulers"></span>
					<span class="bar"> <span class="fill"></span></span>
					<input
						class="range-input rs-range"
						orient="vertical"
						name="range"
						type="range"
						step="1"
						min="0"
						max="25"
						value="0"
					/>
				</div>

				<div class="range-output">
					<output class="output" name="output" for="range">
						1996
					</output>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'Controls'
}
</script>

<style scoped lang="scss">
.controlsContainer {
	position: absolute;
	display: flex;
	left: 120px;
	top: 40px;
	transition: all 0.7s ease-in;
	transition-delay: 0.8s;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.title {
		line-height: 40px;
		color: white;
		margin-bottom: 30px;
		visibility: hidden;
		opacity: 0;
		font-size: 40px;
		font-family: 'Staatliches', cursive;
		transition: all 0.7s ease-in;
		transition-delay: 0.8s;
		text-align: center;
		font-weight: 700;
		margin-left: -63px;
	}

	.title.visible {
		opacity: 1;
		visibility: visible;
	}

	.output {
		color: white;
		font-size: 40px;
		font-family: 'Space Grotesk', sans-serif;
		font-weight: bold;
		margin-left: -37px;
	}

	.bar,
	.fill {
		position: absolute;
		left: 0;
		right: 0;
	}

	.bar {
		z-index: 1;
		top: 10px;
		bottom: 10px;
		background-color: rgba(0, 0, 0, 0.2);
	}

	.bar::before,
	.bar::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 10px;
	}

	.bar::before {
		background-color: #fe4a4acb;
		bottom: 100%;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.bar::after {
		background-color: #fee858c4;
		top: 100%;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	.fill {
		z-index: 2;
		bottom: 0;
		height: 100%;
		overflow: hidden;
	}
	.fill::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 100%;
		bottom: 0;
		background-image: linear-gradient(0deg, #fee858c4 0%, #fe4a4acb 100%);
	}

	/* INPUT */

	.range {
		opacity: 0;
		visibility: hidden;
		transition: all 0.7s ease-in;
		transition-delay: 0.8s;
	}

	.range.visible {
		opacity: 1;
		visibility: visible;
	}

	.range-output {
		margin-top: 30px;
		width: 100px;
		margin-left: 10px;
	}
	.slider {
		position: relative;
		width: 20px;
		height: 650px;
		margin-left: 10px;
	}

	.range-input {
		-webkit-appearance: none;
		z-index: 3;
		position: absolute;
		top: 50%;
		left: 50%;
		outline: none;
		width: 650px;
		height: 20px;
		margin: 0;
		transform: rotate(-90deg) translate(-50%, -50%);
		transform-origin: 0 0;
		background-color: transparent;
	}

	.range-input::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 30px;
		height: 30px;
		border: 8px solid #3e3e3e;
		border-radius: 15px;
		background-color: #ffe53b;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
		cursor: pointer;
		transition: 0.3s ease;
	}

	.range-input::-webkit-slider-thumb:hover {
		background-color: #eeeeee;
	}

	.range-input::-webkit-slider-thumb:active {
		box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.6);
	}

	.rulers {
		position: absolute;
		right: 150%;
		top: 15px;
		bottom: 15px;
		width: 100%;
		border-top: 1px solid #bfbfbf;
	}

	.rulers::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: linear-gradient(to top, #bfbfbf 1px, transparent 2px);
		background-size: 100% 10%;
	}

	.rulers::after {
		content: '';
		position: absolute;
		left: 30%;
		right: 0;
		top: 0;
		bottom: 0;
		background: linear-gradient(to top, #bfbfbf 1px, transparent 2px);
		background-size: 100% 2%;
	}
}
</style>
