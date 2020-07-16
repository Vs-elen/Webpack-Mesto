export class Card {
    static template = document.querySelector('#place-card-template').content;

    constructor(name, link, openPopupCallback) {
        this.name = name;
        this.link = link;
        this.openPopupCallback = openPopupCallback;
    }

    like = (event) => {

        event.target.classList.toggle('place-card__like-icon_liked');

    }

    remove = (event) => {
        event.stopPropagation();
        this.removeListener();
        this.card.remove();
    }

    openPopup = () => {
        this.openPopupCallback(this.link);
    }

    setEventListeners = () => {
        this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
        this.card.querySelector('.place-card__image').addEventListener('click', this.openPopup);
    }

    removeListener() {
        this.card.querySelector('.place-card__like-icon').removeEventListener("click", this.like);
        this.card.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
        this.card.querySelector('.place-card__image').removeEventListener('click', this.openPopup);
    }

    create = () => {

        this.card = Card.template.cloneNode(true).children[0];
        this.card.querySelector('.place-card__name').textContent = this.name;
        this.card.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;

        this.setEventListeners();
        return this.card;


    }









}
