import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Header from 'components/Header';
import injectReducer from 'utils/injectReducer';
import makeSelectHeaderContainer from './selectors';
import reducer from './reducer';

export class HeaderContainer extends React.PureComponent {
    render() {
        return (
            <div>
                <Header />
            </div>
        );
    }
}

HeaderContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    headercontainer: makeSelectHeaderContainer(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'headerContainer', reducer });

export default compose(
    withReducer,
    withConnect,
)(HeaderContainer);
