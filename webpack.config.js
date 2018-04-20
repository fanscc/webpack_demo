var path = require('path');
//吧html文件打包到制定后的文件夹中并自动引用里面的js文件
var HtmlWebpackPlugin = require('html-webpack-plugin');
//吧css抽离出来
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
	mode:'development',
	entry: {
		index:'./js/index.js',
		list:'./js/list.js',
	},
	output:{
		path:path.join(__dirname,'dist'),
		publicPath:'/dist/',
		filename:'js/[name].js',
	},
	
    module: {
	  
	},
	plugins: [
        new HtmlWebpackPlugin({
              template: 'index.html',
              chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            filename: 'list.html',
            template: 'list.html',
            chunks: ['list']
        }), 
//      new ExtractTextPlugin({
//		      filename: ('css/[name].[contenthash].css'),
//		      allChunks: false,
//		    }),
    	],
	     devServer: {
	        contentBase: './',
	        host: 'localhost',
	        port: 9096, //默认9090
	        inline: true, //可以监控js变化
	        hot: true//热启动
	    },   	
};
