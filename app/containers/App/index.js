/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import Dashboard from 'containers/Dashboard/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from '../../components/Header';
import SearchResults from '../../components/SearchResults';
import theme from 'variables';
import { showSearch, hideSearch } from './actions';
import {
    prepareSearchResults,
    addMovieToLibrary,
    removeMovieFromLibrary,
    prepareRecentFormats,
} from './thunks';
import reducer from './reducer';
import injectReducer from 'utils/injectReducer';
import { prepareMoviesForDashboard } from '../Dashboard/thunks';
import { markDashboardDirty } from '../../common/actions';

const StyledContainer = styled.div`
    background: ${theme.backgroundColor};
    font-family: ${theme.font};
    min-height: 100%;
`;

class App extends React.PureComponent {
    static propTypes = {
        searchIsVisible: PropTypes.bool.isRequired,
        showSearch: PropTypes.func.isRequired,
        hideSearch: PropTypes.func.isRequired,
        searchType: PropTypes.string,
        submitSearch: PropTypes.func.isRequired,
        searchResultsAreVisible: PropTypes.bool,
        searchResults: PropTypes.array,
        addMovieToLibrary: PropTypes.func.isRequired,
        removeMovieFromLibrary: PropTypes.func.isRequired,
        formats: PropTypes.object.isRequired,
        definitions: PropTypes.object.isRequired,
        prepareRecentFormats: PropTypes.func.isRequired,
        recentFormats: PropTypes.array,
    };

    static childContextTypes = {
        formats: PropTypes.object,
        definitions: PropTypes.object,
    };

    getChildContext() {
        return {
            formats: this.props.formats,
            definitions: this.props.definitions,
        };
    }

    componentDidMount() {
        this.props.prepareRecentFormats();
    }

    render() {
        /* eslint-disable no-shadow */
        const {
            showSearch,
            hideSearch,
            searchIsVisible,
            searchType,
            submitSearch,
            searchResultsAreVisible,
            searchResults,
            addMovieToLibrary,
            removeMovieFromLibrary,
            recentFormats,
        } = this.props;
        let pageContent;

        if (searchResultsAreVisible) {
            pageContent = (
                <SearchResults
                  items={searchResults}
                  addMovieToLibrary={addMovieToLibrary}
                  removeMovieFromLibrary={removeMovieFromLibrary}
                  recentFormats={recentFormats}
                />
            );
        } else {
            pageContent = (
                <Switch>
                    <Route exact path="/" render={() => <Dashboard showSearch={showSearch} />} />
                    <Route component={NotFoundPage} />
                </Switch>
            );
        }

        return (
            <ThemeProvider theme={theme}>
                <StyledContainer>
                    <Header
                      searchIsVisible={searchIsVisible}
                      hideSearch={hideSearch}
                      showSearch={showSearch}
                      searchType={searchType}
                      submitSearch={submitSearch}
                    />

                    {pageContent}
                </StyledContainer>
            </ThemeProvider>
        );
    }
}

const withConnect = connect(
    (state) => ({
        searchIsVisible: state.app.searchIsVisible,
        searchType: state.app.searchType,
        searchResultsAreVisible: state.app.searchResultsAreVisible,
        PageComponent: state.app.PageComponent,
        searchResults: state.app.searchResults,
        formats: state.app.formats,
        definitions: state.app.definitions,
        recentFormats: state.app.recentFormats,
    }),
    (dispatch) => ({
        showSearch: (type) => dispatch(showSearch(type)),
        hideSearch: () => {
            dispatch(hideSearch());
            dispatch(prepareMoviesForDashboard());
        },
        submitSearch: (query) => {
            dispatch(prepareSearchResults(query));
        },
        addMovieToLibrary: (data) => {
            dispatch(addMovieToLibrary(data))
            dispatch(markDashboardDirty());
        },
        removeMovieFromLibrary: (id) => {
            dispatch(removeMovieFromLibrary(id));
            dispatch(markDashboardDirty());
        },
        prepareRecentFormats: () => dispatch(prepareRecentFormats()),
    })
);

const withReducer = injectReducer({ key: 'app', reducer });

export default compose(
    withReducer,
    withConnect,
)(App);
