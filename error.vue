<template>
	<NuxtLayout name="error">
		<NotAPage :error="error" />
	</NuxtLayout>
</template>

<script setup lang="ts">
import type { ErrorObject } from '@/types/sharedTypes'

defineComponent({
	name: 'ErrorRoot',
})

defineProps<{
	error: ErrorObject
}>()
</script>
