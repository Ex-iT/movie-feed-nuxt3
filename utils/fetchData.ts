import type { SimpleError } from '@/types/sharedTypes'

interface FetchedDataResponse<T> extends SimpleError {
	data?: T
}

async function fetchData<T>(uri: string): Promise<FetchedDataResponse<T>> {
	try {
		const response = await fetch(uri)
		const { url, status, statusText } = response

		return {
			data: status === 200 ? await response.json() : null,
			ok: status === 200,
			url,
			status,
			statusText,
		}
	}
	catch (error) {
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
