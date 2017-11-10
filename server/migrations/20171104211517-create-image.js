module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Images', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fileName: {
                type: Sequelize.STRING
            },
            width: {
                type: Sequelize.SMALLINT.UNSIGNED
            },
            height: {
                type: Sequelize.SMALLINT.UNSIGNED
            },
            type: {
                type: Sequelize.STRING
            },
            extension: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Images');
    }
};
