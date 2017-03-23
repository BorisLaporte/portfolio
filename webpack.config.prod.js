//require our dependencies
const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CompressionPlugin = require('compression-webpack-plugin')


module.exports = {

  entry: [
    './static/js/index'
  ],

  
  output: {
    path: path.resolve('./static/bundles/'), 
    filename: '[name].js',
    publicPath: './static/bundles/'
  },

  plugins: [
    //tells webpack where to store data about your bundles.
    new BundleTracker({filename: './webpack-stats.json'}), 
    new webpack.ProvidePlugin({ 
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery' 
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
        filename: '[name].style.css',
        allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false,
      },
      output: {
          comments: false,
      },
    }),
    new CompressionPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/, 
          //we definitely don't want babel to transpile all the files in 
          //node_modules. That would take a long time.
          exclude: /node_modules/, 
          //use the babel loader 
          loader: 'babel-loader',
          query: {
            //specify that we will be dealing with React code
            presets: ['es2015','react'] 
          }
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        loader: 'file-loader?name=./fonts/[name].[ext]',
        include: path.join(__dirname, './src/assets/font')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          // use style-loader in development
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  }
}