/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict';
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('./authInitialState').default;
const fieldValidation = require('../../lib/fieldValidation').default;
const formValidation = require('./authFormValidation').default;

/**
 * ## Auth actions
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

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    DELETE_ORGANISATION_REQUEST,

    ORGANISATION_LOGIN_REQUEST,
    ORGANISATION_LOGIN_SUCCESS,
    ORGANISATION_LOGIN_FAILURE,

    ON_AUTH_FORM_FIELD_CHANGE,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,

    SET_STATE
} = require('../../lib/constants').default;

const initialState = new InitialState;
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function authReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

    switch (action.type) {
        /**
         * ### Requests start
         * set the form to fetching and clear any errors
         */
        case SESSION_TOKEN_REQUEST:
        case LOGOUT_REQUEST:
        case ORGANISATION_LOGIN_REQUEST:
        case LOGIN_REQUEST:
        case RESET_PASSWORD_REQUEST:
            let nextState = state
                .setIn(['form', 'isFetching'], true)
                .setIn(['form', 'error'], null);
            return nextState;

        /**
         * ### Logout state
         * The user has successfully access AMP
         * Clear the form's error and all the fields
         */
        case LOGOUT:
            return formValidation(
                state
                    .setIn(['form', 'state'], action.type)
                    .setIn(['form', 'error'], null)
                    .setIn(['form', 'fields', 'email'], '')
                    .setIn(['form', 'fields', 'password'], '')
            );

        /**
         * ### Organisation Login state
         * The user isn't logged in and there isn't an
         * organisation UUID saved, and needs to
         * set that UUID before logging in
         *
         * Set the form state and clear any errors
         */
        case ORGANISATION_LOGIN:
            return formValidation(
                state
                    .setIn(['form', 'state'], action.type)
                    .setIn(['form', 'error'], null)
            );

        /**
         * ### Login in state
         * The user isn't logged in, and needs to
         * login or reset password
         *
         * Set the form state and clear any errors
         */
        case LOGIN:
        case FORGOT_PASSWORD:
            return formValidation(
                state
                    .setIn(['form', 'state'], action.type)
                    .setIn(['form', 'error'], null)
            );

        /**
         * ### Auth form field change
         *
         * Set the form's field with the value
         * Clear the forms error
         * Pass the fieldValidation results to the
         * the formValidation
         */
        case ON_AUTH_FORM_FIELD_CHANGE:
        {
            const {field, value} = action.payload;
            let nextState = state
                .setIn(['form', 'fields', field], value)
                .setIn(['form', 'error'], null);

            var finalState = formValidation(
                fieldValidation(nextState, action),
                action
            );

            return finalState;
        }
        /**
         * ### Requests end, good or bad
         * Set the fetching flag so the forms will be enabled
         */
        case SESSION_TOKEN_SUCCESS:
        case SESSION_TOKEN_FAILURE:
        case ORGANISATION_LOGIN_SUCCESS:
        case LOGIN_SUCCESS:
        case LOGOUT_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return state
                .setIn(['form', 'isFetching'], false);

        /**
         * ### Access to AMP denied or failed
         * The fetching is done, but save the error
         * for display to the user
         */
        case ORGANISATION_LOGIN_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
        case RESET_PASSWORD_FAILURE:
            // console.log(action);
            return state
                .setIn(['form', 'isFetching'], false)
                .setIn(['form', 'error'], action.payload);


        /**
         * no state change, just an ability to track action requests...
         */
        case DELETE_TOKEN_REQUEST:
        case DELETE_TOKEN_SUCCESS:
        case DELETE_ORGANISATION_REQUEST:
            return state;

        /**
         * ### Hot Loading support
         *
         * Set all the field values from the payload
         */
        case SET_STATE:
            debugger;
            var form = JSON.parse(action.payload).auth.form;

            var next = state
                .setIn(['form', 'state'], form.state)
                .setIn(['form', 'disabled'], form.disabled)
                .setIn(['form', 'error'], form.error)
                .setIn(['form', 'isValid'], form.isValid)
                .setIn(['form', 'isFetching'], form.isFetching)
                .setIn(['form', 'fields', 'uuid'], form.fields.uuid)
                .setIn(['form', 'fields', 'uuidHasError'], form.fields.uuidHasError)
                .setIn(['form', 'fields', 'email'], form.fields.email)
                .setIn(['form', 'fields', 'emailHasError'], form.fields.emailHasError)
                .setIn(['form', 'fields', 'password'], form.fields.password)
                .setIn(['form', 'fields', 'passwordHasError'], form.fields.passwordHasError);

            return next;
    }
    /**
     * ## Default
     */
    return state;
}
