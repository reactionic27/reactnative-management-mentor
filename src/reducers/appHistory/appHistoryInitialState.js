/**
 * # appHistoryInitialState.js
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
 * * authenticatedUsers - array containing all users that have ever signed in on this device and the times of sign in
 * * visitedRatingPage - boolean initially true and set to false when Rating Page visited for the first time
 * * visitedTeamHistoricalPage - boolean initially true and set to false when TeamHistorical Page visited for the first time
 *
 */
var InitialState = Record({
    authenticatedUsers: [],
    visitedRatingPage: true,
    visitedTeamHistoricalPage: true
});

export default InitialState;
