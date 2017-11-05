'use strict';
module.exports = (sequelize, DataTypes) => {
    var Image = sequelize.define('Image', {
        fileName: DataTypes.STRING,
        width: DataTypes.SMALLINT.UNSIGNED,
        height: DataTypes.SMALLINT.UNSIGNED,
        type: DataTypes.STRING,
        extension: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Image;
};
