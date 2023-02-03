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
	position: fixed;
	inset: 0;
	z-index: -1;
}

picture img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
