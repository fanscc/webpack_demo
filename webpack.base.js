const path = require('path');
const webpack = require('webpack');
//吧html文件打包到制定后的文件夹中并自动引用里面的js文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Cleanreaper = require('clean-webpack-plugin');
const devtool = require('./devtool.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		index: './js/index.js',
		list: './js/list.js',
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: devtool.modunpre == 'dev'?'/':'./',
		filename: 'js/[name].js',
	},

	module: {
		rules: [{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						name:'imgs/[name].[ext]',
						publicPath:devtool.modunpre == 'dev'?'':'../',
					}
				}]
			},
			{
				test: /\.css$/,
				use: devtool.cssconfig.use
			},
			{
				test: /\.scss$/,
				use: devtool.scssconfig.use
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
			template: 'index.html',
			chunks: ['index']
		}),
		new HtmlWebpackPlugin({
			filename: 'list.html',
			template: 'list.html',
			chunks: ['list']
		}),
		new UglifyJsPlugin({
		    uglifyOptions: {
		      warnings: false,
		      compress:{
		      	drop_console: true,
		      	drop_debugger:true
		      }
		    }
		  }),
	    new Cleanreaper(),  
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		hot: true, //热启动
		compress: true,
		host: 'localhost',
		port: 8898,
		inline: true //可以监控js变化
	},
};