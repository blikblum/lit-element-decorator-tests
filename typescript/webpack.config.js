const path = require('path')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        include: [path.resolve('src')],
        use: [{
          loader: 'ts-loader'
        }]
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  },
  optimization: {
    minimize: false
  }
}
