import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import feather from 'feather-icons';
import theme from 'theme';
import PosterImage from '../PosterImage';
import Icon from '../Icon';
import themeVars from 'variables';
import { formatYear } from 'utils/datetime';
import Select from '../Form/Select';

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

class SearchCard extends React.PureComponent {
    static propTypes = {
        id: PropTypes.number,
        apiId: PropTypes.number.isRequired,
        poster: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        releaseDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        isOwned: PropTypes.bool,
        isFavorite: PropTypes.bool,
        addToLibraryHandler: PropTypes.func.isRequired,
        removeFromLibraryHandler: PropTypes.func.isRequired,
    };

    state = {
        askForFormat: false,
        format: null,
    };

    _askForFormat = () => {
        this.setState((prevState) => ({
            ...prevState,
            askForFormat: true,
        }));
    };

    _resetCard = () => {
        this.setState((prevState) => ({
            ...prevState,
            askForFormat: false,
        }));
    };

    render() {
        const {
            id,
            apiId,
            title,
            poster,
            releaseDate,
            isOwned,
            isFavorite,
            addToLibraryHandler,
            removeFromLibraryHandler,
        } = this.props;

        if (this.state.askForFormat) {
            return (
                <Container>
                    <Select
                      id="format"
                      options={[
                          { display: 'Amazon', value: 'amazon' },
                          { display: 'Google Play', value: 'google-play' },
                          { display: 'iTunes', value: 'itunes' },
                          { display: 'DVD', value: 'dvd' },
                          { display: 'Blu-ray', value: 'blu-ray' },
                          { display: '4k UltraHD', value: '4k-blu-ray' },
                      ]}
                      placeholder="Format"
                      onChange={(e) => {
                          addToLibraryHandler({
                              id: apiId,
                              format: e.target.value,
                          });

                          this._resetCard();
                      }}
                    />
                </Container>
            );
        }

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
                      onClick={() => isOwned ? removeFromLibraryHandler(id) : this._askForFormat()}
                    />
                </ActionsContainer>
            </Container>
        );
    }
}

export default SearchCard;
