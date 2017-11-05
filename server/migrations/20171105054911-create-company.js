module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Companies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            headquarters: {
                type: Sequelize.STRING
            },
            homepage: {
                type: Sequelize.STRING
            },
            logoId: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            parentId: {
                type: Sequelize.INTEGER.UNSIGNED
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Companies');
    }
};