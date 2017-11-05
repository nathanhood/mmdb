module.exports = (sequelize, DataTypes) => {
    let userMovie = sequelize.define('UserMovie', {
        userId: DataTypes.INTEGER.UNSIGNED,
        movieId: DataTypes.INTEGER.UNSIGNED
    });
    
    return userMovie;
};
