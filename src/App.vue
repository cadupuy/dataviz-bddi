<template>
	<ThreeScene />
	<Content />
	<Controls />
	<Footer />
</template>

<script>
import Experience from './Experience/Experience.js'
import ThreeScene from './components/ThreeScene.vue'
import Content from './components/Content.vue'
import Controls from './components/Controls.vue'
import Footer from './components/Footer.vue'

export default {
	name: 'App',

	components: {
		ThreeScene,
		Content,
		Footer,
		Controls
	},

	mounted() {
		this.experience = new Experience()
	}
}
</script>

<style lang="scss"></style>
