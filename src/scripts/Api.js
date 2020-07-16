export class Api {
    constructor(baseURL) {
        this.baseURL = baseURL;

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

}

