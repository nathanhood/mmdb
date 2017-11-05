module.exports = (sequelize, DataTypes) => {
    let Genre = sequelize.define('Genre', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        tmdbId: DataTypes.INTEGER.UNSIGNED
    });

    return Genre;
};
