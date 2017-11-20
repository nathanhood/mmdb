const axios = require('axios');
const { slugify } = require('../utils/urls');
const { toSQLDateTime } = require('../utils/dateTime');

const fetch = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

class TmdbGateway {
    constructor() {
        this.apiKey = process.env.TMDB_API_KEY;
        this.urls = {
            configuration: 'configuration',
            movies: 'movie',
            searchMovies: 'search/movie',
        };

        this.baseParams = {
            api_key: this.apiKey,
        }
    }

    _transformMovie(movie) {
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
        };
    }

    _transformSearchResult(movie) {
        return {
            tmdbId: movie.id,
            title: movie.title,
            slug: slugify(movie.title),
            overview: movie.overview,
            releaseDate: toSQLDateTime(movie.release_date),
            language: movie.original_language,
            poster: movie.poster_path,
            backdrop: movie.backdrop_path,
            genreIds: movie.genre_ids,
        };
    }

    getConfig() {
        return fetch.get(this.urls.configuration, { params: this.baseParams })
            .catch((e) => {
                // TODO: Add server logging system
                throw e;
            });
    }

    getMovieById(id) {
        return fetch.get(`${this.urls.movies}/${id}`, { params: this.baseParams })
            .then(({ data }) => this._transformMovie(data))
            .catch((e) => {
                // TODO: Add server logging system
                throw e;
            });
    }

    searchForMovie(query = '', page = 1) {
        return fetch.get(this.urls.searchMovies, {
            params: { ...this.baseParams, query, page },
        }).then(({ data }) => {
            return {
                page: data.page,
                totalPages: data.total_pages,
                totalResults: data.total_results,
                movies: data.results.map((movie) => this._transformSearchResult(movie)),
            };
        }).catch((e) => {
            // TODO: Add server logging system
            throw e;
        });
    }
}

module.exports = TmdbGateway;
