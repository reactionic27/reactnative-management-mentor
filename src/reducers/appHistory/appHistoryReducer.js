/**
 * # appHistoryReducer.js
 *
 *
 */
'use strict';
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const {
    GET_AUTHENTICATED_USERS,
    GET_RATING_PAGE_VISITS,
    GET_TEAM_HISTORICAL_PAGE_VISITS,

    ADDED_AUTHENTICATED_USER,
    VISITED_RATING_PAGE,
    VISITED_TEAM_HISTORICAL_PAGE
} = require('../../lib/constants').default;

import InitialState from './appHistoryInitialState';

const initialState = new InitialState;
/**
 * ## appHistoryReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function appHistoryReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.merge(state);

    switch (action.type) {

        case GET_AUTHENTICATED_USERS:
        case ADDED_AUTHENTICATED_USER:
            // console.log(action);
            return state
                .set('authenticatedUsers', action.payload);

        case GET_RATING_PAGE_VISITS:
        case VISITED_RATING_PAGE:
            // console.log(action);
            return state
                .set('visitedRatingPage', action.payload);

        case GET_TEAM_HISTORICAL_PAGE_VISITS:
        case VISITED_TEAM_HISTORICAL_PAGE:
            // console.log(action);
            return state
                .set('visitedTeamHistoricalPage', action.payload);
    }

    return state;
}
