const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
    target: 'node', // VS Code extensions run in a Node.js context 📖 -> https://webpack.js.org/configuration/node/
    mode: 'production', // Set to 'production' for optimized builds
    entry: './src/extension.ts', // Entry point of the extension 📖 -> https://webpack.js.org/configuration/entry-context/
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode' // Exclude VS Code module from the bundle
    },
    resolve: {
        extensions: ['.ts', '.js'] // Resolve TypeScript and JavaScript files
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // Clean the output directory before each build
        // No need to copy package.json
    ],
    devtool: 'nosources-source-map', // Generate source maps without revealing source code
    infrastructureLogging: {
        level: 'log', // Enable logging required for problem matchers
    },
};

module.exports = [extensionConfig];
