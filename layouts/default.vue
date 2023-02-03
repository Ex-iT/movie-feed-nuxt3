<template>
	<main>
		<BackgroundImage />
		<slot />

		<NuxtLink to="/404"> 404 </NuxtLink>
	</main>
</template>

<script lang="ts">
export default {
	name: 'DefaultLayout',
}
</script>
