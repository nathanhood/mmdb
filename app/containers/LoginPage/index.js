import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import TextInput from '../../components/Form/TextInput';
import Button from '../../components/Form/Button';
import FormContainer from './FormContainer';
import { submitLogin } from './thunks';
import Logo from '../../components/Logo';
import Header from './Header';

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        login: PropTypes.func.isRequired,
    };

    state = {
        username: '',
        password: '',
    };

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

    render() {
        const { login } = this.props;

        return (
            <div>
                <Helmet>
                    <title>Login | MMDb</title>
                    <meta name="description" content="Log into mmdb" />
                </Helmet>

                <Header>
                    <Logo>MMDb</Logo>
                </Header>

                <FormContainer>
                    <form
                      onSubmit={(e) => {
                          e.preventDefault();
                          login({
                              username: this.state.username,
                              password: this.state.password
                          });
                      }}
                    >
                        <TextInput
                          label="Username"
                          name="username"
                          onChangeHandler={this.setUsername}
                        />
                        <TextInput
                          label="Password"
                          name="password"
                          type="password"
                          spaced="40px"
                          onChangeHandler={this.setPassword}
                        />
                        <Button wide>Login</Button>
                    </form>
                </FormContainer>
            </div>
        );
    }
}

const withConnect = connect(
    () => ({}),
    (dispatch) => ({
        login: ({ username, password }) => dispatch(submitLogin({ username, password })),
    })
);

export default compose(
    withConnect,
)(Login);
