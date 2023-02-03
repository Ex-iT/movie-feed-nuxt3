<template>
	<main>
		<BackgroundImage />
		<slot />
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
