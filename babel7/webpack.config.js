const path = require('path')

const babelPresets = [
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
]

const legacyPluginsConfig = [
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

const specPluginsConfig = [
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: false,
      decoratorsBeforeExport: true
    }
  ],
  [
    '@babel/plugin-proposal-class-properties',
    {
      'loose': true
    }
  ]
]

module.exports = [
  {
    mode: 'production',
    entry: './src/index.js',
    output: {
      filename: 'main-legacy.js'
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          include: [path.resolve('src')],
          use: [{
            loader: 'babel-loader',
            options: {
              presets: babelPresets,
              plugins: legacyPluginsConfig
            }
          }]
        }
      ]
    },
    optimization: {
      minimize: false
    }
  },
  {
    mode: 'production',
    entry: './src/index.js',
    output: {
      filename: 'main-spec.js'
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          include: [path.resolve('src')],
          use: [{
            loader: 'babel-loader',
            options: {
              presets: babelPresets,
              plugins: specPluginsConfig
            }
          }]
        }
      ]
    },
    optimization: {
      minimize: false
    }
  }
]
