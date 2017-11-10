module.exports = (sequelize, DataTypes) => {
    let Rating = sequelize.define('Rating', {
        userId: DataTypes.INTEGER.UNSIGNED,
        movieId: DataTypes.INTEGER.UNSIGNED,
        rating: DataTypes.FLOAT
    });

    Rating.associate = function(models) {
        // TODO: Rating relationships
    };

    return Rating;
};
