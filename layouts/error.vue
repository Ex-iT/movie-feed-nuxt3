<template>
	<main>
		<BackgroundImage />
		<h1>This is not a page...</h1>
		<p>What are you doing here? 👀</p>
	</main>
</template>

<script lang="ts" setup>
interface ErrorObject {
	statusCode: number
	path: string
	message: string
}

const props = defineProps({
	error: {
		type: Object,
		default: null,
	},
})

console.log({ props })
</script>

<script lang="ts">
// interface ErrorObject {
// 	statusCode: number
// 	path: string
// 	message: string
// }

// const defaultErrorObject = {
// 	statusCode: 0,
// 	path: '',
// 	message: '',
// }

export default {
	name: 'ErrorLayout',
	// props: {
	// 	error: {
	// 		type: Object,
	// 		default: null,
	// 		// type: Object as () => ErrorObject,
	// 		// default: () => defaultErrorObject,
	// 	},
	// },
}
</script>

<style scoped>
main {
	text-align: center;
}
</style>
