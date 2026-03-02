const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: [
        './src/app/index.js',
        './src/styles/style.scss',
    ],
    output: {
        path: path.resolve(__dirname, '../wwwroot'),
        filename: 'app.bundle.js',
    },
    resolve: {
		extensions: ['.js', '.jsx'],
	},
    module: {
        rules: [
           {
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
         	{
				test: /\.(jpg|gif|png|svg)$/,
				type: 'asset/resource'
			},
            {
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
							}
						}
					}
				]
			}
        ],
    },
    plugins: [
		new StyleLintPlugin({
			configFile: '.stylelintrc.json',
			files: '**/*.scss',
			fix: false,
		}),
        new ESLintPlugin({
            extensions: ['js', 'jsx'],
            fix: true,
        })
    ],
};