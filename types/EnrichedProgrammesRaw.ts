import { ProgrammesRaw } from './sharedTypes'

export interface EnrichedProgrammesRaw extends ProgrammesRaw {
	channel_logo: string
	channel_label: string
	start: string
	end: string
	is_passed: boolean
	progress: number
	deep_link: string
	day: string
}
