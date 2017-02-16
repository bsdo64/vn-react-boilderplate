const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = ({isDev}) => {
  const ifDev = then => (isDev ? then : null);
  const ifProd = then => (!isDev ? then : null);
  const nullsOut = i => i;

  return {
    devtool: isDev ? 'inline-source-map' : 'source-map',
    target: 'web',
    context: path.resolve(__dirname, '../src'),
    entry: {
      vendor: [ifDev('react-hot-loader/patch'),ifDev('webpack-dev-server/client'),ifDev('webpack/hot/only-dev-server'), ifDev('react-hot-loader'), './appLibs'].filter(nullsOut),
      main: './appLoader',
    },
    output: {
      path: path.resolve(__dirname,'../dist'),
      publicPath: '/',
      filename: isDev ? '[name].js' : '[name].[chunkhash].js'
    },
    performance: {
      hints: "warning", // enum
      maxAssetSize: 200000, // int (in bytes),
      maxEntrypointSize: 400000, // int (in bytes)
      assetFilter: function(assetFilename) {
        // Function predicate that provides asset filenames
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      }
    },
    plugins: [
      new webpack.DefinePlugin({'process.env': { NODE_ENV: JSON.stringify(isDev ? 'development' : 'production') } }),
      new webpack.LoaderOptionsPlugin({debug: isDev, minimize: !isDev }),
      ifDev(new webpack.HotModuleReplacementPlugin()),
      ifDev(new webpack.NamedModulesPlugin()),
      ifProd(new WebpackMd5Hash()),
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
      ifProd(new ExtractTextPlugin({filename: '[name].[contenthash].css'})),
      ifProd(new webpack.optimize.UglifyJsPlugin({ mangle: true, warnings: false, 'screw_ie8': true, conditionals: true, unused: true, comparisons: true, sourceMap: true, sequences: true, 'dead_code': true, evaluate: true, 'if_return': true, 'join_vars': true, output: { comments: false }})),
      new HTMLWebpackPlugin({template: 'index.html', inject: true, minify: { removeComments: !isDev, collapseWhitespace: !isDev, keepClosingSlash:!isDev } })
    ].filter(nullsOut),
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [path.resolve(__dirname,'../src') ],
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          include: [path.resolve(__dirname,'../src')],
          loader: isDev ?
            'style-loader!css-loader?sourceMap!sass-loader?sourceMap' :
            ExtractTextPlugin.extract({loader: 'css-loader?sourceMap!sass-loader?sourceMap'})
        },
        {
          test: /\.css$/,
          include: [
            path.resolve(__dirname,'../node_modules/normalize.css'),
            path.resolve(__dirname,'../src'),
          ],
          use: isDev ? [
              'style-loader',
              { loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
              },
              'postcss-loader'
            ] : ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader?modules&importLoaders=1!postcss-loader'
            }),

        },
        {
          test: /\.(png|jpg|wav|mp3)$/,
          include: [
            path.resolve(__dirname, '../assets')
          ],
          use: {
            loader: 'url-loader',
            options: {
              limit: 4096,
            }
          }
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=4096&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
      ]
    }
  };
};