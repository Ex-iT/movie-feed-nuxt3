<script setup lang="ts">
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

defineComponent({
	name: 'HomeView',
})
</script>

<template>
	<h1>views/home - pending: {{ status }}</h1>
	<pre style="white-space: break-spaces">{{ data }}</pre>
</template>
