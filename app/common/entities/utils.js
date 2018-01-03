/**
 * Merges raw API response with normalized entity structure of same response
 * with additional meta data. To be used as the output of any entity API retrieval.
 *
 * @param {object} apiResponse
 * @param {object} normalizedData
 * @param {object} meta
 */
export const combineResponse = (apiResponse, normalizedData, meta = {}) => ({
    raw: apiResponse,
    entities: normalizedData.entities,
    result: normalizedData.result,
    meta,
});
