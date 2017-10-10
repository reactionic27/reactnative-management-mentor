/**
 * # Login.js
 *
 * This class is a little complicated as it handles 4 states. It's also
 * a container so there is boilerplate from Redux similiar to ```App```.
 */
'use strict';

/**
 * ## Imports
 *
 * validate and underscore
 *
 */
import validate from 'validate.js';
import _ from 'underscore';

/**
 * ## UUID validation rule
 * read the message... ;)
 */
var uuidConstraints = {
    uuid: {
        format: {
            pattern: /^[a-z0-9]{8}$/,
            flags: "i",
            message: "must be 8 characters in length and contain only lower-case letters and numbers"
        }
    }
};

/**
 * ## Email validation setup
 * Used for validation of emails
 */
const emailConstraints = {
    from: {
        email: true
    }
};

/**
 * ## Password validation rule
 * read the message... ;)
 */
const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{8,72}$/;
const passwordConstraints = {
    password: {
        format: {
            pattern: passwordPattern,
            flags: "i",
            message: "must be between 8-72 characters in length"
        }
    }
};

/**
 * ## Name validation rule
 * read the message... ;)
 */
var nameConstraints = {
    name: {
        format: {
            pattern: /^[a-zA-Z\s]*$/,
            flags: "i",
            message: "must use only letters"
        }
    }
};

/**
 * ## Field Validation
 * @param {Object} state Redux state
 * @param {Object} action type & payload
 */
export default function fieldValidation(state, action) {
    const {field, value} = action.payload;

    switch (field) {
        /**
         * ### uuid validation
         * set the form field error
         */
        case('uuid'):
            let validUUID = _.isUndefined(validate({uuid: value},
                uuidConstraints));
            if (validUUID) {
                return state.setIn(['form', 'fields', 'uuidHasError'], false);
            } else {
                return state.setIn(['form', 'fields', 'uuidHasError'], true);
            }
            break;

        /**
         * ### email validation
         * set the form field error
         */
        case('email'):
            let validEmail = _.isUndefined(validate({from: value},
                emailConstraints));
            if (validEmail) {
                return state.setIn(['form', 'fields', 'emailHasError'], false);
            } else {
                return state.setIn(['form', 'fields', 'emailHasError'], true);
            }
            break;

        /**
         * ### password validation
         * set the form field error
         */
        case('password'):
            let validPassword = _.isUndefined(validate({password: value},
                passwordConstraints));
            if (validPassword) {
                return state.setIn(['form', 'fields', 'passwordHasError'], false);
            } else {
                return state.setIn(['form', 'fields', 'passwordHasError'], true);
            }
            break;

        /**
         * ### showPassword
         * toggle the display of the password
         */
        case('showPassword'):
            return state.setIn(['form', 'fields',
                'showPassword'], value);
            break;

        /**
         * ### first name validation
         * set the form field error
         */
        case('firstName'):
            let validFirstName = _.isUndefined(validate({name: value},
                nameConstraints));
            if (validFirstName) {
                return state.setIn(['form', 'fields', 'firstNameHasError'], false);
            } else {
                return state.setIn(['form', 'fields', 'firstNameHasError'], true);
            }
            break;

        /**
         * ### last name validation
         * set the form field error
         */
        case('lastName'):
            let validLastName = _.isUndefined(validate({name: value},
                nameConstraints));
            if (validLastName) {
                return state.setIn(['form', 'fields', 'lastNameHasError'], false);
            } else {
                return state.setIn(['form', 'fields', 'lastNameHasError'], true);
            }
            break;

    }
    return state;

}
