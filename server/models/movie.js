'use strict';
module.exports = (sequelize, DataTypes) => {
  var Movie = sequelize.define('movie', {
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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Movie;
};
