import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardList from 'components/CardList';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { prepareMoviesForDashboard } from './thunks';
import FixedActionButton from 'components/FixedActionButton';
import { REGULAR_SEARCH_TYPE } from 'containers/App/constants';

class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        library: PropTypes.array,
        isLoaded: PropTypes.bool,
        onLoad: PropTypes.func,
        showSearch: PropTypes.func,
    };

    constructor(props) {
        super(props);

        if (!props.isLoaded) {
            props.onLoad();
        }
    }

    render() {
        const { library, isLoaded, showSearch } = this.props;

        if (!isLoaded) {
            return null;
        }

        return (
            <div>
                <CardList items={library} />
                <FixedActionButton clickHandler={() => showSearch(REGULAR_SEARCH_TYPE)} />
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
