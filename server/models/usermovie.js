module.exports = (sequelize, DataTypes) => {
    let UserMovie = sequelize.define('UserMovie', {
        userId: DataTypes.INTEGER.UNSIGNED,
        movieId: DataTypes.INTEGER.UNSIGNED,
        format: DataTypes.STRING,
        definition: DataTypes.STRING,
        isFavorite: DataTypes.BOOLEAN,
    });

    UserMovie.associate = function(models) {
        this.belongsTo(models.Movie);
        this.belongsTo(models.User);
    };

    return UserMovie;
};
