var path = require('path');

module.exports = {
	entry: {
		App: "./app/assets/scripts/App.js",
	},
	output: {
		path: path.resolve(__dirname,"./app/temp/scripts"),
		filename: "[name].js"
	},
	node: {
 		readline: 'empty'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015','react']
				},
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	},
	resolve: {
    	extensions: ['.js', '.jsx']
  	},	
}