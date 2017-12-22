import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Redirect } from 'react-router-dom';


class ProtectedRoute extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        component: PropTypes.func,
    };

    render() {
        const {
            isAuthenticated,
            component: Component,
            ...rest,
        } = this.props;

        return (
            <Route
              {...rest}
              render={(props) => {
                  return isAuthenticated ?
                      <Component {...rest} /> :
                      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
              }}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

const withConnect = connect(mapStateToProps, null);

export default compose(
    withConnect,
)(ProtectedRoute);
