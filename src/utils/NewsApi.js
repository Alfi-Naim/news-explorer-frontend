class NewsApi {

    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._apiKey = options.apiKey;
        this._from = options.from;
        this._to = options.to;
        this._pageSize = options.pageSize;
    }

    _handleResponse = res => {
        return (res.ok) ? res.json() : Promise.reject(`Error code: ${res.status},Error text: ${res.statusText}`);
    }

    loadArticles = (keyword) => {
        return fetch(`${this._baseUrl}?q=${keyword}&from=${this._from}&to=${this._to}&pageSize=${this._pageSize}&apiKey=${this._apiKey}`, {
        }).then(this._handleResponse);
    }
}

const newsApi = new NewsApi({
    baseUrl: 'https://newsapi.org/v2/everything',
    apiKey: '4b5a598dbc0e4781aaaa579173e7e60d',
    to: new Date(),
    from: new Date(new Date() - (60 * 60 * 24 * 7 * 1000)),
    pageSize: 100
});

export default newsApi;