// import { CACHING_DEFAULT } from '@/config'
import getProgrammes from '@/utils/api/getProgrammes'

export default defineEventHandler(async () => {
	// export default defineEventHandler(async (event) => {
	// appendHeaders(event, { 'Cache-Control': CACHING_DEFAULT })

	return await getProgrammes()
})
