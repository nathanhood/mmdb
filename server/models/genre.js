'use strict';
module.exports = (sequelize, DataTypes) => {
    var Genre = sequelize.define('Genre', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        tmdbId: DataTypes.INTEGER.UNSIGNED
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Genre;
};
