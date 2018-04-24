const modunpre = 'dev';
const cssconfig = {};
const scssconfig = {};
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('css/[name].[chunkhash].one.css');
const extractSaSS = new ExtractTextPlugin('css/[name].[chunkhash].two.css');
if(modunpre == 'dev'){
	cssconfig.use =  ['style-loader','css-loader', 'postcss-loader']
	scssconfig.use = ['style-loader','css-loader', 'postcss-loader','sass-loader']
	
}else{
	cssconfig.use = extractCSS.extract({
						fallback: "style-loader",
						use: ['css-loader', 'postcss-loader']
					})
	scssconfig.use =    extractSaSS.extract({
							fallback: "style-loader",
							use: ['css-loader', 'postcss-loader', 'sass-loader']
						})
	
}
exports.cssconfig = cssconfig;

exports.scssconfig = scssconfig;

exports.modunpre = modunpre;

exports.extractCSS = extractCSS;

exports.extractSaSS = extractSaSS;

