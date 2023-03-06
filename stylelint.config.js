module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
	customSyntax: 'postcss-html',
	plugins: ['stylelint-order'],
	rules: {
		'order/properties-alphabetical-order': true,
	},
}
