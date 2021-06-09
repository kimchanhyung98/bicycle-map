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
    '@components': '/resources/js/components',
    '@sass': '/resources/sass'
 });

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.(sc|c|sa)ss$/,
                // use: [
                //     { loader: 'scoped-css-loader' },
                // ],
                use: ['style-loader', 'css-loader', 'scoped-css-loader', 'sass-loader'],
            },
            // {
            //     enforce: 'pre',
            //     exclude: /node_modules/,
            //     test: /\.(js)$/,
            //     use: ['eslint-loader'],
            // },
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

// TODO: prod dev 버전 분리
mix.react('resources/js/app.js', 'public/js').sourceMaps();

mix.options({
    processCssUrls: false
});

mix.version();
