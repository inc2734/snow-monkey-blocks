const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

if ('clean' in defaultConfig?.output) {
	delete defaultConfig.output.clean; //delete output.clean
}

const plugins =
defaultConfig?.plugins?.filter(
	( plugin ) => plugin.constructor?.name !== 'CleanWebpackPlugin'
) ?? [];

module.exports = {
	...defaultConfig,
	plugins,
};

module.exports = {
	...defaultConfig,
	plugins,
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@smb/helper': path.resolve( __dirname, 'src/js/helper/helper' ),
			'@smb/component': path.resolve( __dirname, 'src/js/component' ),
			'@smb/hooks': path.resolve( __dirname, 'src/js/hooks' ),
			'@smb/config': path.resolve( __dirname, 'src/js/config' ),
		},
	},
};
