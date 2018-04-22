var path = require('path');
var webpack = require('webpack');
//吧html文件打包到制定后的文件夹中并自动引用里面的js文件
var HtmlWebpackPlugin = require('html-webpack-plugin');
//吧css抽离出来
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var  extractCSS = new ExtractTextPlugin('css/[name].[chunkhash].one.css');
var  extractLESS = new ExtractTextPlugin('css/[name].[chunkhash].two.css');
module.exports = {
	mode:'development',
	entry: {
		index:'./js/index.js',
		list:'./js/list.js',
	},
	output:{
		path:path.join(__dirname,'dist'),
		publicPath:'/',
		filename:'js/[name].js',
	},

    module: {
	   rules: [
			 {
				 test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					 use: [
		         {
		             loader: 'url-loader',
		             options: {
		                 limit: 10000
		             }
		         }
		     ]
			 },
	      {
	        test: /\.css$/,
	        use:extractCSS.extract({
	        	fallback:"style-loader",
	        	use: [ 'css-loader', 'postcss-loader']
	        })
	       // use: ['style-loader', 'css-loader', 'postcss-loader']
	      },
	      {
	        test: /\.scss$/,
	        use:extractLESS.extract({
	        	fallback:"style-loader",
	        	use: [ 'css-loader', 'postcss-loader','sass-loader']
	        })
	      },
	       {
                test: /\.js$/,
                loader: 'babel-loader',
                //打包包括的文件
                include: path.resolve(__dirname, "./js"),
            }
     	]
	},
	plugins: [
        new HtmlWebpackPlugin({
              template: 'index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'list.html',
            template: 'list.html',
            chunks: ['list']
        }),
        extractCSS,
    	extractLESS,
    	],
	     devServer: {
	        contentBase: './',
	        host: 'localhost',
	        port: 8300,
	        inline: true, //可以监控js变化
	        hot: true//热启动
	    },
};
