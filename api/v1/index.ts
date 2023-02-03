import express from 'express'
import getProgrammes from './getProgrammes'
import getStatus from './getStatus'
import { CACHING_DEFAULT } from '~~/config'

const VERSION = 'v1'
const PREFIX = `/api/${VERSION}`
const app = express()

// Disable 'Powered by' header
app.disable('x-powered-by')

app.get(`${PREFIX}/`, (_req, res) => {
	res.status(418)
		.setHeader('Cache-Control', CACHING_DEFAULT)
		.json({ ok: false, error: 'Fight The Future' })
})

app.get(`${PREFIX}/programmes`, async (req, res) => {
	if (req.method === 'GET') {
		const programmes = await getProgrammes()
		res.status(200)
			.setHeader('Cache-Control', CACHING_DEFAULT)
			.json(programmes)
	} else {
		res.status(405)
			.setHeader('Cache-Control', CACHING_DEFAULT)
			.json({ ok: false, error: 'Method Not Allowed' })
	}
})

app.get(`${PREFIX}/status`, async (req, res) => {
	if (req.method === 'GET') {
		const status = await getStatus()
		res.status(200).json(status)
	} else {
		res.status(405)
			.setHeader('Cache-Control', CACHING_DEFAULT)
			.json({ ok: false, error: 'Method Not Allowed' })
	}
})

export const handler = app

export default handler
