const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');


const config = {
    entry: `${SRC_DIR}/js/main.js`,
    output: {
        path: BUILD_DIR,
        filename: 'js/app.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: SRC_DIR,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/../',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'link:href'],
                    },
                },
            },
            {
                test: /\.(ico|png|jpg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: './images/',
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: './fonts/',
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${SRC_DIR}/index.html`,
            filename: `${BUILD_DIR}/index.html`,
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/styles.css',
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
};



module.exports = config;
