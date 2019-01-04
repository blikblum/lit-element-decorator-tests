const path = require('path')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: [path.resolve('src')],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                modules: false,
                targets: {
                  browsers: [
                    'chrome 65'
                  ]
                }
              }]
            ],
            plugins: ['transform-decorators-legacy', 'transform-class-properties']
          }
        }]
      }
    ]
  },
  optimization: {
    minimize: false
  }
}
