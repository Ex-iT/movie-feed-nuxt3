import { DETAIL_URI } from '~~/config'
import { DetailsRaw, Either, Error, MovieDetails } from '~~/types/sharedTypes'
import fetchData from '~~/utils/fetchData'

export default async function getDetails(
	id: string
): Promise<Either<MovieDetails, Error>> {
	try {
		const json = await fetchData<DetailsRaw>(`${DETAIL_URI}/${id}`)

		if (json.ok !== false && json.data) {
			const details = json.data
			delete details.linear
			delete details.linearMore
			delete details.streaming
			delete details.streamingMore
			delete details.tags
			delete details.seasons
			delete details.viewMore
			delete details.news
			delete details.meta
			delete details.metadata.title

			return details
		}

		return { ok: false, statusText: `Unable to fetch details for ${id}.` }
	} catch (error) {
		return { ok: false, statusText: `Unable to fetch details for ${id}.` }
	}
}
