import { CACHING_DEFAULT } from '@/config'

export default defineEventHandler((event) => {
	setResponseStatus(event, 418)
	appendHeaders(event, { 'Cache-Control': CACHING_DEFAULT })

	return {
		ok: false,
		error: 'Fight The Future',
	}
})
