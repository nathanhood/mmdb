const moment = require('moment');

module.exports = {
    toSQLDateTime: (dateTime) => moment(dateTime).format('YYYY-MM-DD HH:mm:ss'),
};
