import * as dotenv from 'dotenv'
import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

dotenv.config()

const getFirestoreDb = () => {
	let firebaseApp: App
	if (!getApps().length) {
		firebaseApp = initializeApp({
			credential: cert({
				projectId: process.env.FIREBASE_PROJECT_ID,
				privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
					/\\n/g,
					'\n'
				),
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			}),
		})
	} else {
		firebaseApp = getApp()
	}

	return getFirestore(firebaseApp)
}

export default getFirestoreDb
