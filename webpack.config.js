const webpack = require('webpack');
const path = require('path');
var config = {
    entry: ['./src/index.js'], // 打包入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    } // 打包输出文件
};
module.exports = config;