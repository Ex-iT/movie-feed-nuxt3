<script setup lang="ts">
import type { ErrorObject } from '@/types/sharedTypes'

const props = defineProps<{
	error: ErrorObject
}>()

defineComponent({
	name: 'NotAPageView',
})
</script>

<template>
	<Head>
		<Title>{{ `Error ${props.error.statusCode} | IsHetAlDonderdag.nl` }}</Title>
	</Head>
	<h1>This is not a page...</h1>
	<p>What are you doing here? 👀</p>
</template>
