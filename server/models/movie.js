module.exports = (sequelize, DataTypes) => {
    let Movie = sequelize.define('Movie', {
        tmdbId: DataTypes.INTEGER.UNSIGNED,
        imdbId: DataTypes.STRING,
        title: DataTypes.STRING,
        slug: DataTypes.STRING,
        overview: DataTypes.TEXT,
        tagline: DataTypes.TEXT,
        releaseDate: DataTypes.DATE,
        posterId: DataTypes.INTEGER.UNSIGNED,
        backdropId: DataTypes.INTEGER.UNSIGNED,
        rating: DataTypes.STRING,
        status: DataTypes.STRING,
        runtime: DataTypes.TINYINT,
        revenue: DataTypes.INTEGER.UNSIGNED,
        budget: DataTypes.INTEGER.UNSIGNED,
        language: DataTypes.STRING
    });

    Movie.associate = function(models) {
        this.belongsToMany(models.User, { through: models.UserMovie });
        this.belongsToMany(models.Genre, { through: models.MovieGenre });
    };

    return Movie;
};
