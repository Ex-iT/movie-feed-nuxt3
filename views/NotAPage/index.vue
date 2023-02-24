<template>
	<Head>
		<Title>{{ title }}</Title>
	</Head>
	<BackgroundImage />
	<h1>This is not a page...</h1>
	<p>What are you doing here? 👀</p>
</template>

<script lang="ts">
import { ErrorObject } from '~~/types/sharedTypes'

export default defineComponent({
	name: 'NotAPageView',
	props: {
		error: {
			type: Object as () => ErrorObject,
			default: null,
		},
	},
	setup(props) {
		const title = computed(() => {
			return `Error ${props.error.statusCode} | IsHetAlDonderdag.nl`
		})

		return {
			title,
		}
	},
})
</script>
