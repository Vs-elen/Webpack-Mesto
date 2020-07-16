const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: { main: './src/index.js' },
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: { loader: "babel-loader" },
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
					'postcss-loader']
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader?name=./vendor/[name].[ext]'
			},

			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [{
					loader: 'file-loader',

				},
				{
					loader: 'image-webpack-loader',
					options: {
						mozjpeg: {
							progressive: true,
							quality: 65,
							esModule: false
						},
						// optipng.enabled: false will disable optipng
						optipng: {
							enabled: false,
						},
						pngquant: {
							quality: [0.65, 0.90],
							speed: 4
						},
						gifsicle: {
							interlaced: false,
						},
						// the webp option will enable WEBP
						webp: {
							quality: 75
						}
					}
				},
				],
			},
		]
	},

	resolve: {
		alias: {
			img: path.resolve(__dirname, 'src/images')
		}
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css'
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default']
			},
			canPrint: true
		}),
		new HtmlWebpackPlugin({
			inject: false,
			template: './src/index.html',
			filename: 'index.html'
		}),
		new WebpackMd5Hash(),
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
};