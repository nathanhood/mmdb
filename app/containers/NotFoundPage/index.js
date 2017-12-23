import React from 'react';
import Helmet from 'react-helmet';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <Helmet>
                    <title>Page Not Found | MMDb</title>
                </Helmet>
                <h1>Not found</h1>
            </div>
        );
    }
}
