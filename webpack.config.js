const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/extension.ts',  
    output: {
        filename: 'extension.js',  
        path: path.resolve(__dirname, 'out'),  
        libraryTarget: 'commonjs2',  // Module format
        devtoolModuleFilenameTemplate: '../[resource-path]' 
    },
    devtool: 'source-map',
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};
