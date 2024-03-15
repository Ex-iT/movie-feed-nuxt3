<script setup lang="ts">
defineComponent({
	name: 'DefaultLayout',
})
</script>

<template>
	<main>
		<slot />
		<BackgroundImage src="/img/bg.webp" />
	</main>
</template>
