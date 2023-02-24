import { Guidance } from './Guidance'
import { Items } from './Items'

export interface MetaData {
	items?: Array<Items>
	title?: string
	guidance?: Array<Guidance>
}
