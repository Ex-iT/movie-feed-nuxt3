import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import mix, { vercelAdapter } from 'vite-plugin-mix'

export default defineConfig({
	plugins: [
		eslintPlugin(),
		mix({
			handler: './api/',
			adapter: vercelAdapter(),
		}),
	],
})
