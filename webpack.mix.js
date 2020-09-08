const mix = require('laravel-mix');
require('laravel-mix-alias');

const webpack = require('webpack');
const dotenv = require('dotenv');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.alias({
    '@': '/resources/js',
    '@sass': '/resources/sass'
 });

mix.react('resources/js/app.js', 'public/js');

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.(sc|c|sa)ss$/,
                use: [
                    { loader: 'scoped-css-loader' },
                ],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            env: {
                API_URL: JSON.stringify(process.env.API_URL),
                NCLOUD_CLIENT_ID: JSON.stringify(process.env.NCLOUD_CLIENT_ID)
            }
        })
    ]
});
