import React from 'react';
import PropTypes from 'prop-types';


const SCROLLING_UP = 'SCROLLING_UP';
const SCROLLING_DOWN = 'SCROLLING_DOWN'

class ScrollPagination extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        scrolledToTopHandler: PropTypes.func,
        scrolledToBottomHandler: PropTypes.func,
        Loader: PropTypes.func.isRequired,
        scrollOffset: PropTypes.number,
        children: PropTypes.node,
        topIsDisabled: PropTypes.bool,
        bottomIsDisabled: PropTypes.bool,
    };

    static defaultProps = {
        scrolledToTopHandler: () => {},
        scrolledToBottomHandler: () => {},
        scrollOffset: 250,
        topIsDisabled: false,
        bottomIsDisabled: false,
    };

    state = {
        awaitingPageAbove: false,
        awaitingPageBelow: false,
        oldScrollPosition: 0,
        oldDocumentHeight: null,
    };

    componentDidMount() {
        window.addEventListener('scroll', this._handleScroll);

        // Enables scroll up event on initial page load
        if (window.scrollY === 0) {
            window.scrollTo(0, 1);
        }
    }

    componentWillReceiveProps(newProps) {
        const newChildren = React.Children.toArray(newProps.children);
        const children = React.Children.toArray(this.props.children);

        if (newChildren[0].key !== children[0].key) {
            this.setState({ awaitingPageAbove: false });
        }

        if (newChildren[newChildren.length - 1].key !== children[children.length - 1].key) {
            this.setState({ awaitingPageBelow: false });
        }
    }

    componentDidUpdate() {
        const {
            oldDocumentHeight,
            oldScrollPosition
        } = this.state;

        if (oldDocumentHeight === null) {
            return;
        }

        const newDocumentHeight = document.body.offsetHeight;
        const maintainedScrollPosition = (newDocumentHeight - oldDocumentHeight) + oldScrollPosition;

        if (maintainedScrollPosition > window.scrollY + 10) {
            this.setState({ oldDocumentHeight: null });
            window.scrollTo(0, maintainedScrollPosition);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleScroll);
    }

    _getScrollDirection = (oldPosition) => {
        const newScrollPosition = window.scrollY;
        const scrollDirection = oldPosition > newScrollPosition ? SCROLLING_UP : SCROLLING_DOWN;

        this._updateOldScrollPosition(newScrollPosition);

        return scrollDirection;
    };

    _reachedBottomOfPage = (offset) => {
        return window.innerHeight + window.pageYOffset >= document.body.offsetHeight - offset;
    };

    _reachedTopOfPage = (offset) => {
        return window.scrollY <= offset;
    };

    _updateOldScrollPosition = (oldScrollPosition) => this.setState({ oldScrollPosition });

    _scrolledToBottom = (handler) => {
        this.setState({ awaitingPageBelow: true });
        handler();
    };

    _scrolledToTop = (handler) => {
        // Track old document height so we can adjust scroll
        // position once content loads in so it's not so jarring
        this.setState({
            awaitingPageAbove: true,
            oldDocumentHeight: document.body.offsetHeight,
        });

        handler();
    };

    _handleScroll = () => {
        const {
            oldScrollPosition,
            awaitingPageBelow,
            awaitingPageAbove,
        } = this.state;
        const {
            scrollOffset,
            scrolledToBottomHandler,
            scrolledToTopHandler,
            topIsDisabled,
            bottomIsDisabled,
        } = this.props;
        const scrollDirection = this._getScrollDirection(oldScrollPosition)

        if (
            !bottomIsDisabled &&
            !awaitingPageBelow &&
            scrollDirection === SCROLLING_DOWN &&
            this._reachedBottomOfPage(scrollOffset)
        ) {
            this._scrolledToBottom(scrolledToBottomHandler);
        }

        if (
            !topIsDisabled &&
            !awaitingPageAbove &&
            scrollDirection === SCROLLING_UP &&
            this._reachedTopOfPage(scrollOffset)
        ) {
            this._scrolledToTop(scrolledToTopHandler);
        }
    };

    render() {
        const {
            children,
            Loader,
        } = this.props;
        const { awaitingPageAbove } = this.state;

        return (
            <div>
                {awaitingPageAbove ? <Loader /> : null}
                {children}
            </div>
        );
    }
}

export default ScrollPagination;
