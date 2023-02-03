import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { FIREBASE_COLLECTION } from '~~/config'
import formatTime from '~~/lib/formatTime'
import getFirestoreDb from '~~/lib/getFirestoreDb'
import ucFirst from '~~/lib/ucFirst'

const db = getFirestoreDb()
const collection = db.collection(FIREBASE_COLLECTION)

const getStatus = async () => {
	const snapshot = await collection.orderBy('createdAt', 'desc').get()

	return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
		const createdAt = doc.get('createdAt')
		const formattedDate = ucFirst(getFormattedDate(createdAt))
		const formattedTime = formatTime(createdAt)

		return {
			createdAt: `${formattedDate} - ${formattedTime}`,
			log: doc.get('log'),
		}
	})
}

const getFormattedDate = (timestamp: number) => {
	return new Date(timestamp * 1000).toLocaleDateString('nl-NL', {
		weekday: 'long',
		year: 'numeric',
		month: '2-digit',
		day: 'numeric',
		timeZone: 'Europe/Amsterdam',
	})
}

export default getStatus
