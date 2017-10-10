/**
 * # profileActions.js
 *
 * The actions to support the users profile
 */
'use strict';
/**
 * ## Imports
 *
 * The actions for profile
 */
const {
    DELETE_PROFILE_REQUEST,
    DELETE_PROFILE_SUCCESS,

    GET_LOCAL_PROFILE_REQUEST,
    GET_LOCAL_PROFILE_SUCCESS,
    GET_LOCAL_PROFILE_BLANK_JSON,
    GET_LOCAL_PROFILE_FAILURE,

    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,

    LOCAL_PROFILE_UPDATE_REQUEST,
    LOCAL_PROFILE_UPDATE_SUCCESS,
    LOCAL_PROFILE_UPDATE_FAILURE,

    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAILURE,

    PROFILE_SYNC_REQUEST,
    PROFILE_SYNC_SUCCESS,
    PROFILE_SYNC_FAILURE,

    LOADING_AVATAR_REQUEST,
    LOADING_AVATAR_SUCCESS,
    LOADING_AVATAR_FAILURE,

    ON_PROFILE_FORM_FIELD_CHANGE,
    SET_PROFILE_FORM_FIRST_TIME
} = require('../../lib/constants').default;

/**
 * BackendFactory - base class for server implementation
 * AppAuthToken for localStorage sessionToken access
 */
const BackendFactory = require('../../lib/BackendFactory').default;

const authActions = require('../auth/authActions');

import {Actions} from 'react-native-router-flux';

const AppAuthToken = require('../../lib/AppAuthToken').default;
const Store = require('../../lib/Store').default;

/**
 * Globally define the syncing interval
 */
var syncInterval;
const SYNC_INTERVAL = 5000;

/**
 * ## Retrieving local profile actions
 */
export function getLocalProfileRequest() {
    return {
        type: GET_LOCAL_PROFILE_REQUEST
    };
}
export function getLocalProfileSuccess(json) {
    return {
        type: GET_LOCAL_PROFILE_SUCCESS,
        payload: json
    };
}
export function getLocalProfileBlankJSON() {
    return {
        type: GET_LOCAL_PROFILE_BLANK_JSON
    };
}
export function getLocalProfileFailure(json) {
    return {
        type: GET_LOCAL_PROFILE_FAILURE,
        payload: json
    };
}
export function getLocalProfile() {
    return dispatch => {
        dispatch(getLocalProfileRequest());
        /**
         * Going to grab locally held data, which will exist as there is a
         * sessionToken present.
         */
        return Store.getProfile()
            .then((json) => {
                // console.log('parsed json', json);

                if (json) {
                    return Store.setProfile(json)
                        .then(() => {
                            dispatch(getLocalProfileSuccess(json));
                        });
                } else {
                    dispatch(getLocalProfileBlankJSON());
                }
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(getLocalProfileFailure(error));
            });
    };
}

/**
 * ## Retrieving profile actions
 */
