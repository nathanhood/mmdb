module.exports = (sequelize, DataTypes) => {
    let Shared = sequelize.define('Shared', {
        userId: DataTypes.INTEGER.UNSIGNED,
        movieId: DataTypes.INTEGER.UNSIGNED,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        sharedDate: DataTypes.DATE
    });

    Shared.associate = function(models) {
      // TODO: Shared relationships
    }

    return Shared;
};