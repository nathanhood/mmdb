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
import Tag from '../Tag';

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

const TagContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SelectDiv = styled.div`
    margin-bottom: 15px;
`;
class SearchCard extends React.Component {
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
        recentFormats: PropTypes.array,
    };

    static defaultProps = {
        recentFormats: [],
    };

    static contextTypes = {
        formats: PropTypes.object,
        definitions: PropTypes.object,
    };

    state = {
        askForFormat: false,
        format: null,
        definition: null,
    };

    _askForFormat = () => {
        this.setState((prevState) => ({
            ...prevState,
            askForFormat: true,
            askForDefinition: false,
        }));
    };

    _askForDefinition = () => {
        this.setState((prevState) => ({
            ...prevState,
            askForFormat: false,
            askForDefinition: true,
        }));
    };

    _setFormat = (format) => {
        this.setState((prevState) => ({
            ...prevState,
            format,
        }));
    };

    _setDefinition = (definition, cb) => {
        this.setState((prevState) => ({
            ...prevState,
            definition,
        }), cb);
    }

    _resetCard = () => {
        this.setState((prevState) => ({
            ...prevState,
            askForFormat: false,
            format: null,
            definition: null,
        }));
    };

    _addToLibrary = (apiId) => {
        if (!this.state.format) {
            this._askForFormat();
        } else if (!this.state.definition) {
            this._askForDefinition();
        }

        this.props.addToLibraryHandler({
            id: apiId,
            format: this.state.format,
            definition: this.state.definition,
        });

        this._resetCard();
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
            removeFromLibraryHandler,
            recentFormats,
        } = this.props;

        if (this.state.askForFormat) {
            return (
                <div>
                    <SelectDiv>
                        <Select
                          id="format"
                          options={this.context.formats.movie}
                          placeholder="Format"
                          onChange={(e) => {
                              this._setFormat(e.target.value);
                              this._askForDefinition();
                          }}
                        />
                    </SelectDiv>
                    <TagContainer>
                        {recentFormats.map((format) => (
                            <Tag
                              key={format.value}
                              onClick={() => {
                                  this._setFormat(format.value);
                                  this._askForDefinition();
                              }}
                            >
                                {format.display}
                            </Tag>
                        ))}
                    </TagContainer>
                </div>
            );
        } else if (this.state.askForDefinition) {
            return (
                <div>
                    <TagContainer>
                        {Object.keys(this.context.definitions.movie).map((key) => {
                            const definition = this.context.definitions.movie[key];

                            return (
                                <Tag
                                  key={definition.value}
                                  onClick={() => {
                                      this._setDefinition(definition.value, () => {
                                          this._addToLibrary(apiId);
                                      });
                                  }}
                                >
                                    {definition.display}
                                </Tag>
                            );
                        })}
                    </TagContainer>
                </div>
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
