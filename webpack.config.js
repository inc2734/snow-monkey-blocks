const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

const plugins = [ ...defaultConfig?.plugins ];

plugins.splice(1, 1); //delete plugins.CleanWebpackPlugin
// plugins.splice(2, 1); //delete plugins.CopyWebpackPlugin

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
