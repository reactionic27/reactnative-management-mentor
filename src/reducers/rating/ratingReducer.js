/**
 * # ratingReducer.js
 *
 * The reducer user rating actions
 */
'use strict';

/**
 * ## Imports
 *
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const fieldValidation = require('../../lib/fieldValidation').default;
const formValidation = require('./ratingFormValidation').default;

/**
 * ## Actions
 *
 */
const {
    ON_RATING_FORM_FIELD_CHANGE,

    DELETE_RATINGS_REQUEST,

    GET_LOCAL_RATINGS_REQUEST,
    GET_LOCAL_RATINGS_SUCCESS,
    GET_LOCAL_RATINGS_BLANK_JSON,
    GET_LOCAL_RATINGS_FAILURE,

    GET_RATINGS_REQUEST,
    GET_RATINGS_SUCCESS,
    GET_RATINGS_FAILURE,

    LOCAL_RATING_CREATE_REQUEST,
    LOCAL_RATING_CREATE_SUCCESS,
    LOCAL_RATING_CREATE_FAILURE,

    RATING_CREATE_REQUEST,
    RATING_CREATE_SUCCESS,
    RATING_CREATE_FAILURE,

    RATINGS_SYNC_REQUEST,
    RATINGS_SYNC_SUCCESS,
    RATINGS_SYNC_FAILURE,

    LOGOUT_SUCCESS,

    SET_STATE
} = require('../../lib/constants').default;

/**
 * ## Initial State
 *
 */
const InitialState = require('./ratingInitialState').default;
const initialState = new InitialState;

/**
 * ## ratingReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function ratingReducer(state = initialState, action) {
    let nextRatingState = null;

    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

    switch (action.type) {
        /**
         * ### Request starts
         * set the form to fetching and clear any errors
         *
         */
        case GET_LOCAL_RATINGS_REQUEST:
        case GET_RATINGS_REQUEST:
            return state;

        case LOCAL_RATING_CREATE_REQUEST:
        case RATING_CREATE_REQUEST:
            return state
                .setIn(['form', 'isFetching'], true)
                .setIn(['form', 'error'], null);

        /**
         * ### Request end successfully
         * set the form to fetching as done
         */
        case LOCAL_RATING_CREATE_SUCCESS:
        case RATING_CREATE_SUCCESS:
            return state.setIn(['form', 'isFetching'], false);

        /**
         * ### Request ends successfully
         * TODO: Need to check if today's rating has been set and, if so, disable the submit button
         */
        case GET_LOCAL_RATINGS_SUCCESS:
        case GET_RATINGS_SUCCESS:
            nextRatingState = state
                .setIn(['form', 'originalRecord', 'productivity'], action.payload.productivity)
                .setIn(['form', 'originalRecord', 'enthusiasm'], action.payload.enthusiasm)

                .setIn(['form', 'fields', 'productivity'], action.payload.productivity)
                .setIn(['form', 'fields', 'enthusiasm'], action.payload.enthusiasm)

                .setIn(['form', 'error'], null);

            return formValidation(
                fieldValidation(nextRatingState, action)
                , action);

        /**
         * User logged out, so reset form fields.
         *
         */
        case LOGOUT_SUCCESS:
            nextRatingState = state
                .setIn(['form', 'originalRecord', 'productivity'], null)
                .setIn(['form', 'originalRecord', 'enthusiasm'], null)

                .setIn(['form', 'fields', 'productivity'], null)
                .setIn(['form', 'fields', 'enthusiasm'], null)

                .setIn(['form', 'error'], null);
            return formValidation(nextRatingState, action);

        /**
         * ### Request fails
         * we're done fetching and the error needs to be displayed to the user
         */
        case GET_LOCAL_RATINGS_FAILURE:
        case GET_RATINGS_FAILURE:
        case LOCAL_RATING_CREATE_FAILURE:
        case RATING_CREATE_FAILURE:
            return state
                .setIn(['form', 'isFetching'], false)
                .setIn(['form', 'error'], action.payload);

        /**
         * ### form fields have changed
         *
         * Set the state with the fields, clear the form error
         * and perform field and form validation
         */
        case ON_RATING_FORM_FIELD_CHANGE:
        {
            const {field, value} = action.payload;
            let nextState = state
                .setIn(['form', 'fields', field], value)
                .setIn(['form', 'error'], null);

            return formValidation(
                fieldValidation(nextState, action),
                action
            );
        }

        /**
         * ### Sync interval is in effect and not been cleared
         */
        case RATINGS_SYNC_REQUEST:
            return state
                .setIn(['form', 'isSyncing'], true);

        case RATINGS_SYNC_SUCCESS:
        case RATINGS_SYNC_FAILURE:
            return state
                .setIn(['form', 'isSyncing'], false);

        /**
         * no state change, just an ability to track action requests...
         */
        case GET_LOCAL_RATINGS_BLANK_JSON:
        case DELETE_RATINGS_REQUEST:
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
            var rating = JSON.parse(action.payload).rating.form;
            return state
                .setIn(['form', 'disabled'], rating.disabled)
                .setIn(['form', 'error'], rating.error)
                .setIn(['form', 'isValid'], rating.isValid)
                .setIn(['form', 'isFetching'], rating.isFetching)

                .setIn(['form', 'fields', 'productivity'], rating.fields.productivity)
                .setIn(['form', 'fields', 'enthusiasm'], rating.fields.enthusiasm);

    }//switch
    /**
     * # Default
     */
    return state;
}
