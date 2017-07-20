var gulp = require('gulp'); // importamos gulp
var sass = require('gulp-sass');//importamos gulp-sass
var browserSync = require('browser-sync').create();// importamos browser-sync
var notify = require('gulp-notify');
var gulpImport = require('gulp-html-import');
var tap = require('gulp-tap');
var browserify = require('browserify');
var buffer = require('gulp-buffer');

//definimos la tarea por defecto
gulp.task('default', ['html','sass', 'js'], function(){
    // iniciamos el servidor de desarrollo
    browserSync.init({server: 'dist/'});

    // observa cambios en los archivos sass y ejecuta la tarea sass
    gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['sass']);

    // observa cambios en los html y recarga el navegador
    gulp.watch(['src/*.html', 'src/**/*.html'], ['html']);

    // observa cambios en los JS y compila el JS de nuevo
    gulp.watch(['src/js/*.js', 'src/js/**/*.js'], ['js']);
});

// compilar sass
gulp.task('sass', function(){
    gulp.src('src/scss/style.scss') // cargamos el archivo style.scss
        .pipe(sass().on('error', function(error) {
            return notify().write(error);
        })) // lo compilamos con gulp-sacc
        .pipe(gulp.dest('dist/')) // guardamos el resultado en la carpeta css
        .pipe(browserSync.stream()); // recarga el css al vuelo
});

// copiar e importar html
gulp.task('html', function(){
    gulp.src('src/*.html')
        .pipe(gulpImport('src/components/'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

// compilar y generar un único javascript
gulp.task('js', function(){
    gulp.src('src/js/main.js')
        .pipe(tap(function(file){// tap nos permite ejecutar una función por cada fichero seleccionado en gulp.src
            // reemplazamos el contenido del fichero por lo que nos devuelve browserify pasándole el fichero
            file.contents = browserify(file.path) // creamos una instancia de browserify en base al archivo
                .transform('babelify', {presets: ['es2015']}) // traduce nuestro código de ES6 a ES5
                .bundle() // compilamos el archivo
                .on('error', function(error){
                    return notify().write(error);
                });
        }))
            .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
            .pipe(gulp.dest("dist/")) // lo guardamos en la carpeta dist
            .pipe(browserSync.stream()) // recargamos el navegador
            .pipe(notify('JS compilado'));
});