import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import feather from 'feather-icons';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import LibraryList from '../../components/LibraryList';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import {
    prepareMoviesForDashboard,
    toggleFavorite,
    prepareMovieGenres,
    removeFromLibrary
} from './thunks';
import FixedActionButton from '../../components/FixedActionButton';
import { STANDARD_SEARCH_TYPE } from '../../containers/SearchResults/constants';
import Header from '../../components/Header';
import SearchResults from '../SearchResults';
import MobileNav from '../../components/MobileNav';
import SubMenu from '../../components/SubMenu';
import InfinityScrollEvent from '../../components/InfinityScrollEvent';
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


const LibraryContainer = styled.div`
    padding-bottom: 50px;
`;

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
        subMenuItems: PropTypes.array,
        refreshDashboard: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        removeFromLibraryHandler: PropTypes.func.isRequired,
        addNextPageToLibrary: PropTypes.func,
        addPreviousPageToLibrary: PropTypes.func,

    };

    static defaultProps = {
        subMenuItems: [],
    };

    componentDidMount() {
        this.props.onLoad();
    }

    componentWillReceiveProps({ location: newLocation }) {
        const { location: oldLocation } = this.props;

        // Only refresh dashboard if we have navigated
        // to different submenu link
        if (oldLocation !== newLocation) {
            this.props.refreshDashboard(newLocation);
        }
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
            subMenuItems,
            removeFromLibraryHandler,
            addNextPageToLibrary,
            addPreviousPageToLibrary,
        } = this.props;
        let pageContent;

        if (searchResultsAreVisible) {
            pageContent = (
                <SearchResults />
            );
        } else {
            pageContent = (
                <LibraryContainer>
                    <LibraryList
                        items={library}
                        favoriteHandler={toggleFavoriteHandler}
                        removeHandler={removeFromLibraryHandler}
                    />
                    <FixedActionButton clickHandler={() => showSearchHandler(STANDARD_SEARCH_TYPE)} />
                </LibraryContainer>
            );
        }

        return (
            <div>
                <InfinityScrollEvent
                    offset={500}
                    handleScrollTop={addPreviousPageToLibrary}
                    handleScrollBottom={addNextPageToLibrary}
                />
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
                <SubMenu items={subMenuItems} />

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
        subMenuItems: state.dashboard.subMenu,
    }),
    (dispatch, { location }) => ({
        onLoad: () => {
            Promise.all([
                dispatch(prepareMoviesForDashboard(location)),
                dispatch(prepareMovieGenres()),
            ]).then(() => dispatch(prepareRecentFormats()));
        },
        refreshDashboard: (newLocation) => {
            dispatch(prepareMoviesForDashboard(newLocation));
        },
        showSearchHandler: (type) => dispatch(showSearch(type)),
        hideSearchHandler: () => {
            dispatch(hideSearch());
            dispatch(prepareMoviesForDashboard(location));
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
        toggleFavoriteHandler: (movie) => {
            dispatch(toggleFavorite(movie));
        },
        removeFromLibraryHandler: (movie) => {
            dispatch(removeFromLibrary(movie));
        },
        addNextPageToLibrary: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        },
        addPreviousPageToLibrary: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        },
    })
);

const withReducer = injectReducer({ key: 'dashboard', reducer });

export default compose(
    withReducer,
    withConnect,
)(Dashboard);
