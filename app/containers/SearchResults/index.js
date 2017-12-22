import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import theme from '../../theme';
import {
    addMovieToLibrary,
    removeMovieFromLibrary
} from './thunks';
import { markDashboardDirty } from '../../common/resourceCache/actions';
import ListContainer from '../../components/ListContainer';
import Card from '../../components/Card';
import SearchCard from '../../components/SearchCard';

const StyledContainer = styled.div`
    background: ${theme.backgroundColor};
    height: calc(100% - ${theme.headerHeight});
    position: fixed;
    overflow: scroll;
    left: 0;
    right: 0;
    z-index: 99;
`;

class SearchResults extends React.Component {
    static propTypes = {
        results: PropTypes.array.isRequired,
        addMovieToLibraryHandler: PropTypes.func.isRequired,
        removeMovieFromLibraryHandler: PropTypes.func.isRequired,
        recentFormats: PropTypes.array,
    };

    static defaultProps = {
        results: [],
    };

    render() {
        const {
            results,
            addMovieToLibraryHandler,
            removeMovieFromLibraryHandler,
            recentFormats
        } = this.props;

        return (
            <StyledContainer>
                <ListContainer>
                    {results.map((item) => (
                        <Card key={item.id.toString() + item.apiId.toString()}>
                            <SearchCard
                                id={item.id}
                                apiId={item.apiId}
                                title={item.title}
                                poster={item.images.poster}
                                releaseDate={item.releaseDate}
                                isOwned={item.isOwned}
                                addToLibraryHandler={addMovieToLibraryHandler}
                                removeFromLibraryHandler={removeMovieFromLibraryHandler}
                                recentFormats={recentFormats}
                            />
                        </Card>
                    ))}
                </ListContainer>
            </StyledContainer>
        );
    }
}

const withConnect = connect(
    (state) => ({
        results: state.search.results,
        recentFormats: state.app.recentFormats,
    }),
    (dispatch) => ({
        addMovieToLibraryHandler: (data) => {
            dispatch(addMovieToLibrary(data))
            dispatch(markDashboardDirty());
        },
        removeMovieFromLibraryHandler: (id) => {
            dispatch(removeMovieFromLibrary(id));
            dispatch(markDashboardDirty());
        },
    })
);

const withReducer = injectReducer({ key: 'search', reducer });

export default compose(
    withConnect,
    withReducer,
)(SearchResults);
