<script setup lang="ts">
import type { ErrorObject } from '@/types/sharedTypes'

defineProps<{
	error: ErrorObject
}>()

defineComponent({
	name: 'ErrorRoot',
})
</script>

<template>
	<NuxtLayout name="error">
		<NotAPage :error="error" />
	</NuxtLayout>
</template>
