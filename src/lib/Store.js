/**
 * # Store.js
 *
 * Utility functions using the react-native-simple-store
 *
 */
'use strict';
/**
 * ## Imports
 *
 * react-native-simple-store
 */
import store from 'react-native-simple-store';

export default class Store {
    /**
     * ## Store
     *
     */
    constructor() {
    }

    /**
     * ## Organisation
     *
     *
     * ### setOrganisation
     * Store the organisation JSON
     */
    static setOrganisation(organisationJSON) {
        // console.log("setOrganisation(organisationJSON) -> organisationJSON", organisationJSON);
        return store.save('CURRENT_ORGANISATION', organisationJSON);
    }

    /**
     * ### getOrganisation
     * Get the organisation JSON
     */
    static getOrganisation() {
        // console.log("getOrganisation()");
        return store.get('CURRENT_ORGANISATION');
    }

    /**
     * ### deleteOrganisation
     * Deleted during log out
     */
    deleteOrganisation() {
        // console.log("deleteOrganisation()");
        return store.delete('CURRENT_ORGANISATION');
    }

    /**
     * ## Profile
     *
     *
     * ### setProfile
     * Store the profile JSON
     */
    static setProfile(profileJSON) {
        // console.log("setProfile(profileJSON) -> profileJSON", profileJSON);
        return store.save('CURRENT_PROFILE', profileJSON);
    }

    /**
     * ## Profile
     *
     *
     * ### updateProfile
     * Store the profile JSON
     */
    static updateProfile(updateJSON) {
        // console.log("updateProfile(updateJSON) -> updateJSON", updateJSON);
        return Store.getProfile()
            .then((currentJSON) => {
                for (var attr in updateJSON) {
                    currentJSON[attr] = updateJSON[attr];
                }
                // console.log("updateProfile(updateJSON) -> currentJSON", currentJSON);
                return store.save('CURRENT_PROFILE', currentJSON);
            });
    }

    /**
     * ### getProfile
     * Get the profile JSON
     */
    static getProfile() {
        // console.log("getProfile()");
        return store.get('CURRENT_PROFILE');
    }

    /**
     * ### deleteProfile
     * Deleted during log out
     */
    deleteProfile() {
        // console.log("deleteProfile()");
        return store.delete('CURRENT_PROFILE');
    }

    /**
     * ## Ratings
     *
     *
     * ### setRatings
     * Store the ratings JSON
     */
    static setRatings(ratingsJSON) {
        // console.log("setRatings(ratingsJSON) -> ratingsJSON", ratingsJSON);
        return store.save('CURRENT_RATINGS', ratingsJSON);
    }

    /**
     * ### getRatings
     * Get the ratings JSON
     */
    static getRatings() {
        // console.log("getRatings()");
        return store.get('CURRENT_RATINGS');
    }

    /**
     * ### deleteRatings
     * Deleted during log out
     */
    deleteRatings() {
        // console.log("deleteRatings()");
        return store.delete('CURRENT_RATINGS');
    }

    /**
     * ## Tools
     *
     * ### setTools
     * Store the tools JSON
     */
    static setTools(toolsJSON) {
        // console.log("setTools(toolsJSON) -> toolsJSON", toolsJSON);
        return store.save('CURRENT_TOOLS_LIST', toolsJSON);
    }

    /**
     * ### getTools
     * Get the tools JSON
     */
    static getTools() {
        // console.log("getTools()");
        return store.get('CURRENT_TOOLS_LIST');
    }

    /**
     * ### deleteTools
     * Deleted during log out
     */
    deleteTools() {
        // console.log("deleteTools()");
        return store.delete('CURRENT_TOOLS_LIST');
    }

    /**
     * ## ToolSaves
     *
     * ### setToolSaves
     * Store the toolSaves JSON
     */
    static setToolSaves(toolSavesJSON) {
        // console.log("setToolSaves(toolSavesJSON) -> toolSavesJSON", toolSavesJSON);
        return store.save('CURRENT_TOOL_SAVES_LIST', toolSavesJSON);
    }

    /**
     * ### getToolSaves
     * Get the toolSaves JSON
     */
    static getToolSaves() {
        // console.log("getToolSaves()");
        return store.get('CURRENT_TOOL_SAVES_LIST');
    }

    /**
     * ### deleteToolSaves
     * Deleted during log out
     */
    deleteToolSaves() {
        // console.log("deleteToolSaves()");
        return store.delete('CURRENT_TOOL_SAVES_LIST');
    }

    /**
     * ## AppHistory
     *
     * ### setAuthenticatedUsers
     */
    static setAuthenticatedUsers(arr) {
        // console.log("setAuthenticatedUsers(arr) -> arr", arr);
        return store.save('CURRENT_AUTHENTICATED_USERS', arr);
    }

    /**
     * ### getAuthenticatedUsers
     */
    static getAuthenticatedUsers() {
        // console.log("getAuthenticatedUsers()");
        return store.get('CURRENT_AUTHENTICATED_USERS');
    }
    
    /**
     * ### setRatingPageVisits
     */
    static setRatingPageVisits(arr) {
        // console.log("setRatingPageVisits(arr) -> arr", arr);
        return store.save('CURRENT_RATING_PAGE_VISITS', arr);
    }

    /**
     * ### getRatingPageVisits
     */
    static getRatingPageVisits() {
        // console.log("getRatingPageVisits()");
        return store.get('CURRENT_RATING_PAGE_VISITS');
    }
    
    /**
     * ### setTeamHistoricalPageVisits
     */
    static setTeamHistoricalPageVisits(arr) {
        // console.log("setTeamHistoricalPageVisits(arr) -> arr", arr);
        return store.save('CURRENT_TEAM_HISTORICAL_PAGE_VISITS', arr);
    }

    /**
     * ### getTeamHistoricalPageVisits
     */
    static getTeamHistoricalPageVisits() {
        // console.log("getTeamHistoricalPageVisits()");
        return store.get('CURRENT_TEAM_HISTORICAL_PAGE_VISITS');
    }
}

