import * as dotenv from 'dotenv'
import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

dotenv.config()

const getFirestoreDb = () => {
	let firebaseApp: App
	if (!getApps().length) {
		const {
			FIREBASE_PROJECT_ID,
			FIREBASE_PRIVATE_KEY,
			FIREBASE_CLIENT_EMAIL,
		} = process.env

		if (!FIREBASE_PROJECT_ID) {
			throw new Error(
				'No Firebase project ID specified, make sure the the env variables are set'
			)
		}

		firebaseApp = initializeApp({
			credential: cert({
				projectId: FIREBASE_PROJECT_ID,
				privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
				clientEmail: FIREBASE_CLIENT_EMAIL,
			}),
		})
	} else {
		firebaseApp = getApp()
	}

	return getFirestore(firebaseApp)
}

export default getFirestoreDb
