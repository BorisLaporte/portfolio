//require our dependencies
const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    //the base directory (absolute path) for resolving the entry option
    context: __dirname,
    //the entry point we created earlier. Note that './' means 
    //your current directory. You don't have to specify the extension  now,
    //because you will specify extensions later in the `resolve` section
    entry: './static/js/index', 
    
    output: {
        //where you want your compiled bundle to be stored
        path: path.resolve('./static/bundles/'), 
        //naming convention webpack should use for your files
        filename: '[name].js', 
        publicPath: "./static/bundles/"
    },
    
    plugins: [
        //tells webpack where to store data about your bundles.
        new BundleTracker({filename: './webpack-stats.json'}), 
        //makes jQuery available in every module
        new webpack.ProvidePlugin({ 
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery' 
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin({
            filename: '[name].style.css',
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        })
    ],
    module: {
        loaders: [
            //a regexp that tells webpack use the following loaders on all 
            //.js and .jsx files
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
              loader: 'file-loader?name=./static/bundles/fonts/[name].[ext]',
              include: path.join(__dirname, './static/font')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    // use style-loader in development
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },

        ]
    }  
}