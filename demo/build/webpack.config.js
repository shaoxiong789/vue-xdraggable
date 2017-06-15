const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './demo/src/main.js',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'js/[name]-[hash].js'
    },
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
            },
            {
                test: /\.vue$/,
                loaders: [
                    'vue-loader'
                ]
            },
            {
                test: /\.(css|scss)$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?minimize'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            },
			{
				test: /\.(js|vue)$/,
				enforce: 'pre',  // 在babel-loader对源码进行编译前进行lint的检查
				use: [{
					loader: 'eslint-loader',
					options: {
						formatter: require('eslint-friendly-formatter')	// 编译后错误报告格式
					}
				}]
			}
        ]
    },
    plugins: [
        new ExtractTextPlugin('index-[contenthash].css'),
        new HtmlWebpackPlugin({
            template: 'demo/src/index.template.html',
            filename: 'index.html'
        }),
    ],
    devtool: 'source-map'
};