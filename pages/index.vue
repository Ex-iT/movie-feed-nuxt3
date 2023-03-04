<template>
	<Home :data="data || {}" :status="pending" />
</template>

<script lang="ts">
export default defineComponent({
	name: 'IndexPage',
	async setup() {
		const { pending, data } = await useLazyFetch('/api/v1/programmes')

		return {
			pending,
			data: data,
		}
	},
})
</script>
