module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('UserMovies', 'platform', {
            type: Sequelize.STRING,
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('UserMovies', 'platform');
    }
};
