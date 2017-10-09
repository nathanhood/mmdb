import fs from 'fs';
import { resolve } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import HomePage from '../app/containers/HomePage';

function renderFullPage(html) {
    const page = fs.readFileSync(resolve(process.cwd() + '/app/index.html'));

    return eval('`' + page + '`');
}

export default () => {
    const html = renderToString(<HomePage />);

    return renderFullPage(html);
};
