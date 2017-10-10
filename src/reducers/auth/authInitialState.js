/**
 * # authInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';
/**
 * ## Import
 */
const {Record} = require('immutable');
const {
    ORGANISATION_LOGIN
} = require('../../lib/constants').default;

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
    state: ORGANISATION_LOGIN,
    disabled: false,
    error: null,
    isValid: false,
    isFetching: false,
    fields: new (Record({
        uuid: '',
        uuidHasError: false,
        email: '',
        emailHasError: false,
        password: '',
        passwordHasError: false,
        showPassword: false
        // uuid: 'abcd1234',
        // uuidHasError: false,
        // email: 'matthew@weareapps.com',
        // emailHasError: false,
        // password: 'changeme',
        // passwordHasError: false,
        // showPassword: false
    }))
});

/**
 * ## InitialState
 * The form is set
 */
var InitialState = Record({
    form: new Form
});
export default InitialState;

