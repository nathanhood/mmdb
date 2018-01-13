export default {
    app: {
        recentFormats: [],
    },
    dashboard: {
        isLoaded: process.env.NODE_ENV === 'production',
        mobileNavIsOpen: false,
    },
    resourceCache: {},
    search: {
        isVisible: false,
        resultsAreVisible: false,
        results: [],
    }
};
