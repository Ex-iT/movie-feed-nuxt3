export default function formatHours(timestamp: number) {
	return new Date(timestamp * 1000).toLocaleTimeString('nl-NL', {
		hour: '2-digit',
		timeZone: 'Europe/Amsterdam',
	})
}
