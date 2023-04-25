const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, '../src/main.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../build')
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../build'),
        },
        port: 3000
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:path.resolve(__dirname, './template.html')
        })
    ],
    module:{
        rules:[
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}