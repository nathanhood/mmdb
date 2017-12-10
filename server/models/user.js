module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.associate = function(models) {
        this.belongsToMany(models.Movie, { through: models.UserMovie });
        this.hasMany(models.UserMovie);
    };

    return User;
};
