const $ = require('jquery');

export default class UIManager {

    constructor(selector) {
        this.uiStateClasses = 'empty loading error partial ideal';
        this.element = $(selector); // Seleccionamos el elemento de jQuery en el constructor
    }

    setEmpty() {
        this.element.removeClass(this.uiStateClasses).addClass('empty');
    }

    setLoading() {
        this.element.removeClass(this.uiStateClasses).addClass('loading');
    }

    setError() {
        this.element.removeClass(this.uiStateClasses).addClass('error');
    }

    setPartial() {
        this.element.removeClass(this.uiStateClasses).addClass('partial');
    }

    setIdeal() {
        this.element.removeClass(this.uiStateClasses).addClass('ideal');
    }

    setEmptyHtml(html) {
        // Busca un descendiente de this.element  que tenga las clases CSS ui-status y empty y le asigna un html
        this.element.find('.ui-status.empty').html(html);
    }

    setErrorHtml(html) {
        // Busca un descendiente de this.element  que tenga las clases CSS ui-status y error y le asigna un html
        this.element.find('.ui-status.error').html(html);
    }

    setPartialHtml(html) {
        // Busca un descendiente de this.element  que tenga las clases CSS ui-status y partial y le asigna un html
        this.element.find('.ui-status.partial').html(html);
    }

    setIdealHtml(html) {
        // Busca un descendiente de this.element  que tenga las clases CSS ui-status y ideal y le asigna un html
        this.element.find('.ui-status.ideal').html(html);
    }
}