const { NOT_FOUND_STATUS } = require('../constants/httpStatus');

const error = (message) => ({ message });

const success = () => ({ success: true });

const notFound = (res, message = 'Resource not found') => {
    return res.status(NOT_FOUND_STATUS).json(error(message));
};

module.exports = {
    error,
    success,
    notFound,
};
