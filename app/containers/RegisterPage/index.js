import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import TextInput from '../../components/Form/TextInput';
import FormContainer from '../LoginPage/FormContainer';
import Button from '../../components/Form/Button';
import { submitRegister } from './thunks';
import Logo from '../../components/Logo';
import Header from '../LoginPage/Header';
import AlternatePageMessage from '../LoginPage/AlternatePageMessage';
import StyledLink from '../../components/StyledLink';
import { LOGIN_URL } from '../../common/constants';


export class RegisterPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        register: PropTypes.func.isRequired,
    };

    state = {
        email: '',
        username: '',
        password: '',
        passwordConfirmation: ''
    };

    setEmail = (email) => {
        this.setState((prevState) => ({
            ...prevState,
            email,
        }));
    }

    setUsername = (username) => {
        this.setState((prevState) => ({
            ...prevState,
            username,
        }));
    }

    setPassword = (password) => {
        this.setState((prevState) => ({
            ...prevState,
            password,
        }));
    }

    setPasswordConfirmation = (passwordConfirmation) => {
        this.setState((prevState) => ({
            ...prevState,
            passwordConfirmation,
        }));
    }

    render() {
        const { register } = this.props;

        return (
            <div>
                <Helmet>
                    <title>Register</title>
                    <meta name="description" content="Register for an account" />
                </Helmet>

                <Header>
                    <Logo>MMDb</Logo>
                </Header>

                <FormContainer>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            register({
                                username: this.state.username,
                                password: this.state.password,
                                email: this.state.email,
                                passwordConfirmation: this.state.passwordConfirmation
                            });
                        }}
                    >
                        <TextInput
                            label="Username"
                            name="username"
                            onChangeHandler={this.setUsername}
                        />
                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            onChangeHandler={this.setEmail}
                        />
                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            onChangeHandler={this.setPassword}
                        />
                        <TextInput
                            label="Confirm Password"
                            name="passwordConfirmation"
                            type="password"
                            spaced="40px"
                            onChangeHandler={this.setPasswordConfirmation}
                        />
                        <Button wide>Register</Button>
                    </form>
                    <AlternatePageMessage>
                        Already have an account? <StyledLink to={LOGIN_URL}>Login</StyledLink>.
                    </AlternatePageMessage>
                </FormContainer>
            </div>
        );
    }
}

const withConnect = connect(
    () => ({}),
    (dispatch) => ({
        register: ({ email, username, password, passwordConfirmation }) => {
            return dispatch(submitRegister({ email, username, password, passwordConfirmation }));
        },
    })
);

export default compose(
    withConnect,
)(RegisterPage);
