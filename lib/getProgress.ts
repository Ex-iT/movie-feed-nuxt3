export default function getProgress(now: number, start: number, end: number) {
	const numberFormatter = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 2,
	})
	const progress = parseFloat(
		numberFormatter.format(((now - start) / (end - start)) * 100)
	)
	return progress < 0 || progress >= 100 ? 0 : progress
}
