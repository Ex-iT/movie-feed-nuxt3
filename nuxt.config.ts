// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from 'vite-plugin-eslint'

export default defineNuxtConfig({
	devtools: { enabled: false },
	app: {
		head: {
			title: 'Films vandaag op de Nederlandse Televisie - MovieFeed | IsHetAlDonderdag.nl',
			htmlAttrs: {
				lang: 'nl',
			},
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					name: 'description',
					content:
						'Overzicht van de films van vandaag en morgen op TV',
				},
				{
					name: 'theme-color',
					content: '#000000',
				},
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'manifest', href: '/site.webmanifest' },
				{
					rel: 'preconnect',
					href: 'https://tvgidsassets.nl',
				},
			],
		},
	},
	css: ['@/assets/css/main.css'],
	components: {
		dirs: ['@/components', '@/views'],
	},
	modules: ['@nuxt/image'],
	vite: {
		plugins: [eslintPlugin()],
	},
})
