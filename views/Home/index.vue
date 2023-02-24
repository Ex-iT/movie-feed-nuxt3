<template>
	<h1>page/index - pending: {{ pending }}</h1>
	<pre>{{ data }}</pre>
</template>

<script lang="ts">
defineComponent({
	name: 'HomeView',
	props: {
		data: {
			type: Object,
			default: null,
		},
		pending: {
			type: Boolean,
			default: false,
		},
	},
	// setup(props) {
	// 	return {
	// 		data: props.data,
	// 		pending: props.peding,
	// 	}
	// },
})
</script>
