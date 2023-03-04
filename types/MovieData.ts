import { EnrichedMovie } from './EnrichedMovie'

export interface MovieData extends EnrichedMovie {
	db_id?: string // Legacy ID
	ps: string
	pe: string
	ch_id: string
	title: string
	descr?: string
	rating?: string
	is_type?: string
	subgenre?: string
	tvg_rating?: string
	main_id: string
}
