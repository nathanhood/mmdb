import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import feather from 'feather-icons';
import moment from 'moment/moment';
import theme from 'theme';
import Icon from 'components/Icon';
import themeVars from 'variables';

const Container = styled.div`
    background: ${theme.white};
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

const PosterImage = styled.img`
    height: auto;
    width: 100%;
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
    margin-bottom: 4px;
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

function MovieCard({ imageUrl, title, releaseDate, isFavorite, genres }) {
    return (
        <Container>
            <PosterContainer>
                <PosterImage src={imageUrl} alt="" />
            </PosterContainer>
            <InfoContainer>
                {genres.map((genre, i) => (
                    <Genre key={genre.id}>{i === genres.length - 1 ? genre.name : `${genre.name} | `}</Genre>
                ))}
                <Title>{title}</Title>
                <ReleaseDate>{moment(releaseDate).format('YYYY')}</ReleaseDate>
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

MovieCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    genres: PropTypes.array.isRequired,
    isFavorite: PropTypes.bool,
};

export default MovieCard;
