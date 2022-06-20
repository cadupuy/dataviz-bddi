<template>
	<div class="threeScene">
		<canvas ref="container" class="container"></canvas>

		<h2 class="pourcent">0</h2>
		<div class="loading-bar"></div>
		<h2 class="titleLoader">PANAME FLAMBÉ</h2>
	</div>
</template>

<script>
import Experience from '@classes/Experience'
export default {
	name: 'ThreeScene',
	props: {
		msg: String
	},

	mounted() {
		new Experience(this.$refs.container)
	}
}
</script>

<style scoped lang="scss"></style>
