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
    moment: 'moment'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};
