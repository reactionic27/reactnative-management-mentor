/**
 * # toolsListActions.js
 *
 * The actions to support the users tools
 */
'use strict';
/**
 * ## Imports
 *
 * The actions for toolsList
 */
const {
    DELETE_LOCAL_TOOLS_LIST_REQUEST,
    DELETE_LOCAL_TOOLS_LIST_SUCCESS,

    GET_LOCAL_TOOLS_LIST_REQUEST,
    GET_LOCAL_TOOLS_LIST_SUCCESS,
    GET_LOCAL_TOOLS_LIST_BLANK_JSON,
    GET_LOCAL_TOOLS_LIST_FAILURE,

    GET_TOOLS_LIST_REQUEST,
    GET_TOOLS_LIST_SUCCESS,
    GET_TOOLS_LIST_FAILURE,

    LOCK_VIEW_PAGER,
    UNLOCK_VIEW_PAGER,
} = require('../../lib/constants').default;

/**
 * BackendFactory - base class for server implementation
 * AppAuthToken for localStorage sessionToken access
 */
const BackendFactory = require('../../lib/BackendFactory').default;

import {Actions} from 'react-native-router-flux';

const AppAuthToken = require('../../lib/AppAuthToken').default;
const Store = require('../../lib/Store').default;

/**
 * ## DeleteLocalTools actions
 */
export function deleteToolsRequest() {
    return {
        type: DELETE_LOCAL_TOOLS_LIST_REQUEST
    };
}
export function deleteToolsSuccess() {
    return {
        type: DELETE_LOCAL_TOOLS_LIST_SUCCESS
    };
}

/**
 * ## Delete ratings
 *
 * Call the Store deleteRatings
 */
export function deleteTools() {
    return dispatch => {
        dispatch(deleteToolsRequest());
        return new Store().deleteTools()
            .then(() => {
                dispatch(deleteToolsSuccess());
            });
    };
}

/**
 * ## Retrieving local tools actions
 */
export function getLocalToolsRequest() {
    return {
        type: GET_LOCAL_TOOLS_LIST_REQUEST
    };
}
export function getLocalToolsSuccess(json) {
    return {
        type: GET_LOCAL_TOOLS_LIST_SUCCESS,
        payload: json
    };
}
export function getLocalToolsBlankJSON() {
    return {
        type: GET_LOCAL_TOOLS_LIST_BLANK_JSON
    };
}
export function getLocalToolsFailure(json) {
    return {
        type: GET_LOCAL_TOOLS_LIST_FAILURE,
        payload: json
    };
}
export function getLocalTools() {
    return dispatch => {
        dispatch(getLocalToolsRequest());
        /**
         * Going to grab locally held data, which will exist as there is a
         * sessionToken present.
         */
        return Store.getTools()
            .then((json) => {
                // console.log('parsed json', json);

                if (json) {
                    return Store.setTools(json)
                        .then(() => {
                            dispatch(getLocalToolsSuccess(json));
                        });
                } else {
                    dispatch(getLocalToolsBlankJSON());
                }
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(getLocalToolsFailure(error));
            });
    };
}


/**
 * ## Retrieving tools actions
 */
export function getToolsRequest() {
    return {
        type: GET_TOOLS_LIST_REQUEST
    };
}
export function getToolsSuccess(json) {
    return {
        type: GET_TOOLS_LIST_SUCCESS,
        payload: json
    };
}
export function getToolsFailure(json) {
    return {
        type: GET_TOOLS_LIST_FAILURE,
        payload: json
    };
}
/**
 * ## Getter actions
 *
 */
export function getTools(sessionToken) {

    return dispatch => {
        dispatch(getToolsRequest());

        // Store or get a sessionToken
        return new AppAuthToken().getSessionToken(sessionToken)
            .then((token) => {
                return BackendFactory(token).getTools();
            })

            .then((response) => {
                // console.log("getTools(sessionToken) -> response: ", response);
                return response.json();
            })

            .then((json) => {
                // console.log('parsed json', json);
                return Store.setTools(json.data)
                    .then(() => {
                        dispatch(getToolsSuccess(json.data));
                    })
            })

            .catch((error) => {
                /**
                 * Going to check first if the token is corrupted.
                 * This will be done in getProfile() so just silently fail here.
                 * Finally, throw error as usual.
                 */
                if (error === "Authorized users only.") {
                    // console.log("ERROR: ", error);
                } else {
                    dispatch(getToolsFailure(error));
                }
            });
    };
}

/**
 * ## (un)lockViewPager
 *
 */
export function lockViewPager() {
    return {
        type: LOCK_VIEW_PAGER
    };
}

export function unlockViewPager() {
    return {
        type: UNLOCK_VIEW_PAGER
    };
}
