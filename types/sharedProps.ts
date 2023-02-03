interface FetchtState {
	pending: boolean
	error: boolean
	timestamp: number
}

export const FetchStateProp = {
	type: Object as () => FetchtState,
	default: () => ({
		pending: false,
		error: false,
	}),
	required: true,
}
