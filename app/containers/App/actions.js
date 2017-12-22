export const POPULATE_RECENT_FORMATS = 'app/POPULATE_RECENT_FORMATS';

export const populateRecentFormats = (recentFormats) => ({
    type: POPULATE_RECENT_FORMATS,
    payload: recentFormats,
});
