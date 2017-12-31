import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

class InfinityScroll extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        handleScrollTop: PropTypes.func,
        handleScrollBottom: PropTypes.func,
        offset: PropTypes.number,
    };

    static defaultProps = {
        offset: 0
    };

    state = {
        topIsEnabled: true,
        bottomIsEnabled: true,
        oldScroll: 0,
    };

    componentDidMount() {
        window.addEventListener('scroll', this._handleScroll);
    }

    _disableBottom = () => {
        this.setState((prevState) => ({ ...prevState, bottomIsEnabled: false }));
    };

    _enableBottom = () => {
        this.setState((prevState) => ({ ...prevState, bottomIsEnabled: true }));
    };

    _disableTop = () => {
        this.setState((prevState) => ({ ...prevState, topIsEnabled: false }));
    };

    _enableTop = () => {
        this.setState((prevState) => ({ ...prevState, topIsEnabled: true }));
    };

    // TODO: Make this compatible with SSR
    _handleScroll = throttle(() => {
        const {
            oldScroll,
            bottomIsEnabled,
            topIsEnabled,
        } = this.state;

        const scrollingUp = oldScroll > window.scrollY;
        this.setState((prevState) => ({ ...prevState, oldScroll: window.scrollY }));

        if (
            bottomIsEnabled &&
            !scrollingUp &&
            (window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - this.props.offset)
        ) {
            this._disableBottom();
            this.props.handleScrollBottom().then(this._enableBottom).catch(this._enableBottom);
        }

        if (topIsEnabled && scrollingUp && window.scrollY <= this.props.offset) {
            this._disableTop();
            this.props.handleScrollTop().then(this._enableTop).catch(this._enableTop);
        }
    }, 100);

    componentWillUnount() {
        window.removeEventListener('scroll', this._handleScroll);
    }

    render() {
        return null;
    }
}

export default InfinityScroll;
