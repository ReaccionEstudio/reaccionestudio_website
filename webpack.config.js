var Encore = require('@symfony/webpack-encore');

var files = [

	// JS
	//'./assets/js/jquery.3.2.1.min.js',
	'./assets/js/jquery.nice-select.js',
	'./assets/js/bootstrap.min.js',
	'./assets/js/loadmore.js',
	'./assets/js/main.js',
	'./assets/js/modal-video.js',
	'./assets/js/niceselect-activate.js',
	'./assets/js/owl.carousel.min.js',
	'./assets/js/popper.min.js',
	'./assets/js/prefixfree.min.js',

	// CSS
	'./assets/css/animate.css',
	'./assets/css/bootstrap.min.css',
	'./assets/css/font-awesome.min.css',
	'./assets/css/modal-video.min.css',
	'./assets/css/nice-select.css',
	'./assets/css/normalize.css',
	'./assets/css/owl.carousel.min.css',
	'./assets/css/responsive.css',

];

Encore
    
    // the project directory where all compiled assets will be stored
    .setOutputPath('public/build/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')    

    // will create public/build/app.js and public/build/app.css
    .addEntry('app', files)

    // allow legacy applications to use $/jQuery as a global variable
    .autoProvidejQuery()

    .enableSourceMaps(!Encore.isProduction())

    // empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()

    // show OS notifications when builds finish/fail
    .enableBuildNotifications()

;

// export the final configuration
module.exports = Encore.getWebpackConfig();