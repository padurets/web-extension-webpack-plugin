const path = require('path');
const webpack = require('webpack');
const { output } = require('./index');
const is_pro = process.env.NODE_ENV === 'production';

const client = {
    entry: './src/client',
    output: {
        path: output.path,
        filename: output.client_filename,
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-0', 'stage-1']
            }
        },{
            test: /\.json$/,
            loader: 'json'
        }]
    }
};

module.exports = [client];