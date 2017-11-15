import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardList from 'components/CardList';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { prepareMoviesForDashboard } from './thunks';

class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        library: PropTypes.array,
        isLoaded: PropTypes.bool,
        onLoad: PropTypes.func,
    };

    constructor(props) {
        super(props);
        props.onLoad();
    }

    render() {
        const { library, isLoaded } = this.props;

        if (!isLoaded) {
            return null;
        }

        return (
            <div>
                <CardList items={library} />
            </div>
        );
    }
}

const withConnect = connect(
    (state) => ({
        library: state.dashboard.library,
        isLoaded: state.dashboard.isLoaded,
    }),
    (dispatch) => ({
        onLoad: () => dispatch(prepareMoviesForDashboard()),
    })
);

const withReducer = injectReducer({ key: 'dashboard', reducer });

export default compose(
    withReducer,
    withConnect,
)(Dashboard);
