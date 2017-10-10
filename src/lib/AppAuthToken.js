/**
 * # AppAuthToken.js
 *
 * A thin wrapper over the react-native-simple-store
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux  & the config file
 */
import store from 'react-native-simple-store';
import CONFIG from './config';


export default class AppAuthToken {
    /**
     * ## AppAuthToken
     *
     * set the key from the config
     */
    constructor() {
        this.SESSION_TOKEN_KEY = CONFIG.AMP.SESSION_TOKEN_KEY;
    }

    /**
     * ### storeSessionToken
     * Store the session key
     */
    storeSessionToken(sessionToken) {
        // console.log("storeSessionToken(sessionToken) -> this.SESSION_TOKEN_KEY: sessionToken", this.SESSION_TOKEN_KEY, sessionToken);
        return store.save(this.SESSION_TOKEN_KEY, sessionToken);
    }

    /**
     * ### getSessionToken
     * @param {Object} sessionToken the currentUserToken object from AMP
     *
     * When Hot Loading, the sessionToken  will be passed in, and if so,
     * it needs to be stored on the device.  Remember, the store is a
     * promise so, have to be careful.
     */
    getSessionToken(sessionToken) {
        if (sessionToken) {
            // console.log("getSessionToken(sessionToken) -> this.SESSION_TOKEN_KEY: sessionToken", this.SESSION_TOKEN_KEY, sessionToken);
            return store.save(this.SESSION_TOKEN_KEY, sessionToken)
                .then(() => {
                    return store.get(this.SESSION_TOKEN_KEY);
                });
        }
        // console.log("getSessionToken(sessionToken) -> this.SESSION_TOKEN_KEY", this.SESSION_TOKEN_KEY);
        return store.get(this.SESSION_TOKEN_KEY);
    }

    /**
     * ### deleteSessionToken
     * Deleted during log out
     */
    deleteSessionToken() {
        // console.log("deleteSessionToken() -> this.SESSION_TOKEN_KEY: ", this.SESSION_TOKEN_KEY);
        return store.delete(this.SESSION_TOKEN_KEY);
    }
}

