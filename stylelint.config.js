/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-recommended-vue'],
	customSyntax: 'postcss-html',
	plugins: ['stylelint-order'],
	rules: {
		'order/properties-alphabetical-order': true,
	},
}
