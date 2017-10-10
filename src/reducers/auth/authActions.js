/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict';

/**
 * ## Imports
 *
 * The actions supported
 */
const {
    SESSION_TOKEN_REQUEST,
    SESSION_TOKEN_SUCCESS,
    SESSION_TOKEN_FAILURE,

    DELETE_TOKEN_REQUEST,
    DELETE_TOKEN_SUCCESS,

    LOGOUT,
    ORGANISATION_LOGIN,
    LOGIN,
    FORGOT_PASSWORD,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,

    DELETE_ORGANISATION_REQUEST,
    DELETE_ORGANISATION_SUCCESS,

    ORGANISATION_LOGIN_REQUEST,
    ORGANISATION_LOGIN_SUCCESS,
    ORGANISATION_LOGIN_FAILURE,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    ON_AUTH_FORM_FIELD_CHANGE,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE

} = require('../../lib/constants').default;

/**
 * Project requirements
 */
const BackendFactory = require('../../lib/BackendFactory').default;

import {Actions} from 'react-native-router-flux';

const AppAuthToken = require('../../lib/AppAuthToken').default;
const Store = require('../../lib/Store').default;

const _ = require('underscore');

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, logout or reset password
 */
export function logoutState() {
    return {
        type: LOGOUT
    };

}
export function organisationLoginState() {
    return {
        type: ORGANISATION_LOGIN
    };
}
export function loginState() {
    return {
        type: LOGIN
    };
}
export function forgotPasswordState() {
    return {
        type: FORGOT_PASSWORD
    };
}

/**
 * ## Logout actions
 */
export function logoutRequest() {
    return {
        type: LOGOUT_REQUEST
    };
}
export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    };
}
export function logoutFailure(error) {
    return {
        type: LOGOUT_FAILURE,
        payload: error
    };
}

/**
 * ## Logout
 * After dispatching the logoutRequest, get the sessionToken
 * and call AMP
 *
 * When the response from AMP is received and it's valid
 * change the state to login and finish the logout
 *
 * But if the call to AMP fails, like expired token or
 * no network connection, just send the failure
 *
 * And if you fail due to an invalid sessionToken, be sure
 * to delete it so the user can log in.
 *
 * How could there be an invalid sessionToken?  Maybe they
 * haven't used the app for a long time.  Or they used another
 * device and logged out there.
 */
export function logout() {
    return dispatch => {
        dispatch(logoutRequest());
        return new AppAuthToken().getSessionToken()

            .then((token) => {
                return BackendFactory(token).logout();
            })

            .then((response) => {
                // console.log("logout() -> response: ", response);
                return response.json();
            })

            .then((json) => {
                // console.log('parsed json', json);
                dispatch(loginState());
                dispatch(logoutSuccess());
                dispatch(deleteSessionToken());
                Actions.Login();
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(loginState());
                dispatch(logoutFailure(error));
                Actions.Login();
            });
    };
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field, value) {
    return {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: field, value: value}
    };
}

/**
 * ## SessionToken actions
 */
export function sessionTokenRequest() {
    return {
        type: SESSION_TOKEN_REQUEST
    };
}
export function sessionTokenRequestSuccess(token) {
    return {
        type: SESSION_TOKEN_SUCCESS,
        payload: token
    };
}
export function sessionTokenRequestFailure(error) {
    return {
        type: SESSION_TOKEN_FAILURE,
        payload: _.isUndefined(error) ? null : error
    };
}

/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest() {
    return {
        type: DELETE_TOKEN_REQUEST
    };
}
export function deleteTokenSuccess() {
    return {
        type: DELETE_TOKEN_SUCCESS
    };
}

/**
 * ## Delete session token
 *
 * Call the AppAuthToken deleteSessionToken
 */
export function deleteSessionToken() {
    return dispatch => {
        dispatch(deleteTokenRequest());
        return new AppAuthToken().deleteSessionToken()
            .then(() => {
                dispatch(deleteTokenSuccess());
            });
    };
}

/**
 * ## Token
 * If AppAuthToken has the sessionToken, the user is logged in
 * so set the state to logout.
 * Otherwise, if the organisation is present, the user will
 * default to the login in screen and if not to the organisation
 * login screen.
 */
export function getSessionToken() {
    return dispatch => {
        dispatch(sessionTokenRequest());
        return new AppAuthToken().getSessionToken()

            .then((token) => {
                // console.log("getSessionToken() -> token: ", token);
                if (token) {
                    dispatch(sessionTokenRequestSuccess(token));
                    dispatch(logoutState());
                    Actions.Drawer();
                } else {
                    dispatch(sessionTokenRequestFailure());
                    return Store.getOrganisation()
                        .then((organisationJSON) => {
                            // console.log("Store.getOrganisation() -> organisationJSON: ", organisationJSON);

                            if (organisationJSON) {
                                dispatch(loginState());
                                Actions.Login()
                            } else {
                                dispatch(organisationLoginState());
                                Actions.OrganisationLogin()
                            }
                        });
                }
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(sessionTokenRequestFailure(error));
                return Store.getOrganisation()
                    .then((organisationJSON) => {
                        // console.log("Store.getOrganisation() -> organisationJSON: ", organisationJSON);

                        if (organisationJSON) {
                            dispatch(loginState());
                            Actions.Login()
                        } else {
                            dispatch(organisationLoginState());
                            Actions.OrganisationLogin()
                        }
                    });
            });
    };
}

