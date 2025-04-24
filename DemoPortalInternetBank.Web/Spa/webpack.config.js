const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: [
        './src/app/index.js',
        './src/styles/style.scss',
    ],

    output: {
        path: path.resolve(__dirname, '../wwwroot'),
        filename: 'app.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        [
                            'es2015', {
                                "loose": true,
                            },
                        ],
                        "stage-0",
                        "react"
                    ],
                    plugins: [

                        "add-module-exports",
                        "transform-object-rest-spread"
                    ]
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader', options: { limit: 20000 }
                }
            },
            {
                test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        mimetype: 'application/font-woff',
                        outputPath: 'fonts/',
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                loader: "eslint-loader"
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
        ],
    },
    plugins: [
        new StyleLintPlugin(),
    ],
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             uglifyOptions: {
    //                 warnings: false,
    //                 parse: {},
    //                 compress: {},
    //                 mangle: true, // Note `mangle.properties` is `false` by default.
    //                 output: null,
    //                 toplevel: false,
    //                 nameCache: null,
    //                 ie8: true,
    //                 keep_fnames: false,
    //             },
    //         }),
    //     ],
    // },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    devtool: 'source-map',

    watchOptions: {
        poll: true
    }

};