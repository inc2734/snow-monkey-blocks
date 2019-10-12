module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [ '@babel/plugin-transform-react-jsx', {
                pragma: 'wp.element.createElement'
              } ]
            ]
          }
        }
      },
      {
        test: /\.svg$/,
        use: {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          },
        },
      }
    ]
  },
  externals: {
    react: 'React',
    jquery: 'jQuery',
    Masonry: 'Masonry',
    moment: 'moment',
		lodash: 'lodash',
    '@wordpress/blocks': 'wp.blocks',
    '@wordpress/components': 'wp.components',
    '@wordpress/compose': 'wp.compose',
    '@wordpress/editor': 'wp.editor',
    '@wordpress/element': 'wp.element',
    '@wordpress/data': 'wp.data',
    '@wordpress/i18n': 'wp.i18n',
    '@wordpress/richText': 'wp.richText',
    '@wordpress/blockEditor': 'wp.blockEditor',
    '@wordpress/plugins': 'wp.plugins',
    '@wordpress/editPost': 'wp.editPost',
    '@wordpress/hooks': 'wp.hooks'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};
