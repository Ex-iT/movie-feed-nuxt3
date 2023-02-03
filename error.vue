<template>
	<NuxtLayout name="error">
		<NuxtPage :error="error" />
	</NuxtLayout>
</template>

<script setup lang="ts">
// default props available on error.vue
defineProps({
	error: {
		type: Object,
		default: null,
	},
})

// console.log(props.error)

// customise 404 message from script section
// const error = useError()

// if (error.value?.statusCode === 404 || error.value.statusCode === '404') {
// 	error.value.message = '[script]: Oops! Page not found 😔'
// }
</script>

<script lang="ts">
export default {
	name: 'ErrorPage',
}
</script>
