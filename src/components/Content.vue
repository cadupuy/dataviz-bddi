<template>
	<div class="content">
		<p><span class="arrondissement"></span></p>
		<p class="prix">
			Prix du m<sup>2</sup> : <br />
			<span class="m2"></span>
		</p>
		<p class="nombre">
			Nombre d'habitants : <br />
			<span class="population"></span>
		</p>
	</div>
</template>

<script>
export default {
	name: 'Content'
}
</script>

<style scoped lang="scss">
.content {
	position: absolute;
	top: 50px;
	right: 100px;
	width: 180px;
	color: white;
	visibility: hidden;
	font-size: 10px;
	font-family: 'Space Grotesk', sans-serif;
	opacity: 0;
	transition: all 0.6s ease-in-out;
	background-color: rgba(0, 0, 0, 0.6);
	padding: 28px;
	padding-left: 40px;
	border-radius: 6px;

	&.visible {
		opacity: 1;
		visibility: visible;
	}

	.prix {
		margin: 15px 0;
		font-size: 20px;
	}

	.nombre {
		font-size: 20px;
	}

	.m2 {
		font-weight: bold;
		font-size: 40px;
		font-family: 'Space Grotesk', sans-serif;
	}
	.arrondissement {
		font-weight: bold;
		font-size: 30px;
		font-family: 'Space Grotesk', sans-serif;
		text-decoration: underline;
	}

	.population {
		font-weight: bold;
		font-size: 40px;
		font-family: 'Space Grotesk', sans-serif;
	}
}
</style>
