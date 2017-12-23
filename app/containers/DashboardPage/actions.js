export const POPULATE_DASHBOARD = 'dashboard/POPULATE_DASHBOARD';
export const START_LOADING = 'dashboard/START_LOADING';
export const END_LOADING = 'dashboard/END_LOADING';
export const OPEN_MOBILE_NAV = 'dashboard/OPEN_MOBILE_NAV';
export const CLOSE_MOBILE_NAV = 'dashboard/CLOSE_MOBILE_NAV';

export const populateDashboard = (list) => ({
    type: POPULATE_DASHBOARD,
    payload: list,
});

export const startLoading = () => ({
    type: START_LOADING,
});

export const endLoading = () => ({
    type: END_LOADING,
});

export const openMobileNav = () => ({
    type: OPEN_MOBILE_NAV,
});

export const closeMobileNav = () => ({
    type: CLOSE_MOBILE_NAV,
});
