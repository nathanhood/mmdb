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
    removeMovieFromLibrary,
    toggleFavorite
} from './thunks';
import { removeFromSearchResult } from './actions';
import { markDashboardDirty } from '../../common/resourceCache/actions';
import ListContainer from '../../components/ListContainer';
import Card from '../../components/Card';
import SearchCard from '../../components/SearchCard';
import MovieCard from '../../components/MovieCard';
import { LIBRARY_SEARCH_TYPE } from './constants';


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
        removeFromLibraryHandler: PropTypes.func.isRequired,
        removeFromSearchAndLibraryHandler: PropTypes.func.isRequired,
        toggleFavoriteHandler: PropTypes.func.isRequired,
        recentFormats: PropTypes.array,
        searchType: PropTypes.string,
    };

    static defaultProps = {
        results: [],
    };

    render() {
        const {
            results,
            addMovieToLibraryHandler,
            removeFromLibraryHandler,
            recentFormats,
            searchType,
            removeFromSearchAndLibraryHandler,
            toggleFavoriteHandler,
        } = this.props;
        let Results;

        if (searchType === LIBRARY_SEARCH_TYPE) {
            Results = (
                <ListContainer>
                    {results.map((item) => (
                        <Card key={item.id.toString() + item.apiId.toString()}>
                            <MovieCard
                                id={item.id}
                                title={item.title}
                                poster={item.images.poster}
                                releaseDate={item.releaseDate}
                                isFavorite={item.isFavorite}
                                definition={item.definition}
                                genres={item.Genres}
                                clickHeartHandler={() => toggleFavoriteHandler(item)}
                                clickTrashHandler={() => removeFromSearchAndLibraryHandler(item)}
                            />
                        </Card>
                    ))}
                </ListContainer>
            );
        } else {
            Results = (
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
                                removeFromLibraryHandler={() => removeFromLibraryHandler(item)}
                                recentFormats={recentFormats}
                            />
                        </Card>
                    ))}
                </ListContainer>
            );
        }

        return (
            <StyledContainer>
                {Results}
            </StyledContainer>
        );
    }
}

const withConnect = connect(
    (state) => ({
        results: state.search.results,
        recentFormats: state.app.recentFormats,
        searchType: state.search.searchType,
    }),
    (dispatch) => ({
        addMovieToLibraryHandler: (data) => {
            dispatch(addMovieToLibrary(data));
            dispatch(markDashboardDirty());
        },
        removeFromLibraryHandler: (movie) => {
            dispatch(removeMovieFromLibrary(movie));
        },
        removeFromSearchAndLibraryHandler: (movie) => {
            dispatch(removeFromSearchResult(movie.id));
            dispatch(removeMovieFromLibrary(movie));
        },
        toggleFavoriteHandler: (movie) => {
            dispatch(toggleFavorite(movie));
        },
    })
);

const withReducer = injectReducer({ key: 'search', reducer });

export default compose(
    withConnect,
    withReducer,
)(SearchResults);
