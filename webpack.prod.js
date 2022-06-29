const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const outputFileName = "pro.doczilla.linguistics.js.js";
const outputDir = "target/web";

module.exports = {
	mode: "production",
	entry: "./src/js/index.ts",
	target: ['web', 'es5'],
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "./src/test", to: './' },
			],
		}),
	],
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
		filename: outputFileName,
		globalObject: "this",
		path: path.resolve(__dirname, outputDir),
	},
};
