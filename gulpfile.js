var elixir = require('laravel-elixir'),
    $       = require('laravel-elixir/node_modules/gulp-load-plugins')({
      config: 'laravel-elixir/package.json'
    }),
    gulp    = require('gulp');
    // Notification = require('laravel-elixir/ingredients/commands/Notification'),
    // imagemin = require('gulp-imagemin');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

// Configuration
elixir.config.sourcemaps = true;

var paths = {
    vendorDir: 'vendor/bower_components/',
    dist: {
        js: 'public/js/',
        css: 'public/css/',
        vendor: 'public/vendor/',
        images: 'public/images/'
    }
};

var bowerVendors = {
    jsDashboard: [
        'angular-animate/angular-animate.js',
        'nprogress/nprogress.js',
        'angular-ui-router/release/angular-ui-router.js',
        'angular-bootstrap/ui-bootstrap-tpls.js',
        'dropzone/dist/dropzone.js',
        // 'ng-currency/dist/ng-currency.js',
        'angular-touch/angular-touch.js',
        'angular-loading-bar/src/loading-bar.js',
        'angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
        'angular-local-storage/dist/angular-local-storage.js',
        'angular-slugify/angular-slugify.js',
        'textAngular/dist/textAngular-rangy.min.js',
        'textAngular/dist/textAngular-sanitize.min.js',
        'textAngular/dist/textAngular.min.js',
        // 'angular-ui-notification/src/angular-ui-notification.js',
        'angular-ui-select/dist/select.js',
        // 'ng-tags-input/ng-tags-input.js',
        // 'angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
        'lodash/lodash.min.js',
        'angular-google-maps/dist/angular-google-maps.min.js',
        'jquery.transit/jquery.transit.js',
        'angular-aria/angular-aria.js',
        // 'angular-material/angular-material.js',
        // 'angular-morph/dist/angular-morph.js',
        'codemirror/lib/codemirror.js',
        'angular-messages/angular-messages.js',
        'codemirror/addon/mode/loadmode.js',
        'codemirror/addon/display/fullscreen.js',
        'codemirror/mode/meta.js',
        'codemirror/addon/search/searchcursor.js',
        'codemirror/addon/search/search.js',
        'codemirror/addon/dialog/dialog.js',
        'codemirror/addon/edit/*.js',
        'codemirror/addon/comment/comment.js',
        'codemirror/addon/wrap/hardwrap.js',
        'codemirror/addon/fold/*.js',
        'codemirror/addon/selection/active-line.js',
        'codemirror/keymap/sublime.js',
        'angular-ui-codemirror/ui-codemirror.js',
        'imagesloaded/imagesloaded.pkgd.js',
        'masonry/dist/masonry.pkgd.js',
        'angular-masonry/angular-masonry.js',
        // 'jquery-htmlclean/jquery.htmlClean.js'
    ],
    js: [
        // 'angular-animate/angular-animate.js',
        // 'nprogress/nprogress.js',
        'angular-ui-router/release/angular-ui-router.js',
        // 'angular-bootstrap/ui-bootstrap-tpls.js',
        // 'dropzone/dist/dropzone.js',
        // 'ng-currency/dist/ng-currency.js',
        // 'angular-touch/angular-touch.js',
        // 'angular-loading-bar/src/loading-bar.js',
        // 'angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
        // 'angular-local-storage/dist/angular-local-storage.js',
        // 'angular-slugify/angular-slugify.js',
        // 'textAngular/dist/textAngular-rangy.min.js',
        // 'textAngular/dist/textAngular-sanitize.min.js',
        // 'textAngular/dist/textAngular.min.js',
        // 'angular-ui-notification/src/angular-ui-notification.js',
        // 'angular-ui-select/dist/select.js',
        // 'ng-tags-input/ng-tags-input.js',
        // 'angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
        'lodash/lodash.min.js',
        // 'angular-google-maps/dist/angular-google-maps.min.js',
        // 'jquery.transit/jquery.transit.js',
        // 'angular-aria/angular-aria.js',
        // 'angular-material/angular-material.js',
        // 'angular-morph/dist/angular-morph.js',
        // 'imagesloaded/imagesloaded.pkgd.js',
        // 'masonry/dist/masonry.pkgd.js',
        // 'angular-masonry/angular-masonry.js',
        // 'angular-messages/angular-messages.js'
    ],
    cssDashboard: [
        'animate.css/animate.css',
        'dropzone/dist/dropzone.css',
        'angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.css',
        'angular-loading-bar/src/loading-bar.css',
        'angular-ui-select/dist/select.css',
        'textAngular/src/textAngular.css',
        'select2/select2.css',
        // 'ng-tags-input/ng-tags-input.css',
        // 'ng-tags-input/ng-tags-input.bootstrap.css',
        // 'angular-material/angular-material.css',
        'codemirror/lib/codemirror.css',
        'codemirror/theme/monokai.css',
        'codemirror/addon/fold/foldgutter.css',
        'codemirror/addon/dialog/dialog.css'
    ],
    css: [
        // 'animate.css/animate.css',
        // 'dropzone/dist/dropzone.css',
        // 'angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.css',
        // 'angular-loading-bar/src/loading-bar.css',
        // 'angular-ui-select/dist/select.css',
        // 'textAngular/src/textAngular.css',
        // 'select2/select2.css',
        // 'ng-tags-input/ng-tags-input.css',
        // 'ng-tags-input/ng-tags-input.bootstrap.css',
        // 'angular-material/angular-material.css',
        // 'codemirror/lib/codemirror.css'
    ]
};

