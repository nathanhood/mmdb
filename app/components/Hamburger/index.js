import React from 'react';
import joinClasses from '../../utils/joinClasses';
import { bar, first, second, third, hamburger } from './style.scss';

class Hamburger extends React.PureComponent {
    render() {
        return (
            <div className={hamburger}>
                <div className={joinClasses(bar, first)}></div>
                <div className={joinClasses(bar, second)}></div>
                <div className={joinClasses(bar, third)}></div>
            </div>
        );
    }
}

export default Hamburger;
