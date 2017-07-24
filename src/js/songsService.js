const $ = require('jquery');

export default class SongsService {

    constructor(url) {
        this.url = url;
    }

    // Obtener listado de canciones
    list(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }
    
    // Crear o actualiza una canción
    save(song, successCallback, errorCallback) {
        if (song.id) {
            this.update(song, successCallback, errorCallback);
        } else {
            this.create(song, successCallback, errorCallback);
        }
    }
    
    // Crear una canción
    create(song, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: 'post',
            data: song,
            success: successCallback,
            error: errorCallback
        });
    }

    // Obtener el detalle de una canción
    getDetail(songId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songId}`,
            success: successCallback,
            error: errorCallback
        });
    }

    // Actualizar una canción
    update(song, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songId}`,
            method: 'put',
            data: song,
            success: successCallback,
            error: errorCallback
        });
    }

    // Borrar una canción (songsService.delete(4, response => {}, error => {}))
    delete(songId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songId}`,
            method: 'delete',
            success: successCallback,
            error: errorCallback
        });
    }

}