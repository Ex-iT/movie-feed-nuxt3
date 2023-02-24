export default defineEventHandler((event) => {
	const route = '/api/v1'
	sendRedirect(event, route)

	return {}
})