/*
 |--------------------------------------------------------------------------
 | Elixir _coffee command
 |-------------------------------------------------------------------------
 */
elixir.extend('_coffee', function()
{
    var _coffee = function( scripts, outputName, coffeeOptions )
    {
        var coffeeDir = elixir.config.assetsDir + 'coffee/';
        outputName = outputName + '.js';
        options = ( coffeeOptions ) ? coffeeOptions : { bare: true };
        if( ! Array.isArray( scripts ) )
        {
            scripts = scripts.split();
        }
        scripts.forEach( function( val, key )
        {
            scripts[ key ] = coffeeDir + val + '.coffee';
        });

        return gulp.src( scripts )
            .pipe( $.if( elixir.config.sourcemaps, $.sourcemaps.init() ) )
            .pipe( $.coffee( options ) )
            .pipe( $.concat( outputName ) )
            .pipe( gulp.dest( elixir.config.jsOutput ) )
            .pipe( $.uglify({ compress: true }) )
            .pipe( $.rename({ suffix: '.min' }) )
            .pipe( $.if( elixir.config.sourcemaps, $.sourcemaps.write('.') ) )
            .pipe( gulp.dest( elixir.config.jsOutput ) );
    }

    gulp.task( '_coffee', function()
    {
        _coffee([ 'preload', 'routes', 'app_*' ], 'scripts' );
        _coffee( 'admin_*', 'admin' );
        _coffee( 'user_*', 'user' );
        _coffee([ 'dashboard/preload', 'dashboard/routes', 'dashboard/app_*'], 'dashboard' );
    });

    return this.registerWatcher( '_coffee', this.assetsDir + 'coffee/**/*.coffee' ).queueTask( '_coffee' );
});
/*
 |--------------------------------------------------------------------------
 | Elixir _scripts command
 |-------------------------------------------------------------------------
 */
elixir.extend('_scripts', function()
{
    var _scripts = function(scripts, coffeeOptions)
    {
        var coffeeDir = elixir.config.assetsDir + 'coffee/';
        // outputName = outputName + '.js';
        options = ( coffeeOptions ) ? coffeeOptions : { bare: true };
        if(!Array.isArray(scripts)) {
            scripts = scripts.split();
        }
        scripts.forEach(function(val, key) {
            scripts[key] = coffeeDir + val + '.coffee';
        });

        return gulp.src( scripts )
            .pipe( $.if( elixir.config.sourcemaps, $.sourcemaps.init() ) )
            .pipe( $.coffee( options ) )
            // .pipe( $.concat( outputName ) )
            .pipe( gulp.dest( elixir.config.jsOutput + '/src') )
            .pipe( $.uglify({ compress: true }) )
            .pipe( $.rename({ suffix: '.min' }) )
            .pipe( $.if( elixir.config.sourcemaps, $.sourcemaps.write('.') ) )
            .pipe( gulp.dest( elixir.config.jsOutput + '/src') );
    }

    gulp.task( '_scripts', function() {
        _scripts('**/**');
    });

    return this.registerWatcher( '_scripts', this.assetsDir + 'coffee/**/*.coffee' ).queueTask( '_scripts' );
});

// Coffeescripts
elixir(function(mix) {
    mix._coffee();
    mix.coffee();
    mix._scripts();
});

elixir(function(mix) {
    mix.less('app.less');
});

// Bower Vendors
elixir(function(mix) {
    bowerVendors.js.forEach(function(val, key) {
        bowerVendors.js[key] = paths.vendorDir + val;
    });
    bowerVendors.css.forEach(function(val, key) {
        bowerVendors.css[key] = paths.vendorDir + val;
    });

    // JavaScripts
    mix.scripts( bowerVendors.js, mix.jsOutput + '/vendor.js', paths.vendorDir )
       .scripts( bowerVendors.jsDashboard, mix.jsOutput + '/vendor-dashboard.js', paths.vendorDir );
    // Styles
    mix.styles( bowerVendors.css, mix.cssOutput + '/vendor.css', paths.vendorDir )
       .styles( bowerVendors.cssDashboard, mix.cssOutput + '/vendor-dashboard.css', paths.vendorDir );
    // Copy
    mix.copy(paths.vendorDir + 'jquery/dist', paths.dist.vendor + 'jquery/')
       .copy(paths.vendorDir + 'angular', paths.dist.vendor + 'angular/')
       .copy(paths.vendorDir + 'bootstrap/dist', paths.dist.vendor + 'bootstrap/')
       .copy(paths.vendorDir + 'font-awesome', paths.dist.vendor + 'font-awesome/');
       // .copy(paths.vendorDir + 'codemirror', paths.dist.vendor + 'codemirror/' );
       // .copy( paths.vendorDir + 'require1k', paths.dist.vendor + 'require1k/' );
});