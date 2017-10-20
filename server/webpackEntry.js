import fs from 'fs';
import { resolve } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Dashboard from '../app/containers/Dashboard';

function renderFullPage(html) { // eslint-disable-line no-unused-vars
    const page = fs.readFileSync(resolve(process.cwd() + '/server/templates/index.html'));

    return eval('`' + page + '`'); // eslint-disable-line no-eval
}

export default () => {
    const html = renderToString(<Dashboard />);

    return renderFullPage(html);
};
