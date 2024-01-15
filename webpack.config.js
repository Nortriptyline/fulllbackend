const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    // path to your main TypeScript file
    entry: './src/fleet.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'fleet',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        // Required to keep shebang in output file
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    ],
    target: 'node',
    externals: [nodeExternals()],
};