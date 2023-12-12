import getStatus from '@/utils/api/getStatus'

export default defineEventHandler(async () => {
	return await getStatus()
})
