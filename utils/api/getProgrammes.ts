import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import getDetails from './getDetails'
import getMovies from './getMovies'
import getFirestoreDb from '~~/utils/getFirestoreDb'
import { FIREBASE_COLLECTION, HOUR_SEC } from '~~/config'
import { Days, Programme, Programmes, Movies } from '~~/types/sharedTypes'

const epoch = Math.floor(new Date().getTime() / 1000)
const db = getFirestoreDb()
const collection = db.collection(FIREBASE_COLLECTION)

const getLatestDoc = async () => {
	const snapshot = await collection
		.orderBy('createdAt', 'desc')
		.limit(1)
		.get()

	return snapshot.docs.map((doc) => doc.data()).at(0)
}

const shouldUpdate = async () => {
	const latestDoc = (await getLatestDoc()) || []

	if (latestDoc.length) {
		const success = latestDoc.get('log.success')
		const createdAt = latestDoc.get('createdAt')
		const coolDownTime = HOUR_SEC * 3

		return !success || epoch >= createdAt + coolDownTime
	}

	return true
}

const mergeDetails = async (movies: Movies): Promise<Programme[]> => {
	let mergedDetails: Programme[] = []
	try {
		mergedDetails = await Promise.all(
			movies.data.map(async (movie) => {
				const movieDetails = await getDetails(movie.main_id)
				return { ...movie, details: movieDetails.data }
			})
		)
	} catch (error) {
		if (error instanceof Error) {
			console.error({ error })
		}
	}

	return mergedDetails
}

const getMovieData = async (): Promise<Programmes> => {
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
	} catch (error) {
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

const getProgrammes = async (): Promise<Programmes> => {
	if (await shouldUpdate()) {
		const programmes = await getMovieData()
		const docName = String(new Date().getDay())
		const docRef = collection.doc(docName)

		// Put programmes in Firestore
		await docRef.set(programmes)

		return programmes
	} else {
		// Return the latest programmes from Firestore
		return (
			(await getLatestDoc()) as QueryDocumentSnapshot<DocumentData>
		).data() as Programmes
	}
}

export default getProgrammes
