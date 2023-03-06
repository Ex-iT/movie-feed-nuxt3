<template>
	<h1>views/home - pending: {{ status }}</h1>
	<pre style="white-space: break-spaces">{{ data }}</pre>
</template>

<script setup lang="ts">
defineComponent({
	name: 'HomeView',
})

defineProps({
	data: {
		type: Object,
		required: true,
	},
	status: {
		type: Boolean,
		default: false,
	},
})
</script>
