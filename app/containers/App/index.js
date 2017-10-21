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
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Dashboard from 'containers/Dashboard/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import theme from '../../variables';
import { toggleSearch } from './actions';

function App(props) {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Header toggleSearch={props.searchVisibility} />
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </ThemeProvider>
    );
}

App.propTypes = {
    // showSearch: PropTypes.bool,
    searchVisibility: PropTypes.func,
};

const WithConnect = connect(
    (state) => ({
        showSearch: state.showSearch,
    }),
    (dispatch) => ({
        searchVisibility: () => dispatch(toggleSearch()),
    }),
);

export default compose(WithConnect)(App);
