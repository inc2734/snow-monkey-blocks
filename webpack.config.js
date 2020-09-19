const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
  resolve: {
		...defaultConfig.resolve,
    alias: {
			...defaultConfig.resolve.alias,
      '@smb/helper': path.resolve( __dirname, 'src/js/helper/helper' ),
      '@smb/component': path.resolve( __dirname, 'src/js/component' ),
      '@smb/config': path.resolve( __dirname, 'src/js/config' ),
    },
	},
};
