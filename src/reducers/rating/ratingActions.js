/**
 * # ratingActions.js
 *
 * The actions to support the users ratings
 */
'use strict';
/**
 * ## Imports
 *
 * The actions for rating
 */
const {
    DELETE_RATINGS_REQUEST,
    DELETE_RATINGS_SUCCESS,

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

    ON_RATING_FORM_FIELD_CHANGE
} = require('../../lib/constants').default;

/**
 * BackendFactory - base class for server implementation
 * AppAuthToken for localStorage sessionToken access
 */
const _ = require('underscore');
const BackendFactory = require('../../lib/BackendFactory').default;

import {Actions} from 'react-native-router-flux';

const AppAuthToken = require('../../lib/AppAuthToken').default;
const Store = require('../../lib/Store').default;
const moment = require('moment');

/**
 * Globally define the syncing interval
 */
var syncInterval;
const SYNC_INTERVAL = 5000;

const RATING_TIME_OFFSET_DAYS = -1;
const RATING_TIME_OFFSET_HOURS = 12;
const RATING_TIME_OFFSET_MINUTES = 0;

import {
    Platform,
    Alert
} from 'react-native';

var PushNotification = require('react-native-push-notification');
PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        // console.log('TOKEN:', token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        // console.log('NOTIFICATION:', notification);
    },

    // ANDROID ONLY: (optional) GCM Sender ID.
    // senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * IOS ONLY: (optional) default: true
     * - Specified if permissions will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true
});

const NOTIFICATION_MESSAGE = "You haven’t entered any ratings for a few days now, please enter some ratings.";
const NOTIFICATION_CHECK = {number: -3, unit: 'days'}; // -3 days
const NOTIFICATION_TIMEOUT = 60 * 1000; // 60 seconds

/**
 * ## Retrieving local ratings actions
 */
export function getLocalRatingsRequest() {
    return {
        type: GET_LOCAL_RATINGS_REQUEST
    };
}
export function getLocalRatingsSuccess(latestRating) {
    return {
        type: GET_LOCAL_RATINGS_SUCCESS,
        payload: latestRating
    };
}
export function getLocalRatingsBlankJSON() {
    return {
        type: GET_LOCAL_RATINGS_BLANK_JSON
    };
}
export function getLocalRatingsFailure(json) {
    return {
        type: GET_LOCAL_RATINGS_FAILURE,
        payload: json
    };
}
export function getLocalRatings() {
    return dispatch => {
        dispatch(getLocalRatingsRequest());
        /**
         * Going to grab locally held data, which will exist as there is a
         * sessionToken present.
         */
        return Store.getRatings()
            .then((json) => {
                // console.log('parsed json', json);

                if (json) {
                    var latestRating = {
                        enthusiasm: null,
                        productivity: null
                    };

                    if (typeof json === "object" && json.length) {
                        var d = json[json.length - 1],
                            startTime = moment()
                                .add((new Date()).getHours() < 12 ? RATING_TIME_OFFSET_DAYS : RATING_TIME_OFFSET_DAYS + 1, 'days')
                                .hour(RATING_TIME_OFFSET_HOURS)
                                .minute(RATING_TIME_OFFSET_MINUTES)
                                .second(0),
                            endTime = moment()
                                .add((new Date()).getHours() < 12 ? RATING_TIME_OFFSET_DAYS + 1 : RATING_TIME_OFFSET_DAYS + 2, 'days')
                                .hour(RATING_TIME_OFFSET_HOURS)
                                .minute(RATING_TIME_OFFSET_MINUTES)
                                .second(0),
                            ratedToday = moment(d.scoreDatetime).isSameOrAfter(startTime) && moment(d.scoreDatetime).isSameOrBefore(endTime);

                        if (ratedToday) {
                            latestRating = {
                                enthusiasm: parseInt(d.enthusiasm),
                                productivity: parseInt(d.productivity)
                            }
                        }
                    }

                    return Store.setRatings(json)
                        .then(() => {
                            dispatch(getLocalRatingsSuccess(latestRating));

                            if (typeof json === "object" && json.length) {
                                var d = json[json.length - 1],
                                    startTime = moment().add(NOTIFICATION_CHECK.number, NOTIFICATION_CHECK.unit),
                                    ratedRecently = moment(d.scoreDatetime).isSameOrAfter(startTime);

                                // console.log(NOTIFICATION_MESSAGE, latestRating);

                                // If rated recently (last 3 days)
                                if (ratedRecently) {

                                    // Reset timer on push notification
                                    PushNotification.cancelAllLocalNotifications();

                                    let date = new Date(Date.now() + NOTIFICATION_TIMEOUT);
                                    if (Platform.OS === 'ios') date = date.toISOString();

                                    /* Removed due to a client request
                                    PushNotification.localNotificationSchedule({
                                        message: NOTIFICATION_MESSAGE,
                                        date: date
                                    });
                                    */
                                }
                            }
                        });
                } else {
                    dispatch(getLocalRatingsBlankJSON());
                }
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(getLocalRatingsFailure(error));
            });
    };
}


