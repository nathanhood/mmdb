const axios = require('axios');

const fetch = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

class Tmdb {
    constructor() {
        this.apiKey = `api_key=${process.env.TMDB_API_KEY}`;
        this.urls = {
            configuration: `/configuration?${this.apiKey}`,
        };
    }

    getConfig() {
        return fetch.get(this.urls.configuration).catch((e) => {
            // TODO: Add server logging system
            throw e;
        });
    }
}

module.exports = Tmdb;
