/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';
import schema from './common/entities/schema';

const logger = store => next => action => {
    /* eslint-disable no-console */
    console.log('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    return result;
};

export default function configureStore(initialState = {}, history, ssr = false) {
    // Create the store with two middlewares
    // 1. thunk: Makes redux-thunks work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [
        thunk.withExtraArgument(schema),
        routerMiddleware(history),
    ];

    if (!ssr && process.env.NODE_ENV !== 'production') {
        middlewares.unshift(logger);
    }

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
                // Prevent recomputing reducers for `replaceReducer`
                shouldHotReload: false,
            })
            : compose;
    /* eslint-enable */

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(...enhancers)
    );

    // Extensions
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
}