/**
 * ## Retrieving ratings actions
 */
export function getRatingsRequest() {
    return {
        type: GET_RATINGS_REQUEST
    };
}
export function getRatingsSuccess(latestRating) {
    return {
        type: GET_RATINGS_SUCCESS,
        payload: latestRating
    };
}
export function getRatingsFailure(json) {
    return {
        type: GET_RATINGS_FAILURE,
        payload: json
    };
}
/**
 * ## Getter actions
 *
 */
export function getRatings(sessionToken) {

    clearInterval(syncInterval);

    return dispatch => {
        dispatch(getRatingsRequest());
        // console.log("getRatings(sessionToken) -> sessionToken: ", sessionToken);

        // Store or get a sessionToken
        return new AppAuthToken().getSessionToken(sessionToken)
            .then((token) => {
                return BackendFactory(token).getRatings();
            })

            .then((response) => {
                // console.log("getRatings(sessionToken) -> response: ", response);
                return response.json();
            })

            .then((json) => {
                // console.log('parsed json', json);

                var latestRating = {
                    enthusiasm: null,
                    productivity: null
                };

                if (typeof json.data === "object" && json.data.length) {
                    var d = json.data[json.data.length - 1],
                        startTime = moment()
                            .add((new Date()).getHours() < 12 ? RATING_TIME_OFFSET_DAYS : RATING_TIME_OFFSET_DAYS + 1, 'days')
                            .hour(RATING_TIME_OFFSET_HOURS)
                            .minute(RATING_TIME_OFFSET_MINUTES)
                            .second(0),
                        endTime = moment()
                            .add((new Date()).getHours() < 12 ? RATING_TIME_OFFSET_DAYS + 1 : RATING_TIME_OFFSET_DAYS + 2, 'days')
                            .hour(RATING_TIME_OFFSET_HOURS)
                            .minute(RATING_TIME_OFFSET_MINUTES)
                            .second(0),
                        ratedToday = moment(d.scoreDatetime).isSameOrAfter(startTime) && moment(d.scoreDatetime).isSameOrBefore(endTime);

                    if (ratedToday) {
                        latestRating = {
                            enthusiasm: parseInt(d.enthusiasm),
                            productivity: parseInt(d.productivity)
                        }
                    }
                }

                return Store.setRatings(json.data)
                    .then(() => {
                        dispatch(getRatingsSuccess(latestRating));
                    })
            })

            .catch((error) => {
                /**
                 * Going to check first if the server is down.
                 * If it is, then we've already can grabbed locally held data, so we can
                 * just display that. If not, make sure to log out if the token is corrupted.
                 * This will be done in getProfile() so just silently fail here.
                 * Finally, throw error as usual.
                 */
                if (error.name === "TypeError" && error.message === "Network request failed") {
                    syncInterval = setInterval(function () {
                        dispatch(ratingsSync(sessionToken));
                    }, SYNC_INTERVAL);
                } else if (error === "Authorized users only.") {
                    // console.log("ERROR: ", error);
                } else {
                    dispatch(getRatingsFailure(error));
                }
            });
    };
}

