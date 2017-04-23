var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'app/public/js');
var APP_DIR = path.resolve(__dirname, 'webapp');
var SASS_DIR = path.resolve(__dirname, 'app/public/scss');

var config = {
    entry: APP_DIR + '/index.jsx', // Where the react app is stored ...
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: [SASS_DIR]
                    }
                }]
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'webapp'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                ['es2015'],
                                'react',
                            ],
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = config;