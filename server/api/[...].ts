import { CACHING_DEFAULT } from '~~/config'

export default defineEventHandler((event) => {
	// @ts-expect-error Nuxt is wrong here.
	// According to the H3 docs it should get the H3 Event param first.
	// (https://nuxt.com/docs/guide/directory-structure/server#returning-other-status-codes and https://www.jsdocs.io/package/h3#setResponseStatus)
	// Remove the @ts-expect-error when its fixed
	setResponseStatus(event, 418)
	appendHeaders(event, { 'Cache-Control': CACHING_DEFAULT })

	return {
		ok: false,
		error: 'Fight The Future',
	}
})
