module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('people', {
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
            name: {
                type: Sequelize.STRING
            },
            birthday: {
                type: Sequelize.DATE
            },
            deathday: {
                type: Sequelize.DATE
            },
            biography: {
                type: Sequelize.TEXT
            },
            birthPlace: {
                type: Sequelize.STRING
            },
            profileId: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            gender: {
                type: Sequelize.TINYINT.UNSIGNED
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
        return queryInterface.dropTable('people');
    }
};