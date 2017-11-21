import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { transitionOpacity } from 'mixins';
import HeaderButton from 'components/HeaderButton';
import theme from 'theme';
import { LIBRARY_SEARCH_TYPE } from 'containers/App/constants';

const TransitionContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    ${transitionOpacity}
`;

const StyledContainer = styled.div`
    background-color: ${theme.darkTeal};
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
`;

const closeBar = css`
    content: '';
    height: 3px;
    width: 20px;
    position: absolute;
    top: 7px;
    left: -1px;
`;

const CloseSearch = styled.div`
    background-color: transparent;
    height: 18px;
    width: 18px;
    position: relative;
    &::after {
        background-color: ${theme.white};
        ${closeBar}
        transform: rotate(45deg);
    }
    &::before {
        background-color: ${theme.white};
        ${closeBar}
        transform: rotate(-45deg);
    }
`;

const StyledInput = styled.input`
    background-color: transparent;
    color: ${theme.white};
    border: 0;
    flex: 1 0 calc(100% - 65px);
    padding-left: 25px;
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: ${theme.white};
    }
`;

const LibraryStyledContainer = StyledContainer.extend`
    background-color: ${theme.white};
`;

const LibraryCloseSearch = CloseSearch.extend`
    &::after {
        background-color: ${theme.black};
    }
    &::before {
        background-color: ${theme.black};
    }
`;

const LibraryStyledInput = StyledInput.extend`
    background-color: ${theme.white};
    color: ${theme.black};
    &::placeholder {
        color: ${theme.black};
    }
`;

class Search extends React.PureComponent {
    static propTypes = {
        close: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
        type: PropTypes.string,
    };

    componentDidUpdate() {
        this.input.focus();
    }

    render() {
        const { show, type, close } = this.props;

        if (type === LIBRARY_SEARCH_TYPE) {
            return (
                <TransitionContainer show={show}>
                    <LibraryStyledContainer>
                        <LibraryStyledInput type="text" placeholder="Search your library" innerRef={(comp) => { this.input = comp }} />
                        <HeaderButton onClick={close}>
                            <LibraryCloseSearch />
                        </HeaderButton>
                    </LibraryStyledContainer>
                </TransitionContainer>
            );
        }

        return (
            <TransitionContainer show={show}>
                <StyledContainer>
                    <StyledInput type="text" placeholder="Find a new movie" innerRef={(comp) => { this.input = comp }} />
                    <HeaderButton onClick={close}>
                        <CloseSearch />
                    </HeaderButton>
                </StyledContainer>
            </TransitionContainer>
        );
    }
}

export default Search;
