module.exports = (sequelize, DataTypes) => {
    let Image = sequelize.define('Image', {
        fileName: DataTypes.STRING,
        width: DataTypes.SMALLINT.UNSIGNED,
        height: DataTypes.SMALLINT.UNSIGNED,
        type: DataTypes.STRING,
        extension: DataTypes.STRING
    });

    return Image;
};
