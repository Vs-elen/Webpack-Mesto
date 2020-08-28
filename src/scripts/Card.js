export class Card {
    static template = document.querySelector('#place-card-template').content;

    constructor(data) {
        this.name = data.name;
        this.link = data.link;
        this.id = data.id;
        this.owner = data.owner;
        this.openPopupCallback = data.openPopupCallback;
        this.api = data.api;
        this.likes = data.likes;
    }

    like = (event) => {
        if (event.target.classList.contains('place-card__like-icon_liked')) {
            this.api.deleteLikes(this.id)            
                .then((res) => {                    
                    this.card.querySelector('.place-card__likes-number').textContent = res.likes.length;
                    event.target.classList.remove('place-card__like-icon_liked');                   
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.api.likeCards(this.id)
                .then((res) => {                    
                    this.card.querySelector('.place-card__likes-number').textContent = res.likes.length;
                    event.target.classList.add('place-card__like-icon_liked');
                    
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    remove = (event) => {
        event.stopPropagation();
        if (this.owner === '3b4bd9e3c39b1f3b8865b5c5') {
            if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
                this.api.deleteCards(this.id)
                    .then(() => {
                        this.removeListener();
                        this.card.remove();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }

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
        this.card.querySelector('.place-card__likes-number').textContent = this.likes.length;
        this.setEventListeners();
        if (this.owner === '3b4bd9e3c39b1f3b8865b5c5') {
            this.card.querySelector('.place-card__delete-icon').style.display = 'block';
        }
       

        return this.card;


    }









}
