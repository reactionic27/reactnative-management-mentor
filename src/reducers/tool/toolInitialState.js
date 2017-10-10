/**
 * # toolInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';

const {Record, fromJS, Map} = require('immutable');

var Card = Record({
    fields: Map(),
    fieldValues: Map(),
    humanValues: Map()
});

var Table = Record({
    newRowValues: Map(),
    fields: Map(),
    fieldValues: Map(),
    humanValues: Map()
});

var InitialState = Record({
    cards: new Card(),
    tables: new Table(),
    data: Map(),
    staticData: Map(),
    dependencyIds: fromJS([]),
    updatedIds: fromJS([]),
    lastAddedTableId: null,
    uuid: null,
    name: null,
    editedField: false
});

export default InitialState;
