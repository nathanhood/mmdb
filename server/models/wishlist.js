module.exports = (sequelize, DataTypes) => {
    let Wishlist = sequelize.define('Wishlist', {
        userId: DataTypes.INTEGER.UNSIGNED,
        movieId: DataTypes.INTEGER.UNSIGNED,
        order: DataTypes.INTEGER.UNSIGNED
    });

    Wishlist.associate = function(models) {
        // TODO: Wishlist relationships
    };

    return Wishlist;
};