/**
 * ## Setter actions
 *
 */
export function localRatingCreateRequest() {
    return {
        type: LOCAL_RATING_CREATE_REQUEST
    };
}
export function localRatingCreateSuccess() {
    return {
        type: LOCAL_RATING_CREATE_SUCCESS
    };
}
export function localRatingCreateFailure(json) {
    return {
        type: LOCAL_RATING_CREATE_FAILURE,
        payload: json
    };
}
/**
 * ## createRating
 * @param {int} userId - user's ID
 * @param {string} productivity - user's daily productivity rating
 * @param {string} enthusiasm - user's daily enthusiasm rating
 *
 * Update local store
 */
export function createLocalRating(userId, productivity, enthusiasm) {
    return dispatch => {
        dispatch(localRatingCreateRequest());
        // console.log("createLocalRating(userId, productivity, enthusiasm): ", userId, productivity, enthusiasm);
        /**
         * Going to set locally held data, which can be synced next
         * time online.
         */
        return Store.getRatings()
            .then((response) => {
                // console.log('parsed json', response);

                var json = _.clone(response);

                var latestRating = {
                    enthusiasm: null,
                    productivity: null,
                    scoreDatetime: null
                };

                if (_.isArray(json) && json.length) {
                    var d = json[json.length - 1],
                        startTime = moment()
                            .add((new Date()).getHours() < 12 ? RATING_TIME_OFFSET_DAYS : RATING_TIME_OFFSET_DAYS + 1, 'days')
                            .hour(RATING_TIME_OFFSET_HOURS)
                            .minute(RATING_TIME_OFFSET_MINUTES)
                            .second(0),
                        endTime = moment()
                            .add((new Date()).getHours() < 12 ? RATING_TIME_OFFSET_DAYS + 1 : RATING_TIME_OFFSET_DAYS + 2, 'days')
                            .hour(RATING_TIME_OFFSET_HOURS)
                            .minute(RATING_TIME_OFFSET_MINUTES)
                            .second(0),
                        ratedToday = moment(d.scoreDatetime).isSameOrAfter(startTime) && moment(d.scoreDatetime).isSameOrBefore(endTime);

                    if (ratedToday) {
                        // Update rating
                        d.enthusiasm = parseInt(enthusiasm);
                        d.productivity = parseInt(productivity);
                        d.scoreDateTime = moment().format();
                    } else {
                        // Create rating
                        latestRating = {
                            enthusiasm: parseInt(enthusiasm),
                            productivity: parseInt(productivity),
                            scoreDateTime: moment().format()
                        };
                        json.push(latestRating);
                    }
                } else {
                    // Create rating
                    latestRating = {
                        enthusiasm: parseInt(enthusiasm),
                        productivity: parseInt(productivity),
                        scoreDateTime: moment().format()
                    };
                    json = [latestRating];
                }

                return Store.setRatings(json)
                    .then(() => {
                        dispatch(localRatingCreateSuccess());
                        dispatch(getLocalRatings());
                        Alert.alert('Ratings sent!', null, [{text: 'OK'}]);
                    })

                    .catch((error) => {
                        // console.log("ERROR: ", error);
                        dispatch(localRatingCreateFailure(error));
                    });
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(localRatingCreateFailure(error));
            });
    };
}

/**
 * ## Setter actions
 *
 */
export function ratingCreateRequest() {
    return {
        type: RATING_CREATE_REQUEST
    };
}
export function ratingCreateSuccess() {
    return {
        type: RATING_CREATE_SUCCESS
    };
}
export function ratingCreateFailure(json) {
    return {
        type: RATING_CREATE_FAILURE,
        payload: json
    };
}
/**
 * ## createRating
 * @param {string} productivity - user's daily productivity rating
 * @param {string} enthusiasm - user's daily enthusiasm rating
 * @param {Object} sessionToken - the sessionToken from AMP
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, AMP is called with the data to create.
 * If successful, get the rating so that the screen is created with
 * the data as now persisted on AMP
 */
