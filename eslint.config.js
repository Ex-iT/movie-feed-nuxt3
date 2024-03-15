import antfu from '@antfu/eslint-config'

export default antfu(
	{
		stylistic: {
			indent: 'tab',
		},
	},
	{
		rules: {
			curly: ['error', 'all'],
		},
	},
)
