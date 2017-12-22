const createTransformMany = (resource, transformOne) => (data) => ({
    ...data,
    payload: data[resource].map((item) => transformOne(item)),
});

module.exports = {
    createTransformMany,
};
