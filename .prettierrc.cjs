module.exports = {
	bracketSpacing: true,
	bracketSameLine: true,
	singleQuote: true,
	trailingComma: 'none',
	semi: false,
	tabWidth: 2,
	printWidth: 80,
	arrowParens: 'always',
	importOrder: [
		'^@(pragma)/(.*)$',
		'^@lib/(.*)$',
		'^@components/(.*)$',
		'^~/(.*)$',
		'^[./]',
	],
	importOrderSeparation: true,
}
