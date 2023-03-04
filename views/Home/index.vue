<template>
	<h1>views/home - pending: {{ status }}</h1>
	<pre style="white-space: break-spaces">{{ data }}</pre>
</template>

<script lang="ts">
export default {
	name: 'HomeView',
	props: {
		data: {
			type: Object,
			default: undefined,
		},
		status: {
			type: Boolean,
			default: false,
		},
	},
}
</script>
