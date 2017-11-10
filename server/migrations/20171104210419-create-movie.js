module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Movies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tmdbId: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            imdbId: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            slug: {
                type: Sequelize.STRING
            },
            overview: {
                type: Sequelize.TEXT
            },
            tagline: {
                type: Sequelize.TEXT
            },
            releaseDate: {
                type: Sequelize.DATE
            },
            posterId: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            backdropId: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            rating: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            runtime: {
                type: Sequelize.TINYINT
            },
            revenue: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            budget: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            language: {
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
        return queryInterface.dropTable('Movies');
    }
};
