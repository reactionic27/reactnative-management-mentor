/**
 * # globalReducer.js
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
    SET_SESSION_TOKEN,

    DELETE_ORGANISATION_SUCCESS,

    ORGANISATION_LOGIN_SUCCESS,
    LOGIN_SUCCESS,
    SESSION_TOKEN_SUCCESS,

    SET_ORGANISATION_IN_STATE_SUCCESS,
    SET_ORGANISATION_IN_STATE_FAILURE,
    SET_PROFILE_IN_STATE_SUCCESS,
    SET_PROFILE_IN_STATE_FAILURE,

    GET_LOCAL_PROFILE_SUCCESS,
    GET_PROFILE_SUCCESS,
    DELETE_PROFILE_SUCCESS,

    LOGOUT_SUCCESS,

    GET_STATE,
    SET_STATE,
    SET_STORE

} = require('../../lib/constants').default;

import InitialState from './globalInitialState';

const initialState = new InitialState;
/**
 * ## globalReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function globalReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.merge(state);

    switch (action.type) {
        /**
         * ### Save the sessionToken
         */
        case SET_SESSION_TOKEN:
            return state.set('sessionToken', action.payload);

        /**
         * ### Save the payload in the state
         *
         * This payload is the ```currentOrganisation``` object or the
         * returned ```currentUser``` from AMP
         */
        case SET_ORGANISATION_IN_STATE_SUCCESS:
            return state
                // .set('loaded', true)
                .set('currentOrganisation', action.payload);

        case SET_ORGANISATION_IN_STATE_FAILURE:
            return state;
                // .set('loaded', true);

        case SET_PROFILE_IN_STATE_SUCCESS:
            return state
                .set('loaded', true)
                .set('currentUser', action.payload);

        case SET_PROFILE_IN_STATE_FAILURE:
            return state
                .set('loaded', true);

        /**
         * ### Save the payload in the store
         *
         * This payload is the ```currentOrganisation``` object returned from AMP
         * and the UUID entered in the Organisation Login form.
         */
        case ORGANISATION_LOGIN_SUCCESS:
            return state
                .set('currentOrganisationUUID', action.payload.uuid)
                .set('currentOrganisation', action.payload.json);

        case DELETE_ORGANISATION_SUCCESS:
            return state
                .set('currentOrganisationUUID', null)
                .set('currentOrganisation', null);

        /**
         * ### Save the payload in the store
         *
         * This payload is the ```currentUserToken``` object extracted from the
         * headers in the response from AMP.
         */
        case LOGIN_SUCCESS:
            return state.set('currentUserToken', action.payload);

        case SESSION_TOKEN_SUCCESS:
            return state.set('currentUserToken', action.payload.sessionToken);

        /**
         * ### Clear currentUserToken
         *
         */
        case LOGOUT_SUCCESS:
            return state
                .set('currentUserToken', null);

        /**
         * ### Save the payload in the store
         *
         * This payload is the ```currentUser``` object returned from AMP
         */
        case GET_LOCAL_PROFILE_SUCCESS:
        case GET_PROFILE_SUCCESS:
            return state
                .set('currentOrganisation', action.payload.organisation)
                .set('currentUser', action.payload);

        case DELETE_PROFILE_SUCCESS:
            return state.set('currentUser', null);

        /**
         * ### sets the payload into the store
         *
         * *Note* this is for support of Hot Loading - the payload is the
         * ```store``` itself.
         *
         */
        case SET_STORE:
            return state
                .set('store', action.payload);

        /**
         * ### Get the current state from the store
         *
         * The Redux ```store``` provides the state object.
         * We convert each key to JSON and set it in the state
         *
         * *Note*: the global state removes the ```store```, otherwise,
         * when trying to convert to JSON, it will be recursive and fail
         */
        case GET_STATE:
            let _state = state.store.getState();

            if (action.payload) {
                let newState = {};
                newState['auth'] = _state.auth.toJS();
                newState['device'] = _state.device.toJS();
                newState['profile'] = _state.profile.toJS();
                newState['rating'] = _state.rating.toJS();


                //Make sure global doesn't have the previous currentState
                //let _noCurrentState =  _state.global.set('currentState',null);
                //let _noStore = _noCurrentState.set('store',null);

                newState['global'] = _state.global
                    .set('currentState', null)
                    .set('store', null).toJS();

                return state
                    .set('showState', action.payload)
                    .set('currentState', newState);
            } else {
                return state
                    .set('showState', action.payload);
            }

        /**
         * ### Set the state
         *
         * This is in support of Hot Loading
         *
         */
        case SET_STATE:
            debugger;
            var global = JSON.parse(action.payload).global;
            var next = state.set('currentUserToken', global.currentUserToken)
                .set('showState', false)
                .set('currentState', null);
            return next;

    }

    return state;
}
