module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Wishlists', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            movieId: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            order: {
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
    down: (queryInterface) => {
        return queryInterface.dropTable('Wishlists');
    }
};
