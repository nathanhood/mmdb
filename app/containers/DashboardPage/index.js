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
    removeFromLibrary,
    prepareFormatsForDashboard,
} from './thunks';
import { selectPaginatedLibraryResource } from './selectors';
import FixedActionButton from '../../components/FixedActionButton';
import { STANDARD_SEARCH_TYPE } from '../../containers/SearchResults/constants';
import Header from '../../components/Header';
import SearchResults from '../SearchResults';
import MobileNav from '../../components/MobileNav';
import SubMenu from '../../components/SubMenu';
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
import ScrollPagination from '../../components/ScrollPagination';
import {
    paginationPropTypeShape,
    firstPageExists,
    lastPageExists,
    paginateLocation,
    getPreviousPage,
    getNextPage
} from '../../common/entities/pagination';
import BarLoader from '../../components/BarLoader';
import PageBreakHeading from '../../components/PageBreakHeading';


const LibraryContainer = styled.div`
    padding-bottom: 50px;
`;

class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        paginatedLibrary: paginationPropTypeShape,
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
        addNextPageToLibrary: PropTypes.func.isRequired,
        addPreviousPageToLibrary: PropTypes.func.isRequired,
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
            paginatedLibrary,
            addNextPageToLibrary,
            addPreviousPageToLibrary,
        } = this.props;
        let pageContent;

        if (searchResultsAreVisible) {
            pageContent = <SearchResults />;
        } else if (!paginatedLibrary) {
            // TODO: Finish loader (ScrollPagination as well)
        } else {
            pageContent = (
                <LibraryContainer>
                    <ScrollPagination
                        scrollOffset={300}
                        Loader={BarLoader}
                        scrolledToTopHandler={() => addPreviousPageToLibrary(getPreviousPage(paginatedLibrary))}
                        scrolledToBottomHandler={() => addNextPageToLibrary(getNextPage(paginatedLibrary))}
                        topIsDisabled={firstPageExists(paginatedLibrary)}
                        bottomIsDisabled={lastPageExists(paginatedLibrary)}
                    >
                        {paginatedLibrary.pageResult.map((pageId) => {
                            return (
                                <div key={`libraryPage${pageId}`}>
                                    {pageId === 1 ? null : <PageBreakHeading>Page {pageId}</PageBreakHeading>}
                                    <LibraryList
                                        items={paginatedLibrary.pages[pageId]}
                                        favoriteHandler={toggleFavoriteHandler}
                                        removeHandler={removeFromLibraryHandler}
                                    />
                                </div>
                            );
                        })}
                    </ScrollPagination>
                    <FixedActionButton clickHandler={() => showSearchHandler(STANDARD_SEARCH_TYPE)} />
                </LibraryContainer>
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
                {!searchIsVisible ? <SubMenu items={subMenuItems} /> : null}

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
        paginatedLibrary: selectPaginatedLibraryResource(state),
        mobileNavIsOpen: state.dashboard.mobileNavIsOpen,
        subMenuItems: state.dashboard.subMenu,
    }),
    (dispatch, { location }) => ({
        onLoad: () => {
            Promise.all([
                dispatch(prepareMoviesForDashboard(location)),
                dispatch(prepareMovieGenres()),
                dispatch(prepareFormatsForDashboard()),
            ]).then(() => {
                dispatch(prepareRecentFormats());
            });
        },
        refreshDashboard: (newLocation) => {
            dispatch(prepareMoviesForDashboard(newLocation));
        },
        addNextPageToLibrary: (currentPage) => {
            dispatch(paginateLocation(location, currentPage + 1));
        },
        addPreviousPageToLibrary: (currentPage) => {
            dispatch(paginateLocation(location, currentPage - 1));
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
    })
);

const withReducer = injectReducer({ key: 'dashboard', reducer });

export default compose(
    withReducer,
    withConnect,
)(Dashboard);
