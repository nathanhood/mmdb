module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UserMovies', {
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
            format: {
                type: Sequelize.STRING
            },
            definition: {
                type: Sequelize.STRING
            },
            isFavorite: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
        return queryInterface.dropTable('UserMovies');
    }
};
