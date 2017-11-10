module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Users', [{
            firstName: 'Nathan',
            lastName: 'Hood',
            email: 'nathanhood@me.com',
            password: 'password',
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
