
const path = require('path');
const merge = require('webpack-merge')
let baseWebpackConfig = require('./webpack.base.js');
const devtool = require('./devtool.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

if(devtool.modunpre !== 'dev'){
	baseWebpackConfig.plugins.push(devtool.extractCSS,devtool.extractSaSS);
	baseWebpackConfig.plugins.push(
		new CopyWebpackPlugin([
	      {
	        from: path.resolve(__dirname, './imgs'),
	        to: './imgs',
	        ignore: ['.*']
	      }
	    ])
	)
	baseWebpackConfig.plugins.push(
		new OptimizeCSSPlugin({
	      cssProcessorOptions: true
	      ? { safe: true, map: { inline: false } }
	      : { safe: true }
	    })
   )
}


module.exports = baseWebpackConfig