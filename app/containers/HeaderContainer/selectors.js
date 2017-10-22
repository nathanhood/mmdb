import { createSelector } from 'reselect';

/**
 * Direct selector to the headerContainer state domain
 */
const selectHeaderContainerDomain = (state) => state.headerContainer;

/**
 * Other specific selectors
 */


/**
 * Default selector used by HeaderContainer
 */

const makeSelectHeaderContainer = () => createSelector(
    selectHeaderContainerDomain,
    (substate) => substate
);

export default makeSelectHeaderContainer;
export {
    selectHeaderContainerDomain,
};
