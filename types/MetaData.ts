import type { Guidance } from './Guidance'
import type { Items } from './Items'

export interface MetaData {
	items?: Array<Items>
	title?: string
	guidance?: Array<Guidance>
}
