<template>
	<nuxt-picture
		src="/img/bg.webp"
		role="presentation"
		loading="lazy"
		decoding="async"
	/>
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

picture :deep(img) {
	aspect-ratio: 4/3;
	height: 100%;
	object-fit: cover;
	width: 100%;
}
</style>
