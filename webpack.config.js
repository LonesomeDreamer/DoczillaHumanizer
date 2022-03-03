const path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/index.ts",
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
