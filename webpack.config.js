const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const config = {
    entry: {
      app: path.join(__dirname, 'src', 'client', 'index.jsx')
    },

    // output bundle
    output: {
      filename: '[name].bundle.js',
      path: path.join(__dirname, 'public')
    },

    // extract third party libraries
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
    },

    // rules
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-async-to-generator']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'client', 'index.html'),
        filename: path.join(__dirname, 'public', 'index.html'),
        inject: 'head'
      })
    ]
  }

  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map'
    config.devServer = {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      port: 9000
    }
  }

  if (argv.mode === 'production') {
    config.module.rules[0].use.options.presets.push('minify')
  }

  return config
}
