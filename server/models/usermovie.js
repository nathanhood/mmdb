'use strict';
module.exports = (sequelize, DataTypes) => {
  var userMovie = sequelize.define('userMovie', {
    userId: DataTypes.INTEGER.UNSIGNED,
    movieId: DataTypes.INTEGER.UNSIGNED
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userMovie;
};