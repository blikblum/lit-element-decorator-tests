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
            'presets': [
              [
                '@babel/preset-env',
                {
                  'targets': {
                    'browsers': [
                      'chrome 65'
                    ]
                  },
                  'modules': false
                }
              ]
            ],
            'plugins': [
              [
                '@babel/plugin-proposal-decorators',
                {
                  'legacy': true
                }
              ],
              [
                '@babel/plugin-proposal-class-properties',
                {
                  'loose': true
                }
              ]
            ]
          }
        }]
      }
    ]
  },
  optimization: {
    minimize: false
  }
}
