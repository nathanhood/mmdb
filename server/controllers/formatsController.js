const formats = require('../constants/formats');
const formatTransformer = require('../transformers/formatTransformer');
const paginate = require('../utils/pagination')();


const index = async (req, res) => {
    const pagination = await paginate(Promise.resolve(formats.length), 1);

    return res.json(formatTransformer.transformMany({ ...pagination, formats }));
};

module.exports = {
    index,
};
