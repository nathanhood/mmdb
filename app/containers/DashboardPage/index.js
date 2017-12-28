import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import feather from 'feather-icons';
import { Helmet } from 'react-helmet';
import LibraryList from '../../components/LibraryList';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import {
    prepareMoviesForDashboard,
    favoriteMovie,
    unFavoriteMovie
} from './thunks';
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
import {
    LOGIN_URL,
    DASHBOARD_URL
} from '../../common/constants';
import { logOutUser } from '../../common/auth/thunks';


class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        library: PropTypes.array,
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
        logOutHandler: PropTypes.func,
        toggleFavoriteHandler: PropTypes.func,
    };

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        const {
            library,
            showSearchHandler,
            searchIsVisible,
            hideSearchHandler,
            searchType,
            submitSearchHandler,
            searchResultsAreVisible,
            openMobileNavHandler,
            closeMobileNavHandler,
            mobileNavIsOpen,
            logOutHandler,
            toggleFavoriteHandler,
        } = this.props;
        let pageContent;

        if (searchResultsAreVisible) {
            pageContent = <SearchResults />
        } else {
            pageContent = (
                <div>
                    <LibraryList items={library} favoriteHandler={toggleFavoriteHandler} />
                    <FixedActionButton clickHandler={() => showSearchHandler(STANDARD_SEARCH_TYPE)} />
                </div>
            );
        }

        return (
            <div>
                <Helmet>
                    <title>Dashboard | MMDb</title>
                    <meta name="description" content="My movie database" />
                </Helmet>

                <MobileNav
                    open={mobileNavIsOpen}
                    closeHandler={closeMobileNavHandler}
                    navItems={[
                        { display: 'Home', url: DASHBOARD_URL, icon: feather.icons.home },
                        { display: 'Logout', url: LOGIN_URL, onClickHandler: logOutHandler, icon: feather.icons['log-out'] },
                    ]}
                />
                <Header
                    searchIsVisible={searchIsVisible}
                    hideSearchHandler={hideSearchHandler}
                    showSearchHandler={showSearchHandler}
                    searchType={searchType}
                    submitSearchHandler={(query) => submitSearchHandler(query, searchType)}
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
        submitSearchHandler: (query, searchType) => {
            dispatch(prepareSearchResults(query, searchType));
        },
        openMobileNavHandler: () => {
            dispatch(openMobileNav());
        },
        closeMobileNavHandler: () => {
            dispatch(closeMobileNav());
        },
        logOutHandler: () => {
            dispatch(closeMobileNav());
            dispatch(logOutUser());
        },
        toggleFavoriteHandler: ({ isFavorite, id }) => {
            if (isFavorite) {
                dispatch(unFavoriteMovie(id))
            } else {
                dispatch(favoriteMovie(id));
            }
        },
    })
);

const withReducer = injectReducer({ key: 'dashboard', reducer });

export default compose(
    withReducer,
    withConnect,
)(Dashboard);
