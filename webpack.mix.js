const mix = require('laravel-mix');
require('laravel-mix-alias');

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
                {
                  loader: 'style-loader',
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true,
                    importLoaders: 2,
                  },
                },
                // You have to put in after `css-loader` and before any `pre-precessing loader`
                { loader: 'scoped-css-loader' },
                {
                  loader: 'sass-loader',
                },
              ],
            },
        ]
    }
}).sourceMaps();
