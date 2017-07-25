

export default class SongsListManager{

    constructor(songsService, uiManager) {
        this.songsService = songsService;
        this.uiManager = uiManager;
    }

    init() {
        this.loadSongs();
    }

    loadSongs() {
        // Carga la lista de canciones con AJAX

        this.songsService.list( songs => {

                // Comprobamos si hay canciones

                if (songs.length === 0) {
                    // Quitamos el mensaje de cargando y mostramos el estado vacío
                this.uiManager.setEmpty(); 
                } else { 
                    this.renderSongs(songs); 

                    // Quitamos el mensaje de cargando y mostramos el listado de canciones
                    this.uiManager.setIdeal(); 
                }

            },
            error => {

                // Quitamos el mensaje de cargando y mostramos el estado de error
                this.uiManager.setError(); 


                // Hacemos el log del error en la consola
                console.log('ERROR', error);
            }
        );
    }

    renderSongs(songs) {
        let html = '';
                    
        // Componemos el html con todas las canciones
        for (let song of songs) {
            html += this.renderSong(song);
        }

        // Metemos el html en el div que contiene todas las canciones
        this.uiManager.setIdealHtml(html);
    }

    renderSong(song) {
        return `<article class="song">
            <img src="${song.cover_url}" alt="${song.artist}" class="cover">
            <div class="artist">${song.artist}</div>
            <div class="title">${song.title}</div>
        </article>`;
    }

}