const path = require("path");

module.exports = {
	mode: "production",
	/*mode: "development",
	devtool: 'inline-source-map',*/
	entry: "./src/index.ts",
	target: ['web', 'es5'],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		library: {
			name: "Humanizer",
			type: "var",
		},
		filename: "index.js",
		globalObject: "this",
		path: path.resolve(__dirname, "target"),
	},
};
