const path = require('path');
const webpack = require('webpack');
const { output } = require('./config');
const is_pro = process.env.NODE_ENV === 'production';

const module_cfg = {
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
};

const resolve_cfg = {
    alias: {
        config: path.resolve(__dirname, './config')
    }
}

const client = {
    entry: './src/client',
    output: {
        path: output.path,
        filename: output.client_filename,
    },
    module: module_cfg,
    resolve: resolve_cfg,
};

const ext = {
    target: 'node',
    entry: './src/index',
    output: {
        path: output.path,
        filename: output.ext_filename,
        library: 'web-extension-webpack-plugin',
        libraryTarget: 'umd',
    },
    externals: ['socket.io'],
    module: module_cfg,
    resolve: resolve_cfg,
    context: __dirname,
    node: {
        __filename: true,
        __dirname: true
    },
};

module.exports = [client];