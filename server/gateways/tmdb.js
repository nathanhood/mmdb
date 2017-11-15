const axios = require('axios');
const { slugify } = require('../utils/urls');
const { toSQLDateTime } = require('../utils/dateTime');

const fetch = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

class Tmdb {
    constructor() {
        this.apiKey = process.env.TMDB_API_KEY;
        this.urls = {
            configuration: 'configuration',
            movies: 'movie',
        };

        this.baseParams = {
            api_key: this.apiKey,
        }
    }

    getConfig() {
        return fetch.get(this.urls.configuration).catch((e) => {
            // TODO: Add server logging system
            throw e;
        });
    }

    getMovieById(id) {
        return fetch.get(`${this.urls.movies}/${id}`, {
            params: this.baseParams
        }).then(({ data }) => {
            return this.transformMovie(data);
        }).catch((e) => {
            // TODO: Add server logging system
            throw e;
        });
    }

    transformMovie(movie) {
        return {
            tmdbId: movie.id,
            imdbId: movie.imdb_id,
            title: movie.title,
            slug: slugify(movie.title),
            overview: movie.overview,
            tagline: movie.tagline,
            releaseDate: toSQLDateTime(movie.release_date),
            rating: movie.rating,
            status: movie.status,
            revenue: movie.revenue,
            budget: movie.budget,
            runtime: movie.runtime,
            language: movie.original_language,
            poster: movie.poster_path,
            backdrop: movie.backdrop_path,
            genreIds: movie.genres.map((genre) => genre.id),
        }
    }
}

module.exports = Tmdb;
