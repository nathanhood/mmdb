module.exports = (sequelize, DataTypes) => {
    let Company = sequelize.define('Company', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        headquarters: DataTypes.STRING,
        homepage: DataTypes.STRING,
        logoId: DataTypes.INTEGER.UNSIGNED,
        parentId: DataTypes.INTEGER.UNSIGNED
    });

    Company.associate = function(models) {
        // TODO: Company associations
    };

    return Company;
};
