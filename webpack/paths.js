const path = require("path");

module.exports = {
	appRoot: path.resolve(__dirname, "../", "client"),
	root: path.resolve(__dirname, "../"),
	outputPath: path.resolve(__dirname, "../", "build"),
	entryPath: path.resolve(__dirname, "../", "client/index.js"),
	templatePath: path.resolve(__dirname, "../", "client/template.html"),
	imagesFolder: "images",
	fontsFolder: "fonts",
	cssFolder: "css",
	jsFolder: "js",
};
