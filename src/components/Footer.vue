<template>
	<footer class="author">
		Designed by Pierre-Andréas Durant & <br />
		Developed by Charles-Antoine Dupuy
	</footer>
</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style scoped lang="scss">
.author {
	position: absolute;
	bottom: 60px;
	right: 60px;
	color: rgb(109, 109, 109);
	visibility: hidden;
	font-size: 10px;
	font-family: 'Space Grotesk', sans-serif;
	opacity: 0;
	transition: all 0.7s ease-in;
	transition-delay: 0.8s;

	&.visible {
		opacity: 1;
		visibility: visible;
	}
}
</style>
