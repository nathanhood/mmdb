module.exports = (sequelize, DataTypes) => {
    let UserMovie = sequelize.define('UserMovie', {
        userId: DataTypes.INTEGER.UNSIGNED,
        movieId: DataTypes.INTEGER.UNSIGNED,
        format: DataTypes.STRING,
        isFavorite: DataTypes.BOOLEAN,
    });

    return UserMovie;
};
