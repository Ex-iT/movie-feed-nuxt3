import slugify from '@sindresorhus/slugify'
import {
	MOVIES_URI,
	CHANNELS,
	DAY_STARTS_AT,
	CHANNEL_LOGO_SRC,
	EMPTY_IMG,
	DEEP_LINK,
} from '~~/config'
import fetchData from '~~/lib/fetchData'
import formatDate from '~~/lib/formatDate'
import formatHours from '~~/lib/formatHours'
import formatTime from '~~/lib/formatTime'
import getEpoch from '~~/lib/getEpoch'
import getProgress from '~~/lib/getProgress'
import { Days, ProgrammesRaw } from '~~/types/sharedTypes'

export default async function getMovies(day = Days.today) {
	try {
		const url = `${MOVIES_URI}/?day=${day}`
		const json = await fetchData(`${MOVIES_URI}/?day=${day}`)

		if (json) {
			return filterChannels(json.data || [])
		}

		return { ok: false, error: `Unable to fetch data from: ${url}` }
	} catch (error) {
		return { ok: false, error: `Unable to fetch data. ${error}` }
	}
}

const filterChannels = (channels: Array<ProgrammesRaw>) => {
	const channelData = channels.filter((channel) => {
		return Object.keys(CHANNELS).includes(channel.ch_id)
	})

	return enrichData(channelData)
}

const enrichData = (channelData: Array<ProgrammesRaw>) => {
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
