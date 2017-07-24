const $ = require('jquery');

export class SongsService {

    constructor() {

    }

    // Obtener listado de canciones
    list(successCallback, errorCallback) {
        $.ajax({
            url: '/songs/',
            success: successCallback,
            error: errorCallback
        });
    }
    // Crear o actualizar una canción
    save(song) {

    }

    // Obtener el detalle de una canción
    getDetail(songId) {

    }

    // Actualizar una canción
    update(song) {

    }

    // Borrar una canción
    delete(songId) {

    }

}