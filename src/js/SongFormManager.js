const $ = require('jquery');

import UIManager from './UIManager';

export default class SongFormManager extends UIManager {

    constructor(elementSelector, songsService) {
        super(elementSelector); // lamada al constructor de la clase UIManager
        this.songsService = songsService;
    }

    init() {
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {
        this.element.on('submit', () => {
            this.validateAndSendData();
            return false; // en jQuery se hace un preventDefault() haciendo un return false
        });
    }

    validateAndSendData() {
        if(this.isValid()) {
            this.send()
        }
    }

    isValid(){
        const inputs = this.element.find('input');
        for (let input of inputs) {
            if (input.checkValidity() === false) {
                const errorMessage = input.validationMessage;
                input.focus();
                this.setErrorHtml(errorMessage);
                this.setError();
                return false;
            }
        }
        this.setIdeal();
        return true;
    }

    send(){
        this.setLoading();
        const song = {
            artist: this.element.find('#artist').val(),
            title: this.element.find('#title').val(),
            cover_url: this.element.find('#cover_url').val()
        }

        this.songsService.save(song, success => {
            // TODO: recargar el listado de canciones
            this.resetForm();// Resetea el form
            this.setIdeal();
        }, error => {
            this.setErrorHtml('Se ha producido un error al guardar la canción en el servidor.');
            this.setError();
        });
    }

    resetForm() {
        this.element[0].reset();
    }

    disableFormControls() {
        this.element.find('input, button').attr('disabled', true);
    }

    enableFormControls() {
        this.element.find('input, button').attr('disabled', false);
    }

    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

    setError() {
        super.setError();
        this.enableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }
}