'use strict';
module.exports = (sequelize, DataTypes) => {
  var MovieGenre = sequelize.define('movieGenre', {
    movieId: DataTypes.INTEGER.UNSIGNED,
    genreId: DataTypes.INTEGER.UNSIGNED
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MovieGenre;
};
