<script lang="ts">
export default defineComponent({
	name: 'ErrorLayout',
})
</script>

<template>
	<main>
		<slot />
		<BackgroundImage src="/img/bg.webp" />
	</main>
</template>

<style scoped>
main {
	text-align: center;
}
</style>
