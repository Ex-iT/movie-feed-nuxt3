import { EnrichedProgrammesRaw } from './EnrichedProgrammesRaw'
import { Generic } from './Generic'
import { MetaData } from './MetaData'

export enum Days {
	today = '0',
	tomorrow = '1',
}

export interface ProgrammesRaw {
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

export interface MovieDetails {
	generic: Generic
	metadata: MetaData
}

export interface Programme extends EnrichedProgrammesRaw {
	details: MovieDetails
}

export interface ProgrammesLog {
	message: string
	success: boolean
}

export interface Programmes {
	createdAt: number
	today: Programme[]
	tomorrow: Programme[]
	log: ProgrammesLog
}

export interface Status {
	createdAt: string
	log: ProgrammesLog
}

export interface ErrorObject {
	url: string
	statusCode: string | number
	statusMessage: string
	message: string
	stack: string
}
