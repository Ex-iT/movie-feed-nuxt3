<template>
	<Head>
		<Title>{{ title }}</Title>
	</Head>
	<h1>This is not a page...</h1>
	<p>What are you doing here? 👀</p>
</template>

<script setup lang="ts">
import { ErrorObject } from '~~/types/sharedTypes'

defineComponent({
	name: 'NotAPageView',
})

const props = defineProps<{
	error: ErrorObject
}>()

const title = computed(() => {
	return `Error ${props.error.statusCode} | IsHetAlDonderdag.nl`
})
</script>
