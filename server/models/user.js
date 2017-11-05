module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.associate = function(models) {
        this.belongsToMany(models.Movie, { through: models.UserMovie });
    }

    // TODO: Temporary fix for table names on linux.  Sequalize
    // TODO: seems to want to use the capitalized table name
    User.tableName = 'users';

    return User;
};
