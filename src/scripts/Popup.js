export class Popup {
    constructor(popupItem, onCloseCall) {
        this.popup = popupItem;
        this.onCloseCall = onCloseCall;

        this.closeButton = this.popup.querySelector('.popup__close');

    }

    open = () => {
        this.popup.classList.add('popup_is-opened');
        this.setEventListeners();
    }

    close = () => {
        if (this.onCloseCall) {
            this.onCloseCall();
        }
        this.popup.classList.remove('popup_is-opened');
        this.removeEventListeners();
    }

    handleKeydown = (event) => {
        if (event.code === 'Escape') {
            if (this.popup.classList.contains('popup_is-opened')) {
                this.close();
            }
        }
    }

    setEventListeners = () => {
        this.closeButton.addEventListener('click', this.close);
        document.addEventListener('keydown', this.handleKeydown);
    }



    removeEventListeners = () => {
        this.closeButton.removeEventListener('click', this.close);
        document.removeEventListener('keydown', this.handleKeydown);
    }
}


