var gulp = require('gulp'); // importamos gulp
var sass = require('gulp-sass');//importamos gulp-sass
var browserSync = require('browser-sync').create();// importamos browser-sync
var notify = require('gulp-notify');

//definimos la tarea por defecto
gulp.task('default', function(){
    // iniciamos el servidor de desarrollo
    browserSync.init({server: 'src/'});

    // observa cambios en los archivos sass y ejecuta la tarea sass
    gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['sass']);

    // observa cambios en los html y recarga el navegador
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

// compilar sass
gulp.task('sass', function(){
    gulp.src('src/scss/style.scss') // cargamos el archivo style.scss
        .pipe(sass().on('error', function(error) {
            return notify().write(error);
        })) // lo compilamos con gulp-sacc
        .pipe(gulp.dest('src/css/')) // guardamos el resultado en la carpeta css
        .pipe(browserSync.stream()) // recarga el css al vuelo
        .pipe(notify('SASS compilado')); // muestra notificación en pantalla
});
