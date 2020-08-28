export class Api {
    constructor() {
        this.baseURL = 'https://nomoreparties.co/cohort11';

    }

    getProfileInfo = () => {
        return fetch(`${this.baseURL}/users/me`, {
            headers: {
                authorization: '0489c5de-ce36-4587-b275-e5f69be7f1d1'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

    }

    editProfileInfo = (newName, newJob) => {
        return fetch(`${this.baseURL}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: '0489c5de-ce36-4587-b275-e5f69be7f1d1',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                about: newJob
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getCards = () => {
        return fetch(`${this.baseURL}/cards`, {
            headers: {
                authorization: '0489c5de-ce36-4587-b275-e5f69be7f1d1'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

    }

    postCards = (cardName, cardLink) => {
        return fetch(`${this.baseURL}/cards`, {
            method: 'POST',
            headers: {
                authorization: '0489c5de-ce36-4587-b275-e5f69be7f1d1',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteCards = (id) => {
        return fetch(`${this.baseURL}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: '0489c5de-ce36-4587-b275-e5f69be7f1d1',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    likeCards = (id) => {
        return fetch(`${this.baseURL}/cards/like/${id}`, {
            method: 'PUT',
            headers: {
                authorization: '0489c5de-ce36-4587-b275-e5f69be7f1d1',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
    deleteLikes = (id) => {
        return fetch(`${this.baseURL}/cards/like/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: '0489c5de-ce36-4587-b275-e5f69be7f1d1',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }


}

