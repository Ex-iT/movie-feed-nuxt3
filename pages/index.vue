<template>
	<!-- <Home :data="data" :status="pending" /> -->
	<pre>{{ data }}</pre>
</template>

<script lang="ts">
export default defineComponent({
	name: 'IndexPage',
	setup() {
		return {
			data: null,
			pending: true,
		}
	},
	async onMounted() {
		// @TODO: use { pick: [...] } here to only get 'today' and 'tomorrow'
		const { pending, data } = await useAsyncData('programmes', () =>
			$fetch('/api/v1/programmes')
		)
		console.log(data)
		return {
			pending,
			data,
		}
	},
})
</script>
