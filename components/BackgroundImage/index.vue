<template>
	<picture>
		<source type="image/webp" src="/img/bg.webp" />
		<img
			role="presentation"
			loading="lazy"
			decoding="async"
			src="/img/bg.jpg"
		/>
	</picture>
</template>

<script lang="ts">
export default {
	name: 'BackgroundImage',
}
</script>

<style scoped>
picture {
	inset: 0;
	pointer-events: none;
	position: fixed;
	z-index: -1;
}

picture img {
	height: 100%;
	object-fit: cover;
	width: 100%;
}
</style>
