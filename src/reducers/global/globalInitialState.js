/**
 * # globalInitialState.js
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
import {Record} from 'immutable';
/**
 * ## InitialState
 *
 * * currentOrganisationUUID - string entered in Organisation Login form
 * * currentOrganisation - object returned from AMP when validated
 * * currentUserToken - object returned from AMP when validated
 * * currentUser - object returned from AMP when validated
 * * currentToolsList - object returned from AMP when validated
 * * currentToolSavesList - object returned from AMP when validated
 * * showState - toggle for Header to display state
 * * currentState - object in Json format of the entire state
 * * store - the Redux store which is an object w/ 4 initial states
 *   * device
 *   * auth
 *   * global
 *   * profile
 *
 */
var InitialState = Record({
    currentOrganisationUUID: null,
    currentOrganisation: null,
    currentUserToken: null,
    currentUser: null,
    currentToolsList: null,
    currentToolSavesList: null,
    showState: false,
    currentState: null,
    store: null,
    loaded: null
});
export default InitialState;
