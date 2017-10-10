/**
 * # globalActions.js
 *
 * Actions that are global in nature
 */
'use strict';

/**
 * ## Imports
 *
 * The actions supported
 */
const {
    SET_SESSION_TOKEN,
    SET_STORE,
    SET_STATE,
    GET_STATE,

    SET_ORGANISATION_IN_STATE_SUCCESS,
    SET_ORGANISATION_IN_STATE_FAILURE,
    SET_PROFILE_IN_STATE_SUCCESS,
    SET_PROFILE_IN_STATE_FAILURE
} = require('../../lib/constants').default;

const Store = require('../../lib/Store').default;

/**
 * ## set the sessionToken
 *
 */
export function setSessionToken(sessionToken) {
    return {
        type: SET_SESSION_TOKEN,
        payload: sessionToken
    };
}
/**
 * ## set the store
 *
 * this is the Redux store
 *
 * this is here to support Hot Loading
 *
 */
export function setStore(store) {
    return {
        type: SET_STORE,
        payload: store
    };
}
/**
 * ## set state
 *
 */
export function setState(newState) {
    return {
        type: SET_STATE,
        payload: newState
    };
}
/**
 * ## getState
 *
 */
export function getState(toggle) {
    return {
        type: GET_STATE,
        payload: toggle
    };
}

/**
 * Set the organisation and the profile in the state so that they
 * are available in the views.
 *
 */
export function setOrganisationInStateSuccess(organisationJSON) {
    return {
        type: SET_ORGANISATION_IN_STATE_SUCCESS,
        payload: organisationJSON
    };
}

export function setOrganisationInStateFailure() {
    return {
        type: SET_ORGANISATION_IN_STATE_FAILURE
    };
}

export function setOrganisationInState() {
    return dispatch => {
        return Store.getOrganisation()
            .then((organisationJSON) => {
                // console.log("Store.getOrganisation() -> organisationJSON: ", organisationJSON);

                if (organisationJSON) {
                    dispatch(setOrganisationInStateSuccess(organisationJSON));
                } else {
                    dispatch(setOrganisationInStateFailure());
                }
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                // console.log(error);
            });
    }
}

export function setProfileInStateSuccess(profileJSON) {
    return {
        type: SET_PROFILE_IN_STATE_SUCCESS,
        payload: profileJSON
    };
}

export function setProfileInStateFailure() {
    return {
        type: SET_PROFILE_IN_STATE_FAILURE
    };
}

export function setProfileInState() {
    return dispatch => {
        return Store.getProfile()
            .then((profileJSON) => {
                // console.log("Store.getProfile() -> profileJSON: ", profileJSON);

                if (profileJSON) {
                    dispatch(setProfileInStateSuccess(profileJSON));
                } else {
                    dispatch(setProfileInStateFailure());
                }
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                // console.log(error);
            });
    }
}
