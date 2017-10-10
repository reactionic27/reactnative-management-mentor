/**
 * # toolSavesListReducer.js
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
    DELETE_TOOL_SAVES_REQUEST,

    GET_LOCAL_TOOL_SAVES_LIST_REQUEST,
    GET_LOCAL_TOOL_SAVES_LIST_SUCCESS,
    GET_LOCAL_TOOL_SAVES_LIST_BLANK_JSON,
    GET_LOCAL_TOOL_SAVES_LIST_FAILURE,

    GET_TOOL_SAVES_LIST_REQUEST,
    GET_TOOL_SAVES_LIST_SUCCESS,
    GET_TOOL_SAVES_LIST_FAILURE,

    LOCAL_TOOL_SAVE_CREATE_REQUEST,
    LOCAL_TOOL_SAVE_CREATE_SUCCESS,
    LOCAL_TOOL_SAVE_CREATE_AND_EXIT_SUCCESS,
    LOCAL_TOOL_SAVE_CREATE_FAILURE,

    LOCAL_TOOL_SAVE_DELETE_REQUEST,
    LOCAL_TOOL_SAVE_DELETE_SUCCESS,
    LOCAL_TOOL_SAVE_DELETE_FAILURE,

    TOOL_SAVE_CREATE_REQUEST,
    TOOL_SAVE_CREATE_SUCCESS,
    TOOL_SAVE_CREATE_AND_EXIT_SUCCESS,
    TOOL_SAVE_CREATE_FAILURE,

    TOOL_SAVES_SYNC_REQUEST,
    TOOL_SAVES_SYNC_SUCCESS,
    TOOL_SAVES_SYNC_FAILURE,

    LOGOUT_SUCCESS,

    SET_STATE
} = require('../../lib/constants').default;

/**
 * ## Initial State
 *
 */
const InitialState = require('./toolSavesListInitialState').default;
const initialState = new InitialState;

/**
 * ## toolSavesListReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function toolSavesListReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

    switch (action.type) {
        /**
         * ### Request starts
         *
         */
        case GET_LOCAL_TOOL_SAVES_LIST_REQUEST:
            // console.log(state, action);
            return state
                .set('isFetchingCollectionLocal', true);

        case GET_TOOL_SAVES_LIST_REQUEST:
            // console.log(state, action);
            return state
                .set('isFetchingCollectionRemote', true);

        case LOCAL_TOOL_SAVE_CREATE_REQUEST:
        case LOCAL_TOOL_SAVE_DELETE_REQUEST:
            // console.log(state, action);
            return state
                .set('isSavingMemberLocal', true)
                .set('error', null);

        case TOOL_SAVE_CREATE_REQUEST:
            // console.log(state, action);
            return state
                .set('isSavingMemberRemote', true)
                .set('error', null);

        /**
         * ### Request end successfully
         */
        case GET_LOCAL_TOOL_SAVES_LIST_SUCCESS:
            // console.log(state, action);
            return state
                .set('isFetchingCollectionLocal', false)
                .set('list', fromJS(action.payload));

        case GET_TOOL_SAVES_LIST_SUCCESS:
            // console.log(state, action);
            return state
                .set('isFetchingCollectionRemote', false)
                .set('list', fromJS(action.payload));

        case LOCAL_TOOL_SAVE_CREATE_SUCCESS:
        case LOCAL_TOOL_SAVE_DELETE_SUCCESS:
            // console.log(state, action);
            return state
                .set('isSavingMemberLocal', false);

        case TOOL_SAVE_CREATE_SUCCESS:
            // console.log(state, action);
            return state
                .set('isSavingMemberRemote', false);

        case LOCAL_TOOL_SAVE_CREATE_AND_EXIT_SUCCESS:
            // console.log(state, action);
            return state
                .set('isSavingMemberLocal', false)
                .set('error', null);

        case TOOL_SAVE_CREATE_AND_EXIT_SUCCESS:
            // console.log(state, action);
            return state
                .set('isSavingMemberRemote', false)
                .set('error', null);

        /**
         * User logged out.
         *
         */
        case LOGOUT_SUCCESS:
            // console.log(state, action);
            return state
                .set('list', fromJS([]));

        /**
         * ### Request fails
         */
        case GET_LOCAL_TOOL_SAVES_LIST_FAILURE:
        case GET_TOOL_SAVES_LIST_FAILURE:
        case LOCAL_TOOL_SAVE_CREATE_FAILURE:
        case LOCAL_TOOL_SAVE_DELETE_FAILURE:
        case TOOL_SAVE_CREATE_FAILURE:
            // console.log(state, action);
            return state
                .set('isFetchingCollectionLocal', false)
                .set('isFetchingCollectionRemote', false)
                .set('isSavingMemberLocal', false)
                .set('isSavingMemberRemote', false);

        /**
         * ### Sync interval is in effect and not been cleared
         */
        case TOOL_SAVES_SYNC_REQUEST:
            // console.log(state, action);
            return state
                .set('isSyncing', true);

        case TOOL_SAVES_SYNC_SUCCESS:
        case TOOL_SAVES_SYNC_FAILURE:
            // console.log(state, action);
            return state
                .set('isSyncing', false);

        /**
         * no state change, just an ability to track action requests...
         */
        case GET_LOCAL_TOOL_SAVES_LIST_BLANK_JSON:
        case DELETE_TOOL_SAVES_REQUEST:
            // console.log(state, action);
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
