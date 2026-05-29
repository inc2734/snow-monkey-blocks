const defaultConfig = require( '@wordpress/scripts/config/eslint.config.cjs' );

module.exports = [
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'vendor/**',
			'webpack.config.js',
			'postcss.config.js',
		],
	},
	...defaultConfig,
	{
		files: [ '**/*.{js,jsx,mjs,cjs}' ],
		languageOptions: {
			globals: {
				...defaultConfig.globals,
				smb: true,
				Spider: true,
				WPElement: true,
			},
		},
		rules: {
			...defaultConfig.rules,
			'import/no-extraneous-dependencies': 'off',
			'import/no-unresolved': 'off',
			'@wordpress/no-unsafe-wp-apis': 'off',
			eqeqeq: [ 'error', 'allow-null' ],
		},
	},
];