export function getProfileRequest() {
    return {
        type: GET_PROFILE_REQUEST
    };
}
export function getProfileSuccess(json) {
    return {
        type: GET_PROFILE_SUCCESS,
        payload: json
    };
}
export function getProfileFailure(json) {
    return {
        type: GET_PROFILE_FAILURE,
        payload: json
    };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, logout or reset password
 */
export function getProfile(sessionToken) {

    clearInterval(syncInterval);

    return dispatch => {
        dispatch(getProfileRequest());

        // Store or get a sessionToken
        return new AppAuthToken().getSessionToken(sessionToken)
            .then((token) => {
                return BackendFactory(token).getProfile();
            })

            .then((response) => {
                // console.log("getProfile(sessionToken) -> response: ", response);
                return response.json();
            })

            .then((json) => {
                // console.log('parsed json', json);

                return Store.setProfile(json.data)
                    .then(() => {
                        return Store.setOrganisation(json.data.organisation)
                            .then(() => {
                                dispatch(getProfileSuccess(json.data));
                            });
                    });
            })

            .catch((error) => {
                /**
                 * Going to check first if the server is down.
                 * If it is, then we've already can grabbed locally held data, so we can
                 * just display that. If not, make sure to log out if the token is corrupted.
                 * Finally, throw error as usual.
                 */
                if (error.name === "TypeError" && error.message === "Network request failed") {
                    syncInterval = setInterval(function () {
                        dispatch(profileSync(sessionToken));
                    }, SYNC_INTERVAL);
                } else if (error === "Authorized users only.") {
                    // console.log("ERROR: ", error);
                    dispatch(authActions.logout());
                    dispatch(getProfileFailure("There has been a problem authenticating your account, please try logging in again."));
                } else {
                    dispatch(getProfileFailure(error));
                }
            });
    };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, logout or reset password
 */
export function localProfileUpdateRequest() {
    return {
        type: LOCAL_PROFILE_UPDATE_REQUEST
    };
}
export function localProfileUpdateSuccess() {
    return {
        type: LOCAL_PROFILE_UPDATE_SUCCESS
    };
}
export function localProfileUpdateFailure(json) {
    return {
        type: LOCAL_PROFILE_UPDATE_FAILURE,
        payload: json
    };
}
/**
 * ## updateProfile
 * @param {string} email - user's email
 * @param {string} firstName - user's first name
 * @param {string} lastName - user's last name
 * @param {string} age - user's age
 * @param {string} gender - user's gender
 * @param {string} nationality - user's nationality
 * @param {string} avatar - base64 string of user's avatar
 *
 * Update local store.
 *
 */
export function updateLocalProfile(email, firstName, lastName, age, gender, nationality, avatar) {
    return dispatch => {
        dispatch(localProfileUpdateRequest());
        // console.log("updateLocalProfile(email, firstName, lastName, age, gender, nationality, avatar): ", email, firstName, lastName, age, gender, nationality);
        /**
         * Going to set locally held data, which can be synced next
         * time online.
         */
        return Store.updateProfile({
                email: email,
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                nationality: nationality,
                avatar: avatar
            })
            .then(() => {
                dispatch(localProfileUpdateSuccess());
                dispatch(getLocalProfile());
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(localProfileUpdateFailure(error));
            });
    };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, logout or reset password
 */
export function profileUpdateRequest() {
    return {
        type: PROFILE_UPDATE_REQUEST
    };
}
export function profileUpdateSuccess() {
    return {
        type: PROFILE_UPDATE_SUCCESS
    };
}
export function profileUpdateFailure(json) {
    return {
        type: PROFILE_UPDATE_FAILURE,
        payload: json
    };
}
export function saveSessionToken(token) {
    return new AppAuthToken().storeSessionToken(token);
}
/**
 * ## updateProfile
 * @param {string} email - user's email
 * @param {string} firstName - user's first name
 * @param {string} lastName - user's last name
 * @param {string} age - user's age
 * @param {string} gender - user's gender
 * @param {string} nationality - user's nationality
 * @param {string} avatar - base64 string of user's avatar
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, AMP is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on AMP
 *
 */
export function updateProfile(email, firstName, lastName, age, gender, nationality, avatar) {

    clearInterval(syncInterval);

    // Will store the token for later use
    let sessionToken;

    return dispatch => {
        dispatch(profileUpdateRequest());
        // console.log("updateProfile(email, firstName, lastName, age, gender, nationality, avatar): ", email, firstName, lastName, age, gender, nationality);
        return new AppAuthToken().getSessionToken()

            .then((token) => {
                sessionToken = token;
                return BackendFactory(token).updateProfile(
                    {
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        age: age,
                        gender: gender,
                        nationality: nationality,
                        avatar: avatar
                    }
                );
            })

            .then((response) => {
                // console.log("updateProfile(email, firstName, lastName, age, gender, nationality, avatar, sessionToken) -> response: ", response);
                return response.json();
            })

            .then((json) => {
                // console.log('parsed json', sessionToken, json);

                // Need to update the session token with the new uid (email)
                // in case it has changed as the change has now been persisted.
                let newToken = sessionToken;
                newToken.uid = json.data.email;
                
                return saveSessionToken(newToken)
                    .then(() => {
                        dispatch(profileUpdateSuccess());
                        dispatch(getProfile());
                        Actions.Drawer();
                    });
            })

            .catch((error) => {
                /**
                 * Going to check first if the server is down.
                 * If it is, then we've already can grabbed locally held data, so we can
                 * just display that. If not, then throw error as usual.
                 */
                if (error.name === "TypeError" && error.message === "Network request failed") {
                    syncInterval = setInterval(function () {
                        // Send the new session token to the sync request.
                        // If catching from the first block will be the original token
                        // as nothing will have changed here or on the server.
                        dispatch(profileSync(sessionToken));
                    }, SYNC_INTERVAL);
                } else {
                    // console.log("ERROR: ", error);
                    dispatch(profileUpdateFailure(error));
                }
            });
    };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, logout or reset password
 */
export function profileSyncRequest() {
    return {
        type: PROFILE_SYNC_REQUEST
    };
}
export function profileSyncSuccess() {
    return {
        type: PROFILE_SYNC_SUCCESS
    };
}
export function profileSyncFailure(json) {
    return {
        type: PROFILE_SYNC_FAILURE,
        payload: json
    };
}
/**
 * ## profileSync
 * @param {Object} sessionToken - the sessionToken from AMP
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, AMP is called, the data is pulled from local
 * store and sent to update. If successful, get the profile so that the
 * screen is updated with the data as now persisted on AMP
 *
 */
export function profileSync(sessionToken) {
    return dispatch => {
        dispatch(profileSyncRequest());
        // console.log("profileSync(sessionToken) -> sessionToken: ", sessionToken);

        return Store.getProfile()
            .then((json) => {
                // console.log('parsed json', json);

                return new AppAuthToken().getSessionToken(sessionToken)

                    .then((token) => {
                        return BackendFactory(token).updateProfile(json);
                    })

                    .then((response) => {
                        // console.log("updateProfile(sessionToken) -> response: ", response);
                        return response.json();
                    })

                    .then((json) => {
                        // console.log('parsed json', json);

                        clearInterval(syncInterval);

                        dispatch(profileSyncSuccess());
                        dispatch(getProfile());
                        Actions.Drawer();
                    })

                    .catch((error) => {
                        // console.log("ERROR: ", error);
                        dispatch(profileSyncFailure(error));
                    });
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(profileSyncFailure(error));
            });
    };
}

/**
 * ## DeleteProfile actions
 */
export function deleteProfileRequest() {
    return {
        type: DELETE_PROFILE_REQUEST
    };
}
export function deleteProfileSuccess() {
    return {
        type: DELETE_PROFILE_SUCCESS
    };
}

/**
 * ## Delete profile
 *
 * Call the Store deleteProfile
 */
export function deleteProfile() {
    return dispatch => {
        dispatch(deleteProfileRequest());
        return new Store().deleteProfile()
            .then(() => {
                dispatch(deleteProfileSuccess());
            });
    };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, logout or reset password
 */
export function loadingAvatarRequest() {
    return {
        type: LOADING_AVATAR_REQUEST
    };
}
export function loadingAvatarSuccess() {
    return {
        type: LOADING_AVATAR_SUCCESS
    };
}
export function loadingAvatarFailure(json) {
    return {
        type: LOADING_AVATAR_FAILURE,
        payload: json
    };
}
export function dispatchLoadingAvatarRequest() {
    return dispatch => {
        dispatch(loadingAvatarRequest());
    };
}
export function dispatchLoadingAvatarSuccess() {
    return dispatch => {
        dispatch(loadingAvatarSuccess());
    };
}
export function dispatchLoadingAvatarFailure(json) {
    return dispatch => {
        dispatch(loadingAvatarFailure(json));
    };
}

/**
 * ## onProfileFormFieldChange
 *
 */
export function onProfileFormFieldChange(field, value) {
    return {
        type: ON_PROFILE_FORM_FIELD_CHANGE,
        payload: {field: field, value: value}
    };
}

/**
 * ## onProfileFormFieldChange
 *
 */
export function setProfileFormFirstTime(bool) {
    return {
        type: SET_PROFILE_FORM_FIRST_TIME,
        payload: bool
    };
}
