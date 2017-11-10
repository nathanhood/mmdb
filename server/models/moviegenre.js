module.exports = (sequelize, DataTypes) => {
    let MovieGenre = sequelize.define('MovieGenre', {
        movieId: DataTypes.INTEGER.UNSIGNED,
        genreId: DataTypes.INTEGER.UNSIGNED
    });

    return MovieGenre;
};
