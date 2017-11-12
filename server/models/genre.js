module.exports = (sequelize, DataTypes) => {
    let Genre = sequelize.define('Genre', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        tmdbId: DataTypes.INTEGER.UNSIGNED
    });

    Genre.associate = function(models) {
        this.belongsToMany(models.Movie, { through: models.MovieGenre });
    };

    return Genre;
};
