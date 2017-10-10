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
    isFetchingCollectionLocal: false,
    isFetchingCollectionRemote: false,
    isFetchingMember: false,
    isSavingMemberLocal: false,
    isSavingMemberRemote: false,
    isSyncing: false,
    error: null
});

export default InitialState;
