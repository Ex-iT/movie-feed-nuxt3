<template>
	<BackgroundImage />
	<h1>This is not a page...</h1>
	<p>What are you doing here? 👀</p>
	<pre>{{ error }}</pre>
</template>

<script lang="ts">
interface ErrorObject {
	url: string
	statusCode: string
	statusMessage: string
	message: string
	stack: string
}

export default defineComponent({
	name: 'NotAPage',
	props: {
		error: {
			type: Object as () => ErrorObject,
			default: null,
		},
	},

	setup(props) {
		console.log(props)
	},
})
</script>
