const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './build/index.ts',
    mode: 'development',
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, 'app'),
        open: true,
        port: 8080,
    },
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'app'),
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.ts?$/,
                use: 'eslint-loader',
                exclude: /node_modules/,

            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'fonts'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.[hash].css"
        }),
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './build/index.html',
            filename: "index.html"
        })
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
