import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import feather from 'feather-icons';
import theme from '../../theme';
import Icon from '../Icon';
import PosterImage from '../PosterImage';
import themeVars from '../../variables';
import {
    formatYear,
    fromMinutesToHoursAndMinutes
} from '../../utils/datetime';


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
    font-size: 17px;
`;

const ReleaseDate = styled.div`
    color: ${theme.gray};
    font-family: ${theme.font};
    font-weight: 300;
    font-size: 12px;
    padding-right: 7px;
`;

const Runtime = styled(ReleaseDate)`
    padding-left: 7px;
    padding-right: 0;
    position: relative;
    &::before {
        content: '|';
        position: absolute;
        left: 0;
    }
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

const ActionBarItem = styled.div`
    padding-left: ${({ spaced, spacedLeft }) => spaced || spacedLeft ? '7px' : 0};
    padding-right: ${({ spaced, spacedRight }) => spaced || spacedRight ? '7px' : 0};
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const PlatformLogo = styled.img`
    max-height: 15px;
`;

function MovieCard({
    poster,
    title,
    releaseDate,
    isFavorite,
    genres,
    format,
    definition,
    platform,
    runtime,
    clickHeartHandler,
    clickTrashHandler,
}) {
    const formatIcon = format.value === 'digital' ? feather.icons.cloud : feather.icons.disc;
    const Definition = definition.icon ?
        <Icon size="20" viewBox="0 0 128 80" spacing="10px" icon={definition.icon} /> :
        null;
    const platformLogo = platform ?
        <PlatformLogo alt={platform.display} src={platform.logo} /> :
        null;
    const formattedRuntime = runtime ? <Runtime>{fromMinutesToHoursAndMinutes(runtime)}</Runtime> : null;

    return (
        <Container>
            <PosterContainer>
                <PosterImage images={poster.sizes} alt={poster.altText} />
            </PosterContainer>
            <InfoContainer>
                {genres.slice(0, 2).map((genre, i) => (
                    <Genre key={genre.id}>
                        {i >= 1 || genres.length === 1 ? genre.name : `${genre.name} | `}
                    </Genre>
                ))}
                <Title>{title}</Title>
                <InfoRow>
                    <ReleaseDate>{formatYear(releaseDate)}</ReleaseDate>
                    {formattedRuntime}
                    <Icon icon={formatIcon} spacing="10px" size="15" />
                    {Definition}
                </InfoRow>
                <InfoRow>
                    {platformLogo}
                </InfoRow>
                <ActionBar>
                    <ActionBarItem spacedRight>
                        <Icon
                            icon={feather.icons['trash-2']}
                            color={themeVars.gray}
                            onClick={clickTrashHandler}
                        />
                    </ActionBarItem>
                    <ActionBarItem spacedLeft>
                        <Icon
                            fill={isFavorite ? themeVars.loveRed : 'none'}
                            color={isFavorite ? themeVars.loveRed : themeVars.gray}
                            icon={feather.icons.heart}
                            onClick={clickHeartHandler}
                        />
                    </ActionBarItem>
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
    definition: PropTypes.object.isRequired,
    platform: PropTypes.object,
    format: PropTypes.object.isRequired,
    runtime: PropTypes.number.isRequired,
    clickHeartHandler: PropTypes.func.isRequired,
    clickTrashHandler: PropTypes.func.isRequired,
};

export default MovieCard;