export function createRating(productivity, enthusiasm, sessionToken) {

    clearInterval(syncInterval);

    return dispatch => {
        dispatch(ratingCreateRequest());
        // console.log("createRating(productivity, enthusiasm, sessionToken) -> sessionToken: ", productivity, enthusiasm, sessionToken);
        return new AppAuthToken().getSessionToken(sessionToken)
            .then((token) => {
                return BackendFactory(token).createRating(
                    {
                        productivity: productivity,
                        enthusiasm: enthusiasm,
                        scoreDateTime: moment().format()
                    }
                );
            })

            .then((response) => {
                // console.log("createRating(productivity, enthusiasm, sessionToken) -> sessionToken: ", response);
                return response.json();
            })

            .then((json) => {
                // console.log('parsed json', json);
                dispatch(ratingCreateSuccess());
                dispatch(getRatings());
                Actions.Drawer();
            })

            .catch((error) => {
                /**
                 * Going to check first if the server is down.
                 * If it is, then we've already can grabbed locally held data, so we can
                 * just display that. If not, then throw error as usual.
                 */
                if (error.name === "TypeError" && error.message === "Network request failed") {
                    syncInterval = setInterval(function () {
                        dispatch(ratingsSync(sessionToken));
                    }, SYNC_INTERVAL);
                } else {
                    // console.log("ERROR: ", error);
                    dispatch(ratingCreateFailure(error));
                }
            });
    };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, logout or reset password
 */
export function ratingsSyncRequest() {
    return {
        type: RATINGS_SYNC_REQUEST
    };
}
export function ratingsSyncSuccess() {
    return {
        type: RATINGS_SYNC_SUCCESS
    };
}
export function ratingsSyncFailure(json) {
    return {
        type: RATINGS_SYNC_FAILURE,
        payload: json
    };
}
/**
 * ## ratingSync
 * @param {Object} sessionToken - the sessionToken from AMP
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, AMP is called, the data is pulled from local
 * store and sent to update. If successful, get the rating so that the
 * screen is updated with the data as now persisted on AMP
 *
 */
export function ratingsSync(sessionToken) {
    return dispatch => {
        dispatch(ratingsSyncRequest());
        // console.log("ratingsSync(sessionToken) -> sessionToken: ", sessionToken);

        return Store.getRatings()
            .then((json) => {
                // console.log('parsed json', json);

                return new AppAuthToken().getSessionToken(sessionToken)

                    .then((token) => {
                        return BackendFactory(token).syncRatings(json);
                    })

                    .then((response) => {
                        // console.log("syncRatings(sessionToken) -> response: ", response);
                        return response.json();
                    })

                    .then((json) => {
                        // console.log('parsed json', json);

                        clearInterval(syncInterval);

                        dispatch(ratingsSyncSuccess());
                        dispatch(getRatings());
                        Actions.Drawer();
                    })

                    .catch((error) => {
                        // console.log("ERROR: ", error);
                        dispatch(ratingsSyncFailure(error));
                    });
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(ratingsSyncFailure(error));
            });
    };
}

/**
 * ## DeleteRatings actions
 */
export function deleteRatingsRequest() {
    return {
        type: DELETE_RATINGS_REQUEST
    };
}
export function deleteRatingsSuccess() {
    return {
        type: DELETE_RATINGS_SUCCESS
    };
}

/**
 * ## Delete ratings
 *
 * Call the Store deleteRatings
 */
export function deleteRatings() {
    return dispatch => {
        dispatch(deleteRatingsRequest());
        return new Store().deleteRatings()
            .then(() => {
                dispatch(deleteRatingsSuccess());
            });
    };
}

/**
 * ## onRatingFormFieldChange
 *
 */
export function onRatingFormFieldChange(field, value) {
    return {
        type: ON_RATING_FORM_FIELD_CHANGE,
        payload: {field: field, value: value}
    };
}
