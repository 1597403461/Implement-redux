const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var config = {
    entry: ['./src/index.js'], // 打包入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }, // 打包输出文件
    plugins: [
        new CleanWebpackPlugin(), // 打包前清空dist目录
    ]
};
module.exports = config;