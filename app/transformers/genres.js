export const toLinkObjects = (genres) => genres.map((genre) => ({
    filter: genre.slug,
    url: genre.slug,
    display: genre.name,
}));
