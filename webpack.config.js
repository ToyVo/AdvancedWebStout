const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')

const rawGames = fs.readFileSync('src/server/api/games.json')
const games = JSON.parse(rawGames)
const partialGames = games.map((game) => ({
  id: game.id,
  name: game.name,
  year: game.year
}))

module.exports = (env, argv) => {
  const config = {
    entry: {
      app: path.join(__dirname, 'src', 'client', 'index.js'),
      vendor: ['jquery', 'axios', 'popper.js', 'bootstrap']
    },

    // output bundle
    output: {
      filename: '[name].bundle.js',
      path: path.join(__dirname, 'public')
    },

    // extract thrid party libraries
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: 'vendor',
            enforce: true
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
              presets: ['@babel/preset-env'],
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
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'client', 'views', 'index.ejs'),
        filename: path.join(__dirname, 'public', 'index.html'),
        templateParameters: {
          gameData: partialGames
        },
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
