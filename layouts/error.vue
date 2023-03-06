<template>
	<main>
		<slot />
		<BackgroundImage src="/img/bg.webp" />
	</main>
</template>

<script lang="ts">
export default defineComponent({
	name: 'ErrorLayout',
})
</script>

<style scoped>
main {
	text-align: center;
}
</style>
