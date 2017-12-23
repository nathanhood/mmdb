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

import Dashboard from '../DashboardPage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import RegisterPage from '../RegisterPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import theme from 'variables';
import reducer from './reducer';
import injectReducer from 'utils/injectReducer';
import ProtectedRoute from '../ProtectedRoute';
import {
    LOGIN_URL,
    DASHBOARD_URL,
    REGISTER_URL
} from '../../common/constants';

const StyledContainer = styled.div`
    background: ${theme.backgroundColor};
    font-family: ${theme.font};
    min-height: 100%;
`;

class App extends React.Component {
    static propTypes = {
        definitions: PropTypes.object.isRequired,
        formats: PropTypes.object.isRequired,
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

    render() {
        /* eslint-disable no-shadow */
        return (
            <ThemeProvider theme={theme}>
                <StyledContainer>
                    <Switch>
                        <Route path={LOGIN_URL} component={LoginPage} />
                        <Route path={REGISTER_URL} component={RegisterPage} />
                        <ProtectedRoute exact path={DASHBOARD_URL} component={Dashboard} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </StyledContainer>
            </ThemeProvider>
        );
    }
}

const withConnect = connect(
    (state) => ({
        formats: state.app.formats,
        definitions: state.app.definitions,
    })
);

const withReducer = injectReducer({ key: 'app', reducer });

export default compose(
    withReducer,
    withConnect,
)(App);
