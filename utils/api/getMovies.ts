import slugify from '@sindresorhus/slugify'
import {
	MOVIES_URI,
	CHANNELS,
	DAY_STARTS_AT,
	CHANNEL_LOGO_SRC,
	EMPTY_IMG,
	DEEP_LINK,
} from '~~/config'
import fetchData from '~~/utils/fetchData'
import formatDate from '~~/utils/formatDate'
import formatHours from '~~/utils/formatHours'
import formatTime from '~~/utils/formatTime'
import getEpoch from '~~/utils/getEpoch'
import getProgress from '~~/utils/getProgress'
import { Days, Movies, ProgrammeRaw, ProgrammesRaw } from '~~/types/sharedTypes'
import { MovieData } from '~~/types/MovieData'

export default async function getMovies(day = Days.today): Promise<Movies> {
	const url = `${MOVIES_URI}/?day=${day}`

	try {
		const json = await fetchData<ProgrammesRaw>(`${MOVIES_URI}/?day=${day}`)

		if (json.ok) {
			return {
				data: filterChannels(json.data?.data || []),
				ok: true,
				url,
				status: 200,
				statusText: '',
			}
		}

		return {
			data: [],
			ok: false,
			url,
			status: 500,
			statusText: `Unable to fetch data from: ${url}`,
		}
	} catch (error) {
		return {
			data: [],
			ok: false,
			url,
			status: 500,
			statusText: `Unable to fetch data. ${error}`,
		}
	}
}

const filterChannels = (channels: Array<ProgrammeRaw>): Array<MovieData> => {
	const channelData = channels.filter((channel) => {
		return Object.keys(CHANNELS).includes(channel.ch_id)
	})

	return enrichData(channelData)
}

const enrichData = (channelData: Array<ProgrammeRaw>): Array<MovieData> => {
	const ONE_DAY = 24 * 3600
	return channelData
		.map((movie) => {
			const { ch_id, ps, pe } = movie
			const now = getEpoch()
			let start = parseInt(ps, 10)
			let end = parseInt(pe, 10)

			// Fix for end time before start time
			if (end < start) {
				end = end + ONE_DAY
			}

			// Adjust start time to make the next
			// day start at `NEXT_STARTS_AT` at night
			if (parseInt(formatHours(start), 10) <= DAY_STARTS_AT) {
				start = start + ONE_DAY
				end = end + ONE_DAY
			}

			return {
				...movie,
				channel_logo: getChannelLogo(ch_id),
				channel_label: getChannelLabel(parseInt(ch_id, 10)),
				start: formatTime(start),
				end: formatTime(end),
				is_passed: now > end,
				progress: getProgress(now, start, end),
				deep_link: getDeepLinkUrl(movie.title),
				day: formatDate(start),
				// Overwriting the `ps` and `pe` here to
				// return the updated start and end time
				ps: String(start),
				pe: String(end),
			}
		})
		.sort((a, z) => parseInt(a.ps, 10) - parseInt(z.ps, 10)) // Sort with original timestamp
		.sort((a, z) => parseInt(a.ch_id, 10) - parseInt(z.ch_id, 10))
}

const getChannelLogo = (id: string) =>
	id ? CHANNEL_LOGO_SRC.replace(/%s/g, id) : EMPTY_IMG

const getChannelLabel = (id: number) => CHANNELS[id] || ''

const getDeepLinkUrl = (title: string) =>
	`${DEEP_LINK}/${slugify(title, {
		decamelize: false,
		customReplacements: [['&', '']],
	})}`
