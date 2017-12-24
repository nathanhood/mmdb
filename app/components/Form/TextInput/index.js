import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../../theme';

const labelHeight = '14px';
const getSpacing = (val) => typeof val === 'boolean' ? '20px' : val;

const StyledDiv = styled.div`
    position: relative;
    margin-top: ${labelHeight};
    padding-bottom: ${(props) => props.spaced ? getSpacing(props.spaced) : 0};
`;

const StyledLabel = styled.label`
    position: absolute;
    font-size: ${labelHeight};
    color: ${theme.black};
    top: 0;
    left: 0;
    transform: ${(props) => props.isActive ? 'translateY(-' + labelHeight + ') scale(0.8)' : 'translateY(' + labelHeight + ')'};
    transition: transform .2s ease-out;
    line-height: 1.5em;
    transform-origin: 0 0;
`;

const StyledInput = styled.input`
    border: none;
    border-radius: 0;
    width: 100%;
    outline: none;
    height: 3rem;
    border-bottom: 1px solid ${theme.black};
    &:focus {
        border-bottom: 1px solid ${theme.teal};
        & + ${StyledLabel} {
            color: ${theme.teal};
        }
    }
`;

class TextInput extends React.Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        spaced: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.number
        ]),
        onChangeHandler: PropTypes.func,
    };

    static defaultProps = {
        spaced: true,
    };

    state = {
        isActive: false,
    };

    setActive = () => {
        this.setState((prevState) => ({
            ...prevState,
            isActive: true,
        }));
    };

    setInActive = () => {
        this.setState((prevState) => ({
            ...prevState,
            isActive: this.input.value.length > 1,
        }));
    };

    render() {
        const { label, name, type, spaced, onChangeHandler } = this.props;

        return (
            <StyledDiv spaced={spaced}>
                <StyledInput
                  type={type || 'text'}
                  name={name}
                  id={name}
                  innerRef={(input) => {
                      this.input = input;
                  }}
                  onFocus={this.setActive}
                  onBlur={this.setInActive}
                  onChange={(e) => {
                      if (onChangeHandler) {
                          onChangeHandler(e.target.value);
                      }
                  }}
                />
                <StyledLabel
                  isActive={this.state.isActive}
                  for={name}
                  onClick={() => {
                      this.setActive();
                      this.input.focus();
                  }}
                >
                    {label}
                </StyledLabel>
            </StyledDiv>
        );
    }
}


export default TextInput;
