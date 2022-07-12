class MainApi {

    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _handleResponse = res => {
        return (res.ok) ? res.json() : Promise.reject(`Error code: ${res.status},Error text: ${res.statusText}`);
    }

    loadUserInfo = () => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,

            },
        }).then(this._handleResponse);
    }

    saveArticle = (card) => {
        return fetch(`${this._baseUrl}/articles`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
            body: JSON.stringify({
                keyword: card.keyword,
                title: card.title,
                text: card.description,
                date: card.publishedAt,
                source: card.source.name,
                link: card.url,
                image: card.urlToImage

            }),
        }).then(this._handleResponse);
    }

    deleteArticle = (articleId) => {
        return fetch(`${this._baseUrl}/articles/${articleId}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,

            },
        }).then(this._handleResponse);
    }

    loadSavedArticles = () => {
        return fetch(`${this._baseUrl}/articles`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
        }).then(this._handleResponse);
    }

}

const mainApi = new MainApi({
    baseUrl: 'https://api.alfi-explorer.students.nomoreparties.sbs',
    //baseUrl: 'http://localhost:3001',
});

export default mainApi;