const _ = require('lodash');
const formatApiResponse = require('../utils/formatApiResponse');
const { createTransformMany } = require('./utils');

const transformUser = ({
    username,
    firstName,
    lastName,
    token,
}) => {
    const user = {
        username,
        firstName,
        lastName,
    };

    if (token) {
        user.token = token;
    }

    return user;
};

module.exports = {
    transformOne: transformUser,
    transformMany: _.flow(createTransformMany('users', transformUser), formatApiResponse.forMany),
};
