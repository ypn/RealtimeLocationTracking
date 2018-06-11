  let mix = require('laravel-mix');

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

mix//.js('resources/assets/js/app.js', 'public/js')
   //.sass('resources/assets/sass/app.scss', 'public/css');
   .react('resources/assets/js/admin/admin-bundle.js','public/js/admin');
   //.react('resources/assets/js/frontend/frontend-bundle.js','public/js/frontend')
   //.react('resources/assets/js/login/login-bundle.js','public/js/login');
