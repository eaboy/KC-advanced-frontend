var gulp = require('gulp'); // importamos gulp
var sass = require('gulp-sass');//importamos gulp-sass
var browserSync = require('browser-sync').create();// importamos browser-sync
var notify = require('gulp-notify');
var gulpImport = require('gulp-html-import');

//definimos la tarea por defecto
gulp.task('default', ['sass','html'], function(){
    // iniciamos el servidor de desarrollo
    browserSync.init({server: 'dist/'});

    // observa cambios en los archivos sass y ejecuta la tarea sass
    gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['sass']);

    // observa cambios en los html y recarga el navegador
    gulp.watch('src/*.html', ['html']);
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
        .pipe(gulpImport('src/components/*'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});
