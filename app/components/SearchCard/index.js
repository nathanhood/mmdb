import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import feather from 'feather-icons';
import theme from 'theme';
import PosterImage from 'components/PosterImage';
import Icon from 'components/Icon';
import themeVars from 'variables';

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
    flex: 1 0 75px;
`;

const SearchCard = ({ title, poster }) => {
    return (
        <Container>
            <PosterContainer>
                <PosterImage images={poster.sizes} alt={poster.altText} />
            </PosterContainer>
            <InfoContainer>
                <Title>{title}</Title>
            </InfoContainer>
            <ActionsContainer>
                <Icon
                  icon={feather.icons.star}
                  color={themeVars.gray}
                />
                <Icon
                  icon={feather.icons['plus-circle']}
                  size={21}
                  spacing="15px"
                  color={themeVars.gray}
                />
            </ActionsContainer>
        </Container>
    );
}

SearchCard.propTypes = {
    poster: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

export default SearchCard;
