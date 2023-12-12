import { DETAIL_URI } from '@/config'
import type { DetailsRaw, MovieDetails } from '@/types/sharedTypes'
import fetchData from '@/utils/fetchData'

export default async function getDetails(id: string): Promise<MovieDetails> {
	const url = `${DETAIL_URI}/${id}`
	let movieDetails = {
		generic: {
			id: 0,
			title: '',
		},
		metadata: {},
	}
	try {
		const json = await fetchData<DetailsRaw>(url)

		if (json.ok && json.data?.data) {
			const data = json.data.data
			delete data?.linear
			delete data?.linearMore
			delete data?.streaming
			delete data?.streamingMore
			delete data?.tags
			delete data?.seasons
			delete data?.viewMore
			delete data?.news
			delete data?.meta
			delete data?.metadata.title

			movieDetails = data
		}

		return {
			data: movieDetails,
			ok: false,
			url,
			status: 500,
			statusText: `Unable to fetch details for ${id}.`,
		}
	} catch (error) {
		return {
			data: movieDetails,
			ok: false,
			url,
			status: 500,
			statusText: `Unable to fetch details for ${id}.`,
		}
	}
}
