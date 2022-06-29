const path = require("path");
const outputFileName = "pro.doczilla.linguistics.js.js";

module.exports = {
	mode: "development",
	devtool: 'inline-source-map',
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
			name: "Humanizer_dev",
			type: "var",
		},
		filename: outputFileName,
		globalObject: "this",
		path: path.resolve(__dirname, "target/web/debug"),
	},
};
