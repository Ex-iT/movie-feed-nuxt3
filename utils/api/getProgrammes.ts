import getDetails from './getDetails'
import getMovies from './getMovies'
import { Days } from '@/types/sharedTypes'
import type { Movies, Programme, Programmes } from '@/types/sharedTypes'

const epoch = Math.floor(new Date().getTime() / 1000)

async function mergeDetails(movies: Movies): Promise<Programme[]> {
	let mergedDetails: Programme[] = []
	try {
		mergedDetails = await Promise.all(
			movies.data.map(async (movie) => {
				const movieDetails = await getDetails(movie.main_id)
				return { ...movie, details: movieDetails.data }
			}),
		)
	}
	catch (error) {
		if (error instanceof Error) {
			console.error({ error })
		}
	}

	return mergedDetails
}

async function getMovieData(): Promise<Programmes> {
	const messages: string[] = []
	let success = true
	let today: Programme[] = []
	let tomorrow: Programme[] = []

	try {
		const [moviesToday, moviesTomorrow] = await Promise.all([
			getMovies(Days.today),
			getMovies(Days.tomorrow),
		])

		if (!moviesToday.ok && !moviesToday.ok) {
			success = false
			messages.push('Unable to fetch movies data.')
		}

		;[today, tomorrow] = await Promise.all([
			mergeDetails(moviesToday),
			mergeDetails(moviesTomorrow),
		])

		if (!today.length || !tomorrow.length) {
			success = false
			messages.push('Unable to fetch movie details.')
		}
	}
	catch (error) {
		success = false
		messages.push('Unable to fetch programmes data')
	}

	return {
		createdAt: epoch,
		today,
		tomorrow,
		log: {
			message: messages.join(' '),
			success,
		},
	}
}

async function getProgrammes(): Promise<Programmes> {
	return await getMovieData()
}

export default getProgrammes
