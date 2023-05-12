const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
    /* where webpack should look for the app's starting file */
    entry: './public/main.js',

    /* where webpack should store the app's bundle */
    output: {
        /* name of the output directory; __dirname is where the current
            file resides */
        path: path.resolve(__dirname, 'dist'),

        /* name of the output file */
        filename: 'index.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        new WasmPackPlugin({
            /* provide the root directory of the Rust project where
                Cargo.toml is located */
            crateDirectory: path.resolve(__dirname, '.')
        })
    ],
    experiments: {
        asyncWebAssembly: true
    }
}