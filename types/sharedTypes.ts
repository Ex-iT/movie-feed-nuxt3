import { Details } from './Details'
import { MetaData } from './MetaData'
import { MovieData } from './MovieData'
import { Versioning } from './Versioning'

export enum Days {
	today = '0',
	tomorrow = '1',
}

export interface ProgrammeRaw {
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

export interface ProgrammesRaw extends Versioning {
	data: Array<ProgrammeRaw>
}

export interface DetailsRaw extends Versioning {
	data: {
		generic: {
			id: number
			title: string
			year: string
			imdb: string
			live: string
			liveStartTijd: string
			livedatum: string
			url: string
			is_premiere: string
			ondertiteling: string
			audiodescription: string
			is_last: string
			yt_id: string
			rating: string
			year_premiered: string
			duration_full: number
			labels: []
			ch_id: string
			tag_id: string
			premiere_year: string
			trailer?: object
			category: string
			subcategory?: string
			genre: []
			image: string
			short: string
			duration?: string
			copyright?: string
			artTitle?: string
			defaultShort?: string
			artId?: string
			long?: string
			defaultLong?: string
			hasImageFallback?: boolean
		}
		linear?: []
		linearMore?: object
		streaming?: []
		streamingMore?: object
		metadata: MetaData
		tags?: object
		seasons?: []
		viewMore?: object
		news?: object
		meta?: object
	}
}

export interface MovieDetails extends SimpleError {
	data: Details
}

export interface Programme extends MovieData {
	details: Details
}

export interface Movies extends SimpleError {
	data: Array<MovieData>
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

export interface SimpleError {
	ok: boolean
	url: string
	status: number
	statusText: string
}
