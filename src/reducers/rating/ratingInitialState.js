/**
 * # ratingInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';

const {Record} = require('immutable');

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 *
 * The originalRating is what AMP provided and has the objectId
 * The fields are what display on the UI
 */
const Form = Record({
    originalRecord: new (Record({
        productivity: null,
        enthusiasm: null
    })),
    disabled: false,
    error: null,
    isValid: false,
    isFetching: false,
    isSyncing: false,
    fields: new (Record({
        productivity: null,
        enthusiasm: null
    }))
});


var InitialState = Record({
    form: new Form
});

export default InitialState;
