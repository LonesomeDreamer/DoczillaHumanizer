const path = require("path");
const outputFileName = "pro.doczilla.linguistics.js.js";

module.exports = {
	mode: "production",
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
		filename: outputFileName,
		globalObject: "this",
		path: path.resolve(__dirname, "target/web"),
	},
};
