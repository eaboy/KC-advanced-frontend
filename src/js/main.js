window.$ = window.jQuery = require('jquery');

// Carga la lista de canciones con AJAX

$.ajax({
    url: '/songs/',
    success: songs => {
        let html = '';

        // Comprobamos si hay canciones

        if (songs.length === 0) {
            // Quitamos el mensaje de cargando y mostramos el estado vacío
            $('.songs-list').removeClass('loading').addClass('empty'); 
        } else {
            
            // Componemos el html con todas las canciones
            for (let song of songs) {
                html += `<article class="song">
                <img src="${song.cover_url}" alt="${song.artist}" class="cover">
                <div class="artist">${song.artist}</div>
                <div class="title">${song.title}</div>
            </article>`;
            }

            // Metemos el html en el div que contiene todas las canciones
            $('.songs-list .ui-status.ideal').html(html);

            // Quitamos el mensaje de cargando y mostramos el listado de canciones
            $('.songs-list').removeClass('loading').addClass('ideal');   
        }

    },
    error: error => {

        // Quitamos el mensaje de cargando y mostramos el estado de error
        $('.songs-list').removeClass('loading').addClass('error'); 


        // Hacemos el log del error en la consola
        console.log('ERRRO', error);
    }
})