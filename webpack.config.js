
const merge = require('webpack-merge')
let baseWebpackConfig = require('./webpack.base.js');
const devtool = require('./devtool.js');

if(devtool.modunpre !== 'dev'){
	baseWebpackConfig.plugins.push(devtool.extractCSS,devtool.extractSaSS);
}


module.exports = baseWebpackConfig