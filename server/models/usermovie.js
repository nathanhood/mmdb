module.exports = (sequelize, DataTypes) => {
    let UserMovie = sequelize.define('UserMovie', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: DataTypes.INTEGER.UNSIGNED,
        movieId: DataTypes.INTEGER.UNSIGNED,
        format: DataTypes.STRING,
        definition: DataTypes.STRING,
        platform: DataTypes.STRING,
        isFavorite: DataTypes.BOOLEAN,
    });

    UserMovie.associate = function(models) {
        this.belongsTo(models.Movie);
        this.belongsTo(models.User);
    };

    return UserMovie;
};
