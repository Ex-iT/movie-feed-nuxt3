import { DETAIL_URI } from '~~/config'
import fetchData from '~~/lib/fetchData'

export default async function getDetails(id: string) {
	try {
		const json = await fetchData(`${DETAIL_URI}/${id}`)

		if (json.data) {
			const details = json.data
			delete details.linear
			delete details.linearMore
			delete details.streaming
			delete details.streamingMore
			delete details.tags
			delete details.seasons
			delete details.viewMore
			delete details.news

			return details
		}

		return { ok: false, error: `Unable to fetch details for ${id}.` }
	} catch (error) {
		return { ok: false, error: `Unable to fetch details for ${id}.` }
	}
}
