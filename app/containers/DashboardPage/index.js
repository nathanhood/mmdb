import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LibraryList from '../../components/LibraryList';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import { prepareMoviesForDashboard } from './thunks';
import FixedActionButton from '../../components/FixedActionButton';
import { STANDARD_SEARCH_TYPE } from '../../containers/SearchResults/constants';
import Header from '../../components/Header';
import SearchResults from '../SearchResults';
import MobileNav from '../../components/MobileNav';
import { showSearch, hideSearch } from '../SearchResults/actions';
import {
    prepareRecentFormats
} from '../App/thunks';
import {
    prepareSearchResults
} from '../SearchResults/thunks';
import { openMobileNav, closeMobileNav } from './actions';
import feather from 'feather-icons';


class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        library: PropTypes.array,
        isLoaded: PropTypes.bool,
        onLoad: PropTypes.func,
        searchIsVisible: PropTypes.bool.isRequired,
        searchResultsAreVisible: PropTypes.bool,
        showSearchHandler: PropTypes.func.isRequired,
        hideSearchHandler: PropTypes.func.isRequired,
        searchType: PropTypes.string,
        submitSearchHandler: PropTypes.func.isRequired,
        openMobileNavHandler: PropTypes.func,
        closeMobileNavHandler: PropTypes.func,
        mobileNavIsOpen: PropTypes.bool,
    };

    componentDidMount() {
        const { isLoaded, onLoad } = this.props;

        if (!isLoaded) {
            onLoad();
        }
    }

    render() {
        const {
            library,
            isLoaded,
            showSearchHandler,
            searchIsVisible,
            hideSearchHandler,
            searchType,
            submitSearchHandler,
            searchResultsAreVisible,
            openMobileNavHandler,
            closeMobileNavHandler,
            mobileNavIsOpen,
        } = this.props;
        let pageContent;

        if (!isLoaded) {
            return null;
        }

        if (searchResultsAreVisible) {
            pageContent = <SearchResults />
        } else {
            pageContent = (
                <div>
                    <LibraryList items={library} />
                    <FixedActionButton clickHandler={() => showSearchHandler(STANDARD_SEARCH_TYPE)} />
                </div>
            );
        }

        return (
            <div>
                <MobileNav
                    open={mobileNavIsOpen}
                    closeHandler={closeMobileNavHandler}
                    navItems={[
                        { display: 'Home', url: '/', icon: feather.icons.home },
                        { display: 'Logout', url: '/logout', icon: feather.icons['log-out'] },
                    ]}
                />
                <Header
                  searchIsVisible={searchIsVisible}
                  hideSearchHandler={hideSearchHandler}
                  showSearchHandler={showSearchHandler}
                  searchType={searchType}
                  submitSearchHandler={submitSearchHandler}
                  openMobileNavHandler={openMobileNavHandler}
                />

                {pageContent}
            </div>
        );
    }
}

const withConnect = connect(
    (state) => ({
        searchResultsAreVisible: state.search.resultsAreVisible,
        searchIsVisible: state.search.isVisible,
        searchType: state.search.searchType,
        library: state.dashboard.library,
        isLoaded: state.dashboard.isLoaded,
        mobileNavIsOpen: state.dashboard.mobileNavIsOpen,
    }),
    (dispatch) => ({
        onLoad: () => {
            dispatch(prepareMoviesForDashboard())
                .then(() => dispatch(prepareRecentFormats()));
        },
        showSearchHandler: (type) => dispatch(showSearch(type)),
        hideSearchHandler: () => {
            dispatch(hideSearch());
            dispatch(prepareMoviesForDashboard());
        },
        submitSearchHandler: (query) => {
            dispatch(prepareSearchResults(query));
        },
        openMobileNavHandler: () => {
            dispatch(openMobileNav());
        },
        closeMobileNavHandler: () => {
            dispatch(closeMobileNav());
        },
    })
);

const withReducer = injectReducer({ key: 'dashboard', reducer });

export default compose(
    withReducer,
    withConnect,
)(Dashboard);
