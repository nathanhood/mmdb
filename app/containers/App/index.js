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
import Header from 'components/Header';
import theme from 'variables';
import { toggleSearchVisibility } from './actions';
import reducer from './reducer';
import injectReducer from 'utils/injectReducer';

const StyledContainer = styled.div`
    background: ${theme.backgroundColor};
    font: ${theme.font};
`;

class App extends React.PureComponent {
    static propTypes = {
        showSearch: PropTypes.bool.isRequired,
        toggleSearchVisibility: PropTypes.func.isRequired,
    };

    render() {
        /* eslint-disable no-shadow */
        const {
            toggleSearchVisibility,
            showSearch,
        } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <StyledContainer>
                    <Header showSearch={showSearch} toggleSearch={toggleSearchVisibility} />
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </StyledContainer>
            </ThemeProvider>
        );
    }
}

const withConnect = connect(
    (state) => ({
        showSearch: state.app.showSearch,
    }),
    (dispatch) => ({
        toggleSearchVisibility: () => dispatch(toggleSearchVisibility())
    })
);

const withReducer = injectReducer({ key: 'app', reducer });

export default compose(
    withReducer,
    withConnect,
)(App);
