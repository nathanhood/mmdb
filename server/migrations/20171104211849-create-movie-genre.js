module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('MovieGenres', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            movieId: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            genreId: {
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
        return queryInterface.dropTable('MovieGenres');
    }
};
