import formats from '../server/constants/formats';
import definitions from '../server/constants/definitions';

export default {
    app: {
        searchIsVisible: false,
        searchResults: [],
        recentFormats: [],
        formats,
        definitions,
    },
    dashboard: {
        isLoaded: process.env.NODE_ENV === 'production',
        library: [],
    }
};
