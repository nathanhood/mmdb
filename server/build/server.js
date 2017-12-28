module.exports=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={},n={4:0};return t.e=function(t){if(0!==n[t]){var r=require("./"+t+".server.js"),o=r.modules,a=r.ids;for(var u in o)e[u]=o[u];for(var i=0;i<a.length;i++)n[a[i]]=0}return Promise.resolve()},t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t.oe=function(e){process.nextTick(function(){throw e})},t(t.s=0)}({"./app/common/auth/actions.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.AUTH_SUCCESSFUL="auth/AUTH_SUCCESSFUL",o=t.AUTH_FAILURE="auth/AUTH_FAILURE",a=t.REGISTER_SUCCESSFUL="auth/REGISTER_SUCCESSFUL",u=t.REGISTER_FAILURE="auth/REGISTER_FAILURE",i=t.LOG_OUT="auth/LOG_OUT";t.authSuccess=function(e){return{type:n,payload:e}},t.authFailure=function(){return{type:o}},t.registerSuccess=function(){return{type:a}},t.registerFailure=function(){return{type:u}},t.logOut=function(){return{type:i}}},"./app/common/auth/reducer.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=r("./app/common/auth/actions.js"),a=r("./app/utils/localStorage.js"),u=(0,a.getUser)(),i={isAuthenticated:!1,user:{}},c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{user:u,isAuthenticated:null!==u},t=arguments[1];switch(t.type){case o.AUTH_SUCCESSFUL:return n({},e,{isAuthenticated:!0,user:t.payload});case o.AUTH_FAILURE:case o.LOG_OUT:return n({},e,i);default:return e}};t.default=c},"./app/common/constants.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.LOGIN_URL="/login",t.REGISTER_URL="/register",t.DASHBOARD_URL="/"},"./app/common/resourceCache/actions.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.resetResourceCache=t.markDashboardDirty=t.setResource=t.RESET_RESOURCE_CACHE=t.MARK_DASHBOARD_DIRTY=t.SET_RESOURCE=void 0;var n=r("./app/common/resourceCache/constants.js"),o=t.SET_RESOURCE="resource/SET_RESOURCE",a=t.MARK_DASHBOARD_DIRTY="resource/MARK_DASHBOARD_DIRTY",u=t.RESET_RESOURCE_CACHE="resource/RESET_RESOURCE_CACHE";t.setResource=function(e,t){return{type:o,payload:{key:e,resource:t}}},t.markDashboardDirty=function(){return{type:a,payload:[n.LIBRARY_RECENT_RESOURCE_KEY]}},t.resetResourceCache=function(){return{type:u}}},"./app/common/resourceCache/constants.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.RECENT_FORMATS_RESOURCE_KEY="recentFormats",t.LIBRARY_RECENT_RESOURCE_KEY="libraryRecent"},"./app/common/resourceCache/reducer.js":function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=r("./app/common/resourceCache/actions.js"),u=function(e,t){var r={};return e.forEach(function(e){r[e]=o({},t[e],{dirty:!0})}),r},i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];switch(t.type){case a.MARK_DASHBOARD_DIRTY:return o({},e,u(t.payload,e));case a.SET_RESOURCE:return o({},e,n({},t.payload.key,t.payload.resource));case a.RESET_RESOURCE_CACHE:return{};default:return e}};t.default=i},"./app/configureStore.js":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=[s.default,(0,i.routerMiddleware)(t)];r||n.unshift(p);var o=[u.applyMiddleware.apply(void 0,n)],c="object"===("undefined"==typeof window?"undefined":a(window))&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({shouldHotReload:!1}):u.compose,l=(0,u.createStore)((0,d.default)(),e,c.apply(void 0,o));return l.injectedReducers={},l.injectedSagas={},l}Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=o;var u=r("redux"),i=r("react-router-redux"),c=r("redux-thunk"),s=n(c),l=r("./app/reducers.js"),d=n(l),p=function(e){return function(t){return function(r){console.log("dispatching",r);var n=t(r);return console.log("next state",e.getState()),n}}}},"./app/containers/App/actions.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.POPULATE_RECENT_FORMATS="app/POPULATE_RECENT_FORMATS";t.populateRecentFormats=function(e){return{type:n,payload:e}}},"./app/containers/App/index.js":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n    background: ",";\n    font-family: ",";\n    min-height: 100%;\n"],["\n    background: ",";\n    font-family: ",";\n    min-height: 100%;\n"]),s=r("react"),l=n(s),d=r("react-router-dom"),p=r("styled-components"),f=n(p),_=r("react-redux"),y=r("redux"),h=r("prop-types"),b=n(h),R=r("./app/containers/DashboardPage/Loadable.js"),v=n(R),E=r("./app/containers/LoginPage/Loadable.js"),O=n(E),S=r("./app/containers/RegisterPage/Loadable.js"),m=n(S),j=r("./app/containers/NotFoundPage/Loadable.js"),L=n(j),A=r("./app/variables.js"),g=n(A),C=r("./app/containers/App/reducer.js"),T=n(C),P=r("./app/utils/injectReducer.js"),x=n(P),M=r("./app/containers/ProtectedRoute/index.js"),w=n(M),D=r("./app/common/constants.js"),I=f.default.div(c,g.default.backgroundColor,g.default.font),U=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),i(t,[{key:"getChildContext",value:function(){return{formats:this.props.formats,definitions:this.props.definitions}}},{key:"render",value:function(){return l.default.createElement(p.ThemeProvider,{theme:g.default},l.default.createElement(I,null,l.default.createElement(d.Switch,null,l.default.createElement(d.Route,{path:D.LOGIN_URL,component:O.default}),l.default.createElement(d.Route,{path:D.REGISTER_URL,component:m.default}),l.default.createElement(w.default,{exact:!0,path:D.DASHBOARD_URL,component:v.default}),l.default.createElement(d.Route,{component:L.default}))))}}]),t}(l.default.Component);U.propTypes={definitions:b.default.object.isRequired,formats:b.default.object.isRequired},U.childContextTypes={formats:b.default.object,definitions:b.default.object};var N=(0,_.connect)(function(e){return{formats:e.app.formats,definitions:e.app.definitions}}),H=(0,x.default)({key:"app",reducer:T.default});t.default=(0,y.compose)(H,N)(U)},"./app/containers/App/reducer.js":function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];return u[t.type]?u[t.type](e,t):e}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=r("./app/containers/App/actions.js"),u=(r("util"),function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}({},a.POPULATE_RECENT_FORMATS,function(e,t){var r=t.payload;return o({},e,{recentFormats:r})}));t.default=n},"./app/containers/DashboardPage/Loadable.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("react-loadable"),o=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=(0,o.default)({loader:function(){return r.e(0).then(r.bind(null,"./app/containers/DashboardPage/index.js"))},loading:function(){return null}})},"./app/containers/DashboardPage/actions.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.POPULATE_DASHBOARD="dashboard/POPULATE_DASHBOARD",o=t.START_LOADING="dashboard/START_LOADING",a=t.END_LOADING="dashboard/END_LOADING",u=t.OPEN_MOBILE_NAV="dashboard/OPEN_MOBILE_NAV",i=t.CLOSE_MOBILE_NAV="dashboard/CLOSE_MOBILE_NAV",c=t.RESET_DASHBOARD="dashboard/RESET_DASHBOARD",s=t.FAVORITE_LIBRARY_ITEM="dashboard/FAVORITE_LIBRARY_ITEM",l=t.UNFAVORITE_LIBRARY_ITEM="dashboard/UNFAVORITE_LIBRARY_ITEM";t.populateDashboard=function(e){return{type:n,payload:e}},t.resetDashboard=function(){return{type:c}},t.startLoading=function(){return{type:o}},t.endLoading=function(){return{type:a}},t.openMobileNav=function(){return{type:u}},t.closeMobileNav=function(){return{type:i}},t.favoriteLibraryItem=function(e){return{type:s,payload:e}},t.unFavoriteLibraryItem=function(e){return{type:l,payload:e}}},"./app/containers/DashboardPage/reducer.js":function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];return l[t.type]?l[t.type](e,t):e}Object.defineProperty(t,"__esModule",{value:!0});var a,u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=r("./app/containers/DashboardPage/actions.js"),c=r("./app/initialState.js"),s=function(e){return e&&e.__esModule?e:{default:e}}(c),l=(a={},n(a,i.POPULATE_DASHBOARD,function(e,t){return u({},e,{library:t.payload})}),n(a,i.RESET_DASHBOARD,function(){return u({},s.default.dashboard)}),n(a,i.START_LOADING,function(e){return u({},e,{isLoaded:!1})}),n(a,i.END_LOADING,function(e){return u({},e,{isLoaded:!0})}),n(a,i.OPEN_MOBILE_NAV,function(e){return u({},e,{mobileNavIsOpen:!0})}),n(a,i.CLOSE_MOBILE_NAV,function(e){return u({},e,{mobileNavIsOpen:!1})}),n(a,i.FAVORITE_LIBRARY_ITEM,function(e,t){var r=t.payload;return u({},e,{library:e.library.map(function(e){return u({},e,{isFavorite:e.isFavorite||e.id===r})})})}),n(a,i.UNFAVORITE_LIBRARY_ITEM,function(e,t){var r=t.payload;return u({},e,{library:e.library.map(function(e){return u({},e,{isFavorite:e.id!==r&&e.isFavorite})})})}),a);t.default=o},"./app/containers/LoginPage/Loadable.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("react-loadable"),o=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=(0,o.default)({loader:function(){return r.e(2).then(r.bind(null,"./app/containers/LoginPage/index.js"))},loading:function(){return null}})},"./app/containers/NotFoundPage/Loadable.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("react-loadable"),o=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=(0,o.default)({loader:function(){return r.e(3).then(r.bind(null,"./app/containers/NotFoundPage/index.js"))},loading:function(){return null}})},"./app/containers/ProtectedRoute/index.js":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e){return{isAuthenticated:e.auth.isAuthenticated}}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),d=r("react"),p=n(d),f=r("prop-types"),_=n(f),y=r("react-redux"),h=r("redux"),b=r("react-router-dom"),R=r("./app/common/constants.js"),v=function(e){function t(){return a(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.isAuthenticated,r=e.component,n=o(e,["isAuthenticated","component"]);return p.default.createElement(b.Route,s({},n,{render:function(e){return t?p.default.createElement(r,n):p.default.createElement(b.Redirect,{to:{pathname:R.LOGIN_URL,state:{from:e.location}}})}}))}}]),t}(p.default.Component);v.propTypes={isAuthenticated:_.default.bool.isRequired,component:_.default.func};var E=(0,y.connect)(c,null);t.default=(0,h.compose)(E)(v)},"./app/containers/RegisterPage/Loadable.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("react-loadable"),o=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=(0,o.default)({loader:function(){return r.e(1).then(r.bind(null,"./app/containers/RegisterPage/index.js"))},loading:function(){return null}})},"./app/containers/SearchResults/actions.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.POPULATE_SEARCH_RESULTS="search/POPULATE_RESULTS",o=t.SHOW_SEARCH_RESULTS="search/SHOW_RESULTS",a=t.SHOW_SEARCH="search/SHOW",u=t.HIDE_SEARCH="search/HIDE",i=t.CLAIM_SEARCH_RESULT_AS_OWNED="search/CLAIM_SEARCH_RESULT_AS_OWNED",c=t.UNCLAIM_SEARCH_RESULT_AS_OWNED="search/UNCLAIM_SEARCH_RESULT_AS_OWNED",s=t.SET_ID_ON_SEARCH_RESULT="search/SET_ID_ON_SEARCH_RESULT";t.populateSearchResults=function(e){return{type:n,payload:e}},t.showSearchResults=function(){return{type:o}},t.showSearch=function(e){return{type:a,payload:e}},t.hideSearch=function(){return{type:u}},t.claimSearchResultAsOwned=function(e){return{type:i,payload:e}},t.unclaimSearchResultAsOwned=function(e){return{type:c,payload:e}},t.setIdOnSearchResult=function(e){return{type:s,payload:e}}},"./app/containers/SearchResults/reducer.js":function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(t,"__esModule",{value:!0});var o,a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},u=r("./app/containers/SearchResults/actions.js"),i=(o={},n(o,u.SHOW_SEARCH,function(e,t){var r=t.payload;return a({},e,{isVisible:!0,searchType:r})}),n(o,u.HIDE_SEARCH,function(e){return a({},e,{isVisible:!1,resultsAreVisible:!1})}),n(o,u.SHOW_SEARCH_RESULTS,function(e){return a({},e,{resultsAreVisible:!0})}),n(o,u.POPULATE_SEARCH_RESULTS,function(e,t){var r=t.payload;return a({},e,{results:r})}),n(o,u.CLAIM_SEARCH_RESULT_AS_OWNED,function(e,t){var r=t.payload;return a({},e,{results:e.results.map(function(e){return a({},e,{isOwned:e.isOwned||e.tmdbId===r})})})}),n(o,u.UNCLAIM_SEARCH_RESULT_AS_OWNED,function(e,t){var r=t.payload;return a({},e,{results:e.results.map(function(e){return a({},e,{isOwned:e.id!==r&&e.isOwned})})})}),n(o,u.SET_ID_ON_SEARCH_RESULT,function(e,t){var r=t.payload;return a({},e,{searchResults:e.searchResults.map(function(e){return e.apiId===r.apiId?a({},e,{id:r.id}):e})})}),o),c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];return i[t.type]?i[t.type](e,t):e};t.default=c},"./app/initialState.js":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r("./server/constants/formats.js"),a=n(o),u=r("./server/constants/definitions.js"),i=n(u);t.default={app:{recentFormats:[],formats:a.default,definitions:i.default},dashboard:{isLoaded:!1,library:[],mobileNavIsOpen:!1},resourceCache:{},search:{isVisible:!1,resultsAreVisible:!1,results:[]}}},"./app/reducers.js":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments[1];switch(t.type){case c.LOCATION_CHANGE:return u({},e,{location:u({},t.payload)});default:return e}}function a(e){return(0,i.combineReducers)(u({route:o,app:l.default,dashboard:p.default,resourceCache:_.default,auth:h.default,search:R.default},e))}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.default=a;var i=r("redux"),c=r("react-router-redux"),s=r("./app/containers/App/reducer.js"),l=n(s),d=r("./app/containers/DashboardPage/reducer.js"),p=n(d),f=r("./app/common/resourceCache/reducer.js"),_=n(f),y=r("./app/common/auth/reducer.js"),h=n(y),b=r("./app/containers/SearchResults/reducer.js"),R=n(b),v={location:null}},"./app/utils/checkStore.js":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t={dispatch:c.default,subscribe:c.default,getState:c.default,replaceReducer:c.default,injectedReducers:l.default};(0,p.default)((0,u.default)(e,t),"(app/utils...) injectors: Expected a valid redux store")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var a=r("lodash/conformsTo"),u=n(a),i=r("lodash/isFunction"),c=n(i),s=r("lodash/isObject"),l=n(s),d=r("invariant"),p=n(d)},"./app/utils/injectReducer.js":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r("react"),s=n(c),l=r("prop-types"),d=n(l),p=r("hoist-non-react-statics"),f=n(p),_=r("./app/utils/reducerInjectors.js"),y=n(_);t.default=function(e){var t=e.key,r=e.reducer;return function(e){var n=function(n){function c(){var e,t,r,n;o(this,c);for(var u=arguments.length,i=Array(u),s=0;s<u;s++)i[s]=arguments[s];return t=r=a(this,(e=c.__proto__||Object.getPrototypeOf(c)).call.apply(e,[this].concat(i))),r.injectors=(0,y.default)(r.context.store),n=t,a(r,n)}return u(c,n),i(c,[{key:"componentWillMount",value:function(){(0,this.injectors.injectReducer)(t,r)}},{key:"render",value:function(){return s.default.createElement(e,this.props)}}]),c}(s.default.Component);return n.WrappedComponent=e,n.contextTypes={store:d.default.object.isRequired},n.displayName="withReducer("+(e.displayName||e.name||"Component")+")",(0,f.default)(n,e)}}},"./app/utils/localStorage.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){},o=function(){return null},a=function(){};process.browser&&(o=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=localStorage.getItem(e);return r&&t&&(r=JSON.parse(r)),r},n=function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&(t=JSON.stringify(t)),localStorage.setItem(e,t)},a=function(e){localStorage.removeItem(e)});t.getUser=function(){return o("user")},t.storeUser=function(e){return n("user",e)},t.removeUser=function(){return a("user")}},"./app/utils/reducerInjectors.js":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){return function(r,n){t||(0,y.default)(e),(0,i.default)((0,f.default)(r)&&!(0,s.default)(r)&&(0,d.default)(n),"(app/utils...) injectReducer: Expected `reducer` to be a reducer function"),Reflect.has(e.injectedReducers,r)&&e.injectedReducers[r]===n||(e.injectedReducers[r]=n,e.replaceReducer((0,b.default)(e.injectedReducers)))}}function a(e){return(0,y.default)(e),{injectReducer:o(e,!0)}}Object.defineProperty(t,"__esModule",{value:!0}),t.injectReducerFactory=o,t.default=a;var u=r("invariant"),i=n(u),c=r("lodash/isEmpty"),s=n(c),l=r("lodash/isFunction"),d=n(l),p=r("lodash/isString"),f=n(p),_=r("./app/utils/checkStore.js"),y=n(_),h=r("./app/reducers.js"),b=n(h)},"./app/variables.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("polished"),o={black:"#202121",gray:"#a6abab",lighterGray:"#f3f3f3",lightGray:"#e6eaea",white:"#fff",teal:"#22d0b2",darkTeal:"#18907B",blue:"#3776d9",loveRed:"#ed4e4e",wishYellow:"#ffe100",backgroundColor:"#f9f9f9",gutter:"5%",font:"Roboto, Arial, sans-serif",headerHeight:"70px"};o.linkColor=o.teal,o.linkHoverColor=(0,n.darken)(.05,o.linkColor),o.fixedButtonColor=o.darkTeal,o.fixedButtonActiveColor=(0,n.lighten)(.04,o.fixedButtonColor),o.buttonColor=o.black,o.buttonActiveColor=(0,n.lighten)(.06,o.buttonColor),o.animations={enterOffScreen:"cubic-bezier(0.0, 0.0, 0.2, 1)",exitOffScreen:"cubic-bezier(0.4, 0.0, 1, 1)"},t.default=o},"./server/SSR.js":function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function renderFullPage(html,criticalCSS,preloadedState){var page=_fs2.default.readFileSync((0,_path.resolve)(process.cwd()+"/server/templates/index.html"));return eval("`"+page+"`")}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},_fs=__webpack_require__("fs"),_fs2=_interopRequireDefault(_fs),_path=__webpack_require__("path"),_react=__webpack_require__("react"),_react2=_interopRequireDefault(_react),_reactRouterRedux=__webpack_require__("react-router-redux"),_server=__webpack_require__("react-dom/server"),_reactRedux=__webpack_require__("react-redux"),_styledComponents=__webpack_require__("styled-components"),_createMemoryHistory=__webpack_require__("history/createMemoryHistory"),_createMemoryHistory2=_interopRequireDefault(_createMemoryHistory),_App=__webpack_require__("./app/containers/App/index.js"),_App2=_interopRequireDefault(_App),_configureStore=__webpack_require__("./app/configureStore.js"),_configureStore2=_interopRequireDefault(_configureStore),_initialState=__webpack_require__("./app/initialState.js"),_initialState2=_interopRequireDefault(_initialState),renderSkeleton=function(){return renderFullPage("","","window.__MMDB_PRELOADED_STATE="+JSON.stringify(_extends({},_initialState2.default)))},render=function(e){var t=new _styledComponents.ServerStyleSheet,r=(0,_createMemoryHistory2.default)(),n=(0,_configureStore2.default)(_extends({},_initialState2.default,e),r,!0);return renderFullPage((0,_server.renderToString)(t.collectStyles(_react2.default.createElement(_reactRedux.Provider,{store:n},_react2.default.createElement(_reactRouterRedux.ConnectedRouter,{history:r},_react2.default.createElement(_App2.default,null))))),t.getStyleTags(),"window.__MMDB_PRELOADED_STATE="+JSON.stringify(n.getState()))};exports.default={render:render,renderSkeleton:renderSkeleton}},"./server/constants/definitions.js":function(e,t,r){"use strict";var n={sd:{display:"SD",value:"sd",resolution:"720p",icon:null},hd:{display:"HD",value:"hd",resolution:"1080p",icon:'<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n            <g id="tv" fill-rule="nonzero">\n                <path d="M126,0 L2,0 C0.9,0 0,0.9 0,2 L0,74 C0,75.1 0.9,76 2,76 L58,76 L58,82 L46.719,82 C44.475,82 41.262,82.45 39.579,83 C37.896,83.55 35.601,84.9 34.479,86 C33.357,87.1 34.275,88 36.519,88 L91.482,88 C93.726,88 94.644,87.1 93.521,86 C92.4,84.9 90.105,83.55 88.419,83 C86.733,82.45 83.523,82 81.278,82 L70,82 L70,76 L126,76 C127.1,76 128,75.1 128,74 L128,2 C128,0.9 127.1,0 126,0 Z M122,69 C122,69.55 121.55,70 121,70 L7,70 C6.45,70 6,69.55 6,69 L6,7 C6,6.45 6.45,6 7,6 L121,6 C121.55,6 122,6.45 122,7 L122,69 Z" id="Shape" fill="#000000"></path>\n                <g id="hd" transform="translate(31.000000, 21.000000)" fill="#1D1D1B">\n                    <path d="M21.9636803,13.8559675 L8.2831035,13.8559675 L8.2831035,0.263360605 L0,0.263360605 L0,35.6317601 L8.28296149,35.6317601 L8.28296149,20.8343399 L21.9635383,20.8343399 L21.9635383,35.6321703 L30.2493401,35.6321703 L30.2493401,0.263360605 L21.9635383,0.263360605 L21.9636803,13.8559675 Z M63.7865007,3.78016819 C60.2982952,1.26142346 55.718268,0 48.6884587,0 C44.5491082,0 40.5668278,0.314637982 37.518873,0.787073543 L37.518873,35.4779279 C39.5338009,35.7343148 42.6405505,36 46.9453501,36 C54.1383361,36 60.0818623,34.5292281 63.9518078,31.4353563 C67.4400133,28.5467308 70,23.8804895 70,17.1077737 C69.999716,10.8623259 67.6031901,6.50880831 63.7865007,3.78016819 Z M48.6884587,29.7519542 C47.708688,29.7519542 46.510212,29.7519542 45.8001302,29.5990793 L45.8001302,6.45506962 C46.510212,6.29945988 47.76166,6.14125208 49.5635635,6.14125208 C56.7566915,6.14125208 61.2266561,10.0246587 61.2266561,17.3709975 C61.2266561,25.8206887 56.2648889,29.811983 48.6884587,29.7519542 Z" id="Shape"></path>\n                </g>\n            </g>\n        </g>'},"4k":{display:"4k",value:"4k",resolution:"4096p",icon:'<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n            <g id="tv" fill="#000000" fill-rule="nonzero">\n                <path d="M126,0 L2,0 C0.9,0 0,0.9 0,2 L0,74 C0,75.1 0.9,76 2,76 L58,76 L58,82 L46.719,82 C44.475,82 41.262,82.45 39.579,83 C37.896,83.55 35.601,84.9 34.479,86 C33.357,87.1 34.275,88 36.519,88 L91.482,88 C93.726,88 94.644,87.1 93.521,86 C92.4,84.9 90.105,83.55 88.419,83 C86.733,82.45 83.523,82 81.278,82 L70,82 L70,76 L126,76 C127.1,76 128,75.1 128,74 L128,2 C128,0.9 127.1,0 126,0 Z M122,69 C122,69.55 121.55,70 121,70 L7,70 C6.45,70 6,69.55 6,69 L6,7 C6,6.45 6.45,6 7,6 L121,6 C121.55,6 122,6.45 122,7 L122,69 Z" id="Shape"></path>\n                <g id="4k" transform="translate(29.000000, 21.000000)">\n                    <path d="M25.621,28.98 L25.621,35.998 L17.636,35.998 L17.636,28.98 L0.705,28.98 L0.705,21.812 L15.349,0 L25.568,0 L25.568,22.065 L30.55,22.065 L30.55,28.981 L25.621,28.981 L25.621,28.98 Z M17.687,8.744 L17.535,8.744 L8.992,22.065 L17.687,22.065 L17.687,8.744 Z" id="Shape"></path>\n                    <polygon id="Shape" points="57.958 36 44.583 19.424 44.481 19.424 44.481 36 35.993 36 35.993 0 44.481 0 44.481 14.643 44.634 14.643 57.499 0 68.382 0 52.873 16.576 69.295 36"></polygon>\n                </g>\n            </g>\n        </g>'}};e.exports={movie:n}},"./server/constants/formats.js":function(e,t,r){"use strict";var n=[{display:"Amazon",value:"amazon"},{display:"Google Play",value:"google-play"},{display:"iTunes",value:"itunes"}],o=[{display:"DVD",value:"dvd"},{display:"Blu-ray",value:"blu-ray"}].concat(n);e.exports={movie:o}},0:function(e,t,r){e.exports=r("./server/SSR.js")},axios:function(e,t){e.exports=require("axios")},"feather-icons":function(e,t){e.exports=require("feather-icons")},fs:function(e,t){e.exports=require("fs")},"history/createMemoryHistory":function(e,t){e.exports=require("history/createMemoryHistory")},"hoist-non-react-statics":function(e,t){e.exports=require("hoist-non-react-statics")},invariant:function(e,t){e.exports=require("invariant")},"lodash/conformsTo":function(e,t){e.exports=require("lodash/conformsTo")},"lodash/isEmpty":function(e,t){e.exports=require("lodash/isEmpty")},"lodash/isFunction":function(e,t){e.exports=require("lodash/isFunction")},"lodash/isObject":function(e,t){e.exports=require("lodash/isObject")},"lodash/isString":function(e,t){e.exports=require("lodash/isString")},"lodash/uniqBy":function(e,t){e.exports=require("lodash/uniqBy")},moment:function(e,t){e.exports=require("moment")},"moment/moment":function(e,t){e.exports=require("moment/moment")},path:function(e,t){e.exports=require("path")},polished:function(e,t){e.exports=require("polished")},"prop-types":function(e,t){e.exports=require("prop-types")},react:function(e,t){e.exports=require("react")},"react-dom/server":function(e,t){e.exports=require("react-dom/server")},"react-helmet":function(e,t){e.exports=require("react-helmet")},"react-loadable":function(e,t){e.exports=require("react-loadable")},"react-redux":function(e,t){e.exports=require("react-redux")},"react-router-dom":function(e,t){e.exports=require("react-router-dom")},"react-router-redux":function(e,t){e.exports=require("react-router-redux")},redux:function(e,t){e.exports=require("redux")},"redux-thunk":function(e,t){e.exports=require("redux-thunk")},"styled-components":function(e,t){e.exports=require("styled-components")},"styled-components-theme":function(e,t){e.exports=require("styled-components-theme")},util:function(e,t){e.exports=require("util")}});