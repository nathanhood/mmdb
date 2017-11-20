const Tmdb = require('../gateways/TmdbGateway');

class MovieApiService {
    constructor() {
        this.gateway = new Tmdb();
    }

    getConfig() {
        return this.gateway.getConfig();
    }

    getMovieByTmdbId(id) {
        return this.gateway.getMovieById(id);
    }

    searchForNewMovie(query, page) {
        return this.gateway.searchForMovie(query, page);
    }
}

module.exports = MovieApiService;
