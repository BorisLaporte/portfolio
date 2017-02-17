var path = require("path")
var BundleTracker = require('webpack-bundle-tracker')

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'eval-source-map',
    context: __dirname,

    entry:  "./static/js/index.jsx",
    output: {
        path: path.resolve("./static/bundles"),
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
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
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new ExtractTextPlugin({
            filename: '[name].[id].style.css',
            allChunks: true
        })
    ],

    devServer: {
        contentBase: "./static/bundles",
        // colors: true,
        historyApiFallback: true,
        inline: true
    } 
}