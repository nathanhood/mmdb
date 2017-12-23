import formats from '../server/constants/formats';
import definitions from '../server/constants/definitions';

export default {
    app: {
        recentFormats: [],
        formats,
        definitions,
    },
    dashboard: {
        isLoaded: process.env.NODE_ENV === 'production',
        library: [],
        mobileNavIsOpen: false,
    },
    resourceCache: {},
    search: {
        isVisible: false,
        resultsAreVisible: false,
        results: [],
    }
};
