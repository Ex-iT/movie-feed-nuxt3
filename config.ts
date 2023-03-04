const API_URI = 'https://json.tvgids.nl'
const API_VERSION = 'v6'
const ASSET_URI = 'https://tvgidsassets.nl'
const ASSET_VERSION = 'v273'
const ASSET_DIMENSIONS = '40x40'

export const MOVIES_URI = `${API_URI}/${API_VERSION}/movies`
export const DETAIL_URI = `${API_URI}/${API_VERSION}/detail`
export const CHANNEL_LOGO_SRC = `${ASSET_URI}/${ASSET_VERSION}/img/channels/${ASSET_DIMENSIONS}/%s_dark.png`
export const DEEP_LINK = 'https://www.tvgids.nl/film'
export const DAY_STARTS_AT = 6 // 06:00 at night the next day
export const CHANNELS: { [key: number]: string } = {
	1: 'NPO 1',
	2: 'NPO 2',
	3: 'NPO 3',
	4: 'RTL 4',
	31: 'RTL 5',
	34: 'Veronica',
	36: 'SBS 6',
	37: 'NET 5',
	46: 'RTL 7',
	91: 'Comedy Central',
	92: 'RTL 8',
	440: 'FOX',
	460: 'SBS 9',
	496: 'Paramount Network',
}
export const EMPTY_IMG =
	'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
export const HOUR_SEC = 3600
export const CACHING_DEFAULT = `public, max-age=${HOUR_SEC * 0.5}` // 30 minutes
export const TICK_TIME = 1e3
export const IMDB_URL = 'https://www.imdb.com/title/'
export const YT_URL = 'https://www.youtube.com/watch?v='
export const FIREBASE_COLLECTION = 'MovieFeed_v2'
