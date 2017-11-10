module.exports = (sequelize, DataTypes) => {
    let UserMovie = sequelize.define('UserMovie', {
        userId: DataTypes.INTEGER.UNSIGNED,
        movieId: DataTypes.INTEGER.UNSIGNED
    });

    return UserMovie;
};
