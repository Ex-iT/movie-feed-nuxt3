<template>
	<BackgroundImage />
	<h1>This is not a page...</h1>
	<p>What are you doing here? 👀</p>
	<pre>{{ error.message }}</pre>
</template>

<script lang="ts">
import { ErrorObject } from '@/types/sharedTypes'
export default defineComponent({
	name: 'NotAPage',
	props: {
		error: {
			type: Object as () => ErrorObject,
			default: null,
		},
	},

	// setup(props) {
	// 	console.log(props.error)
	// },
})
</script>
