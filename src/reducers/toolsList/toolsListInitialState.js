/**
 * # toolsListInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';

const {Record, fromJS} = require('immutable');

var InitialState = Record({
    list: fromJS([]),
    isFetching: false,
    lockedViewPager: false
});

export default InitialState;
