import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import getDetails from './getDetails'
import getMovies from './getMovies'
import getFirestoreDb from '~~/utils/getFirestoreDb'
import { FIREBASE_COLLECTION, HOUR_SEC } from '~~/config'
import { Days, Programme, Programmes } from '~~/types/sharedTypes'

const epoch = Math.floor(new Date().getTime() / 1000)
const db = getFirestoreDb()
const collection = db.collection(FIREBASE_COLLECTION)

const getLatestDoc = async () => {
	const snapshot = await collection
		.orderBy('createdAt', 'desc')
		.limit(1)
		.get()
	const docs: QueryDocumentSnapshot<DocumentData>[] = []
	snapshot.forEach((doc) => docs.push(doc))
	return docs[0]
}

const shouldUpdate = async () => {
	const latestDoc = await getLatestDoc()

	if (latestDoc) {
		const success = latestDoc.get('log.success')
		const createdAt = latestDoc.get('createdAt')
		const coolDownTime = HOUR_SEC * 3

		return !success || epoch >= createdAt + coolDownTime
	}

	return true
}

const getMovieData = async (): Promise<Programmes> => {
	const messages: string[] = []
	let success = true
	let today: Programme[] = []
	let tomorrow: Programme[] = []

	try {
		const [todayProg, tomorrowProg] = await Promise.all([
			getMovies(Days.today) as Promise<Programme[]>,
			getMovies(Days.tomorrow) as Promise<Programme[]>,
		])

		// 'ok' is only in the object as the request fails and is set to false
		if ('ok' in todayProg && 'ok' in tomorrowProg) {
			success = false
			messages.push('Unable to fetch movies data.')
		}

		try {
			today = await Promise.all(
				todayProg.map(async (prog) => {
					prog.details = await getDetails(prog.main_id)
					return prog
				})
			)
		} catch (error) {
			success = false
			messages.push('Unable to fetch details for today.')
		}

		try {
			tomorrow = await Promise.all(
				tomorrowProg.map(async (prog) => {
					prog.details = await getDetails(prog.main_id)
					return prog
				})
			)
		} catch (error) {
			success = false
			messages.push('Unable to fetch details for tomorrow.')
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
	// if (await shouldUpdate()) {
	if (true) {
		const programmes = await getMovieData()
		const docName = String(new Date().getDay())
		const docRef = collection.doc(docName)

		// Put programmes in Firestore
		await docRef.set(programmes)

		return programmes
	} else {
		// Return the latest programmes from Firestore
		return (await (await getLatestDoc()).data()) as Programmes
	}
}

export default getProgrammes
