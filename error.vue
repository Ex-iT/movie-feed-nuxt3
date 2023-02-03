<template>
	<NuxtLayout name="error">
		<NotAPage :error="error" />
	</NuxtLayout>
</template>

<script lang="ts">
import { ErrorObject } from '@/types/sharedTypes'

export default defineComponent({
	name: 'ErrorRoot',
	props: {
		error: {
			type: Object as () => ErrorObject,
			default: null,
		},
	},
})
</script>
