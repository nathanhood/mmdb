import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import feather from 'feather-icons';
import theme from 'theme';
import PosterImage from 'components/PosterImage';
import Icon from 'components/Icon';
import themeVars from 'variables';
import { formatYear } from 'utils/datetime';

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.h2`
    margin-top: 6px;
    margin-bottom: 8px;
    font-family: ${theme.font};
    font-size: 19px;
`;

const PosterContainer = styled.div`
    flex: 1 1 auto;
    width: 15%;
`;

const InfoContainer = styled.div`
    position: relative;
    flex: 1 1 calc(85% - 40px);
    padding-left: 20px;
`;

const ActionsContainer = styled.div`
    padding-left: 15px;
    flex: 1 0 77px;
`;

const ReleaseDate = styled.div`
    color: ${theme.gray};
    font-family: ${theme.font};
    font-weight: 300;
    font-size: 13px;
    margin-bottom: 4px;
`;

const SearchCard = ({ title, poster, releaseDate, isOwned, isFavorite }) => {
    return (
        <Container>
            <PosterContainer>
                <PosterImage images={poster.sizes} alt={poster.altText} />
            </PosterContainer>
            <InfoContainer>
                <Title>{title}</Title>
                <ReleaseDate>{formatYear(releaseDate)}</ReleaseDate>
            </InfoContainer>
            <ActionsContainer>
                <Icon
                  icon={feather.icons.star}
                  size={22}
                  color={isFavorite ? themeVars.wishYellow : themeVars.gray}
                  fill={isFavorite ? themeVars.wishYellow : themeVars.white}
                />
                <Icon
                  icon={feather.icons['plus-circle']}
                  size={24}
                  spacing="15px"
                  color={isOwned ? themeVars.darkTeal : themeVars.gray}
                  fill={themeVars.white}
                  invert={isOwned}
                />
            </ActionsContainer>
        </Container>
    );
}

SearchCard.propTypes = {
    poster: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    isOwned: PropTypes.bool,
    isFavorite: PropTypes.bool,
};

export default SearchCard;
