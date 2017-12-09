const DIGITAL_PLATFORMS = [
    { display: 'Amazon', value: 'amazon' },
    { display: 'Google Play', value: 'google-play' },
    { display: 'iTunes', value: 'itunes' },
];

const MOVIE_FORMATS = [
    { display: 'DVD', value: 'dvd' },
    { display: 'Blu-ray', value: 'blu-ray' },
    ...DIGITAL_PLATFORMS,
];

module.exports = {
    movie: MOVIE_FORMATS,
};
