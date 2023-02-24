import { Either, Error } from '~~/types/sharedTypes'

const fetchData = async <T>(uri: string): Promise<Either<T, Error>> => {
	try {
		const response = await fetch(uri)

		if (response.status === 200) {
			return await response.json()
		} else {
			const { url, status, statusText } = response

			return {
				ok: false,
				url,
				status,
				statusText,
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error({ error })
		}

		return {
			ok: false,
			url: uri,
			status: 500,
			statusText: 'An unexpected error occurred.',
		}
	}
}

export default fetchData
