'use strict';

module.exports = {
	root: true,
	parser: 'babel-eslint',
	extends: [
		'eslint:recommended',
		'plugin:@next/next/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
		jest: true,
	},
	plugins: ['react', 'babel', 'import', 'react-hooks'],
	rules: {
		'no-console': ['warn'],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'babel/camelcase': 1,
		'babel/no-invalid-this': 1,
		'babel/object-curly-spacing': 1,
		'babel/semi': 1,
		'babel/no-unused-expressions': 1,
		'babel/valid-typeof': 1,
		'react/no-unescaped-entities': 'off',

		camelcase: 0,
		'no-invalid-this': 0,
		'object-curly-spacing': 0,
		quotes: 0,
		semi: 0,
		'no-unused-expressions': 0,
		'valid-typeof': 0,
		'default-param-last': 0,
		eqeqeq: ['error', 'always'],

		'react-hooks/rules-of-hooks': 2,
		'react-hooks/exhaustive-deps': 1,

		'import/no-duplicates': 0,
		'import/order': [
			1,
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				'newlines-between': 'always',
			},
		],
	},
	settings: {
		react: {
			version: '17.0.2',
		},
		'import/resolver': {
			alias: {
				map: [
					['@components', './components'],
					['@styles', './styles'],
					['@utils', './utils'],
					['@context', './context'],
					['@models', './models'],
					['@imageWrapper', './imageWrapper'],
					['@json', './json'],
					['@reducers', './reducers'],
					['@files', './public/files'],
					['@middlewares', './middlewares'],
				],
				extensions: ['.js', '.jsx', '.json'],
			},
		},
	},
};
