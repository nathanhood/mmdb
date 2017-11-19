const moment = require('moment');

const toSQLDateTime = (dateTime) => moment(dateTime).format('YYYY-MM-DD HH:mm:ss');

module.exports = {
    toSQLDateTime,
};
