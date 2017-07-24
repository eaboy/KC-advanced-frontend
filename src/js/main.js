window.$ = window.jQuery = require('jquery');

import SongsService from './SongsService.js';
import UIManager from './UIManager.js';

const songsService = new SongsService('/songs');
const songListUIManager = new UIManager('.songs-list');
 
// Carga la lista de canciones con AJAX

songsService.list( songs => {
        let html = '';

        // Comprobamos si hay canciones

        if (songs.length === 0) {
            // Quitamos el mensaje de cargando y mostramos el estado vacío
           songListUIManager.setEmpty(); 
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
            songListUIManager.setIdeal();   
        }

    },
    error => {

        // Quitamos el mensaje de cargando y mostramos el estado de error
        songListUIManager.setError(); 


        // Hacemos el log del error en la consola
        console.log('ERRRO', error);
    }
);