/**
 * ## saveSessionToken
 * @param {Object} token - object with params needed
 * for future request headers
 *
 * {
 * * uid: 'uid',
 * * client: 'client',
 * * accessToken: 'accessToken',
 * * tokenType: 'tokenType',
 * * expiry: 'expiry'
 * }
 */
export function saveSessionToken(token) {
    return new AppAuthToken().storeSessionToken(token);
}

/**
 * ## DeleteOrganisation actions
 */
export function deleteOrganisationRequest() {
    return {
        type: DELETE_ORGANISATION_REQUEST
    };
}
export function deleteOrganisationSuccess() {
    return {
        type: DELETE_ORGANISATION_SUCCESS
    };
}

/**
 * ## Delete organisation
 *
 * Call the Store deleteOrganisation
 */
export function deleteOrganisation() {
    return dispatch => {
        dispatch(deleteOrganisationRequest());
        return new Store().deleteOrganisation()
            .then(() => {
                dispatch(deleteOrganisationSuccess());
            });
    };
}

/**
 * ## Organisation login actions
 */
export function organisationLoginRequest() {
    return {
        type: ORGANISATION_LOGIN_REQUEST
    };
}

export function organisationLoginSuccess(uuid, json) {
    return {
        type: ORGANISATION_LOGIN_SUCCESS,
        payload: {uuid: uuid, json: json}
    };
}

export function organisationLoginFailure(error) {
    return {
        type: ORGANISATION_LOGIN_FAILURE,
        payload: error
    };
}

/**
 * ## organisationLogin
 * @param {string} uuid - company's UUID
 *
 * After calling Backend, if response is good, save the
 * uuid in the state and the json in state and store.
 *
 * If successful, set the state to login
 * otherwise, dispatch a failure
 */
export function organisationLogin(uuid) {
    return dispatch => {
        dispatch(organisationLoginRequest());
        return BackendFactory().organisationLogin(uuid)

            .then((response) => {
                // console.log("organisationLogin(uuid) -> response: ", response);
                return response.json();
            })

            .then((json) => {
                // console.log('parsed json', json);

                return Store.setOrganisation(json.data)
                    .then(() => {
                        dispatch(organisationLoginSuccess(uuid, json.data));
                        dispatch(loginState());
                        Actions.LoginStepTwo();
                    })
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(organisationLoginFailure(error));
            });
    };
}

/**
 * ## Login actions
 */
export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    };
}

export function loginSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        payload: token
    };
}

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        payload: error
    };
}

/**
 * ## Login
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, extract the
 * sessionToken (object containing params needed for future
 * request headers) from the headers and save it.
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */
export function login(email, password) {
    return dispatch => {
        dispatch(loginRequest());
        return BackendFactory().login({
                email: email,
                password: password
            })

            .then((response) => {
                console.log("login(email, password) -> response: ", response);
                var token = {
                    uid: response.headers.get('uid'),
                    client: response.headers.get('client'),
                    accessToken: response.headers.get('access-token'),
                    tokenType: response.headers.get('token-type'),
                    expiry: response.headers.get('expiry')
                };

                return saveSessionToken(token)
                    .then(() => {
                        return response.json();
                    })

                    .then((json) => {
                        return Store.getProfile()
                            .then((profileJSON) => {
                                console.log("Store.getProfile() -> profileJSON: ", profileJSON);

                                if (profileJSON) {
                                    Actions.TabBar();
                                } else {
                                    return Store.getAuthenticatedUsers()
                                        .then((arr) => {
                                            console.log("Store.getAuthenticatedUsers() -> arr: ", arr);

                                            if (!arr) arr = [];
                                            let present = arr.find((authentication) => (authentication.user.email === email));

                                            if (present) {
                                                Actions.TabBar();
                                            } else {
                                                Actions.TabBar();
                                            }

                                            dispatch(loginSuccess(token));
                                            dispatch(logoutState());
                                        })

                                        .catch((error) => {
                                            dispatch(loginFailure(error));
                                        });
                                }
                            });
                    })
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(loginFailure(error));
            });
    };
}

/**
 * ## ResetPassword actions
 */
export function resetPasswordRequest() {
    return {
        type: RESET_PASSWORD_REQUEST
    };
}

export function resetPasswordSuccess() {
    return {
        type: RESET_PASSWORD_SUCCESS
    };
}

export function resetPasswordFailure(error) {
    return {
        type: RESET_PASSWORD_FAILURE,
        payload: error
    };
}
/**
 * ## ResetPassword
 *
 * @param {string} email - the email address to reset password
 * *Note* There's no feedback to the user whether the email
 * address is valid or not.
 *
 * This functionality depends on setting AMP
 * up correctly ie, that emails are verified.
 * With that enabled, an email can be sent w/ a
 * form for setting the new password.
 */
export function resetPassword(email) {
    return dispatch => {
        dispatch(resetPasswordRequest());
        return BackendFactory().resetPassword({
                email: email
            })

            .then(() => {
                dispatch(loginState());
                dispatch(resetPasswordSuccess());
                Actions.pop();
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(resetPasswordFailure(error));
            });

    };
}
