export default {
    app: {
        searchIsVisible: false,
        searchResults: [],
    },
    dashboard: {
        isLoaded: process.env.NODE_ENV === 'production',
        library: [],
    }
};
