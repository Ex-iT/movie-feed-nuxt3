<template>
	<Home :data="data || {}" :status="pending" />
</template>

<script setup lang="ts">
defineComponent({
	name: 'IndexPage',
})

const { pending, data } = useLazyFetch('/api/v1/programmes', {
	pick: ['today', 'tomorrow'],
})
</script>
