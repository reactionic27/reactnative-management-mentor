/**
 * # toolsListReducer.js
 *
 * The reducer user tool actions
 */
'use strict';

const {fromJS} = require('immutable');

/**
 * ## Actions
 *
 */
const {
    GET_LOCAL_TOOLS_LIST_REQUEST,
    GET_LOCAL_TOOLS_LIST_SUCCESS,
    GET_LOCAL_TOOLS_LIST_BLANK_JSON,
    GET_LOCAL_TOOLS_LIST_FAILURE,

    GET_TOOLS_LIST_REQUEST,
    GET_TOOLS_LIST_SUCCESS,
    GET_TOOLS_LIST_FAILURE,

    LOCK_VIEW_PAGER,
    UNLOCK_VIEW_PAGER,

    LOGOUT_SUCCESS,

    SET_STATE
} = require('../../lib/constants').default;

/**
 * ## Initial State
 *
 */
const InitialState = require('./toolsListInitialState').default;
const initialState = new InitialState;

/**
 * ## toolsListReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function toolsListReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

    switch (action.type) {
        /**
         * ### Request starts
         *
         */
        case GET_LOCAL_TOOLS_LIST_REQUEST:
        case GET_TOOLS_LIST_REQUEST:
            return state
                .setIn(['isFetching'], true);

        /**
         * ### Request ends successfully
         */
        case GET_LOCAL_TOOLS_LIST_SUCCESS:
        case GET_TOOLS_LIST_SUCCESS:
            return state
                .set('isFetching', false)
                .set('list', fromJS(action.payload));

        /**
         * User logged out.
         *
         */
        case LOGOUT_SUCCESS:
            return state
                .set('list', fromJS([]));

        /**
         * (Un)Locked View Pager
         *
         */
        case LOCK_VIEW_PAGER:
            return state
                .set('lockedViewPager', true);
        case UNLOCK_VIEW_PAGER:
            return state
                .set('lockedViewPager', false);

        /**
         * ### Request fails
         */
        case GET_LOCAL_TOOLS_LIST_FAILURE:
        case GET_TOOLS_LIST_FAILURE:
            return state
                .set('isFetching', false);

        /**
         * no state change, just an ability to track action requests...
         */
        case GET_LOCAL_TOOLS_LIST_BLANK_JSON:
            return state;

        /**
         * ### set the state
         *
         * This is in support of Hot Loading - take the payload
         * and set the values into the state
         *
         */
        case SET_STATE:
            debugger;
            return state;

    }//switch
    /**
     * # Default
     */
    return state;
}
