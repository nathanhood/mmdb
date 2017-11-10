module.exports = (sequelize, DataTypes) => {
    let Person = sequelize.define('Person', {
        tmdbId: DataTypes.INTEGER.UNSIGNED,
        imdbId: DataTypes.STRING,
        name: DataTypes.STRING,
        birthday: DataTypes.DATE,
        deathday: DataTypes.DATE,
        biography: DataTypes.TEXT,
        birthPlace: DataTypes.STRING,
        profileId: DataTypes.INTEGER.UNSIGNED,
        gender: DataTypes.TINYINT.UNSIGNED
    });

    Person.associate = function(models) {
        // TODO: Person relationship
    };

    return Person;
};
