import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import feather from 'feather-icons';
import theme from '../../theme';
import Icon from '../Icon';
import PosterImage from '../PosterImage';
import themeVars from '../../variables';
import { formatYear } from '../../utils/datetime';

const Container = styled.div`
    display: flex;
    align-items: stretch;
`;

const InfoContainer = styled.div`
    position: relative;
    flex: 1 1 66%;
    padding-left: 20px;
`;

const PosterContainer = styled.div`
    flex: 1 1 auto;
    width: 33%;
`;

const Title = styled.h2`
    margin-top: 6px;
    margin-bottom: 8px;
    font-family: ${theme.font};
    font-size: 19px;
`;

const ReleaseDate = styled.div`
    color: ${theme.gray};
    font-family: ${theme.font};
    font-weight: 300;
    font-size: 13px;
    padding-right: 15px;
`;

const Genre = styled.span`
    color: ${theme.teal};
    font-family: ${theme.font};
    font-size: 14px;
`;

const ActionBar = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: flex-end;
    padding-right: 5px;
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;
`;

function MovieCard({ poster, title, releaseDate, isFavorite, genres, definition }, { definitions }) {
    const icon = definitions.movie[definition].icon;
    let DefinitionIcon = null;

    if (icon) {
        DefinitionIcon = <Icon size="20" viewBox="0 0 128 80" icon={icon} />
    }

    return (
        <Container>
            <PosterContainer>
                <PosterImage images={poster.sizes} alt={poster.altText} />
            </PosterContainer>
            <InfoContainer>
                {genres.map((genre, i) => (
                    <Genre key={genre.id}>{i === genres.length - 1 ? genre.name : `${genre.name} | `}</Genre>
                ))}
                <Title>{title}</Title>
                <InfoRow>
                    <ReleaseDate>{formatYear(releaseDate)}</ReleaseDate>
                    {DefinitionIcon}
                </InfoRow>
                <ActionBar>
                    <Icon
                      size={18}
                      fill={isFavorite ? themeVars.loveRed : 'none'}
                      color={isFavorite ? themeVars.loveRed : themeVars.gray}
                      icon={feather.icons.heart}
                    />
                </ActionBar>
            </InfoContainer>
        </Container>
    );
}

MovieCard.contextTypes = {
    definitions: PropTypes.object,
};

MovieCard.propTypes = {
    poster: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    genres: PropTypes.array.isRequired,
    isFavorite: PropTypes.bool,
    definition: PropTypes.string.isRequired,
};

export default MovieCard;
