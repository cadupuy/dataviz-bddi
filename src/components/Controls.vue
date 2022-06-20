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

<style scoped lang="scss"></style>
