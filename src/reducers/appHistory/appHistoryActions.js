/**
 * # appHistoryActions.js
 */
'use strict';

/**
 * ## Imports
 *
 * The actions supported
 */
const {
    GET_AUTHENTICATED_USERS,
    GET_RATING_PAGE_VISITS,
    GET_TEAM_HISTORICAL_PAGE_VISITS,

    ADDED_AUTHENTICATED_USER,
    VISITED_RATING_PAGE,
    VISITED_TEAM_HISTORICAL_PAGE
} = require('../../lib/constants').default;

const Store = require('../../lib/Store').default;
const moment = require('moment');
const _ = require('underscore');

export function getAuthenticatedUsersSuccess(arr) {
    return {
        type: GET_AUTHENTICATED_USERS,
        payload: arr
    };
}
/**
 * 
 * @returns {function()}
 */
export function getAuthenticatedUsers() {
    return dispatch => {
        return Store.getAuthenticatedUsers()
            .then((arr) => {
                // console.log("Store.getAuthenticatedUsers() -> arr: ", arr);
                dispatch(getAuthenticatedUsersSuccess(arr));
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
            });
    }
}

export function getRatingPageVisitsSuccess(bool) {
    return {
        type: GET_RATING_PAGE_VISITS,
        payload: bool
    };
}
/**
 * 
 * @param userId
 * @returns {function()}
 */
export function getRatingPageVisits(userId) {
    return dispatch => {
        return Store.getRatingPageVisits()
            .then((arr) => {
                // console.log("Store.getRatingPageVisits() -> arr: ", arr);

                if (!arr) return dispatch(getRatingPageVisitsSuccess(false));

                let bool = arr.indexOf(userId) > -1;
                dispatch(getRatingPageVisitsSuccess(bool));
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
            });
    }
}

export function getTeamHistoricalPageVisitsSuccess(bool) {
    return {
        type: GET_TEAM_HISTORICAL_PAGE_VISITS,
        payload: bool
    };
}
/**
 * 
 * @param userId
 * @returns {function()}
 */
export function getTeamHistoricalPageVisits(userId) {
    return dispatch => {
        return Store.getTeamHistoricalPageVisits()
            .then((arr) => {
                // console.log("Store.getTeamHistoricalPageVisits() -> arr: ", arr);

                if (!arr) return dispatch(getTeamHistoricalPageVisitsSuccess(false));

                let bool = arr.indexOf(userId) > -1;
                dispatch(getTeamHistoricalPageVisitsSuccess(bool));
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
            });
    }
}

export function addAuthenticatedUserSuccess(arr) {
    return {
        type: ADDED_AUTHENTICATED_USER,
        payload: arr
    };
}
/**
 * 
 * @param user
 * @returns {function()}
 */
export function addAuthenticatedUser(user) {
    return dispatch => {
        return Store.getAuthenticatedUsers()
            .then((arr) => {
                // console.log("Store.getAuthenticatedUsers() -> arr: ", arr);

                if (!arr) arr = [];
                arr.push({
                    user: user,
                    datetime: moment().format()
                });

                return Store.setAuthenticatedUsers(arr)
                    .then(() => {
                        dispatch(addAuthenticatedUserSuccess(arr));
                    })

                    .catch((error) => {
                        // console.log("ERROR: ", error);
                    });
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
            });
    }
}

export function visitRatingPageSuccess() {
    return {
        type: VISITED_RATING_PAGE,
        payload: true
    };
}
/**
 *
 * @param {int} userId - user's ID
 * @returns {function()}
 */
export function visitRatingPage(userId) {
    return dispatch => {
        return Store.getRatingPageVisits()
            .then((arr) => {
                // console.log("Store.getRatingPageVisits() -> arr: ", arr);

                let newArr = _.union(arr, [userId]);

                return Store.setRatingPageVisits(newArr)
                    .then(() => {
                        dispatch(visitRatingPageSuccess());
                    })

                    .catch((error) => {
                        // console.log("ERROR: ", error);
                    });
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
            });
    }
}

export function visitTeamHistoricalPageSuccess() {
    return {
        type: VISITED_TEAM_HISTORICAL_PAGE,
        payload: true
    };
}
/**
 *
 * @param {int} userId - user's ID
 * @returns {function()}
 */
export function visitTeamHistoricalPage(userId) {
    return dispatch => {
        return Store.getTeamHistoricalPageVisits()
            .then((arr) => {
                // console.log("Store.getTeamHistoricalPageVisits() -> arr: ", arr);

                let newArr = _.union(arr, [userId]);

                return Store.setTeamHistoricalPageVisits(newArr)
                    .then(() => {
                        dispatch(visitTeamHistoricalPageSuccess());
                    })

                    .catch((error) => {
                        // console.log("ERROR: ", error);
                    });
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
            });
    }
}
