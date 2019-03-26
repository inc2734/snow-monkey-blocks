module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
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
      }
    ]
  },
  externals: {
    react: 'React',
    jquery: 'jQuery',
    Masonry: 'Masonry'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
