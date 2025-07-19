const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/app.jsx", // Main JS entry point
  output: {
    path: path.resolve(__dirname, "build"), // Output folder
    filename: "bundle.js", // Output JS file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // For React JS/JSX files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Transpile JS and JSX
        },
      },
      {
        test: /\.css$/, // For CSS files
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          "css-loader", // Resolves CSS imports
          "postcss-loader", // Processes Tailwind CSS with PostCSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "tailwind-compiled.css", // Name of the CSS output file
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"], // Resolve JS and JSX file extensions
  },
  mode: "production", // Can be set to 'production' for optimized builds
  // Removed watch option to ensure the build process terminates after completion
};
