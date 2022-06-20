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

<style scoped lang="scss">
.titleLoader {
	position: absolute;
	top: 30%;
	right: 28vw;
	color: white;
	min-width: 700px;
	font-size: 120px;
	font-family: 'Staatliches', cursive;
	transition-delay: 0.5s;
	transition: all 0.7s ease-in-out;
}

.titleLoader.hidden {
	opacity: 0;
	visibility: hidden;
}

.loading-bar {
	position: absolute;
	top: 50%;
	width: 100%;
	height: 2px;
	background: #ffffff;
	transform: scaleX(0);
	transform-origin: top left;
	transition: transform 0.5s;
}

.loading-bar.ended {
	transform: scaleX(0);
	transform-origin: 100% 0;
	transition: transform 1.5s ease-in-out;
}

.pourcent {
	position: absolute;
	top: 55%;
	left: 85%;
	color: white;
	font-size: 60px;
	font-family: 'Space Grotesk', sans-serif;
	transition-delay: 0.5s;
	transition: all 0.7s ease-in-out;
}

.pourcent.hidden {
	opacity: 0;
	visibility: hidden;
}
</style>
