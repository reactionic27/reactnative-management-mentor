/**
 * # toolSavesListActions.js
 *
 * The actions to support the users toolSaves
 */
'use strict';
/**
 * ## Imports
 *
 * The actions for toolSavesList
 */
const {
    DELETE_TOOL_SAVES_REQUEST,
    DELETE_TOOL_SAVES_SUCCESS,

    GET_LOCAL_TOOL_SAVES_LIST_REQUEST,
    GET_LOCAL_TOOL_SAVES_LIST_SUCCESS,
    GET_LOCAL_TOOL_SAVES_LIST_BLANK_JSON,
    GET_LOCAL_TOOL_SAVES_LIST_FAILURE,

    GET_LOCAL_TOOL_SAVE_REQUEST,
    GET_LOCAL_TOOL_SAVE_SUCCESS,
    GET_LOCAL_TOOL_SAVE_BLANK_JSON,
    GET_LOCAL_TOOL_SAVE_FAILURE,

    GET_TOOL_SAVES_LIST_REQUEST,
    GET_TOOL_SAVES_LIST_SUCCESS,
    GET_TOOL_SAVES_LIST_FAILURE,

    LOCAL_TOOL_SAVE_CREATE_REQUEST,
    LOCAL_TOOL_SAVE_CREATE_SUCCESS,
    LOCAL_TOOL_SAVE_CREATE_AND_EXIT_SUCCESS,
    LOCAL_TOOL_SAVE_CREATE_FAILURE,

    LOCAL_TOOL_SAVE_DELETE_REQUEST,
    LOCAL_TOOL_SAVE_DELETE_SUCCESS,
    LOCAL_TOOL_SAVE_DELETE_FAILURE,

    TOOL_SAVE_CREATE_REQUEST,
    TOOL_SAVE_CREATE_SUCCESS,
    TOOL_SAVE_CREATE_AND_EXIT_SUCCESS,
    TOOL_SAVE_CREATE_FAILURE,

    TOOL_SAVES_SYNC_REQUEST,
    TOOL_SAVES_SYNC_SUCCESS,
    TOOL_SAVES_SYNC_FAILURE,
} = require('../../lib/constants').default;
/**
 * BackendFactory - base class for server implementation
 * AppAuthToken for localStorage sessionToken access
 */
const BackendFactory = require('../../lib/BackendFactory').default;

import {Actions} from 'react-native-router-flux';

const AppAuthToken = require('../../lib/AppAuthToken').default;
const Store = require('../../lib/Store').default;
import Helpers from '../../lib/helpers'
const moment = require('moment');
const _ = require('underscore');
import Immutable from 'immutable';

/**
 * Globally define the syncing interval
 */
var syncInterval;
const SYNC_INTERVAL = 5000;

/**
 * ## Getter actions
 *
 */

/**
 * GET LOCAL COLLECTION
 */
export function getLocalToolSavesRequest() {
    return {
        type: GET_LOCAL_TOOL_SAVES_LIST_REQUEST
    };
}
export function getLocalToolSavesSuccess(json) {
    return {
        type: GET_LOCAL_TOOL_SAVES_LIST_SUCCESS,
        payload: json
    };
}
export function getLocalToolSavesBlankJSON() {
    return {
        type: GET_LOCAL_TOOL_SAVES_LIST_BLANK_JSON
    };
}
export function getLocalToolSavesFailure(json) {
    return {
        type: GET_LOCAL_TOOL_SAVES_LIST_FAILURE,
        payload: json
    };
}
export function getLocalToolSaves() {
    return dispatch => {
        dispatch(getLocalToolSavesRequest());
        /**
         * Going to grab locally held data, which will exist as there is a
         * sessionToken present.
         */
        return Store.getToolSaves()
            .then((json) => {
                // console.log('parsed json', json);

                if (json) {
                    return Store.setToolSaves(json)
                        .then(() => {
                            dispatch(getLocalToolSavesSuccess(json));
                        });
                } else {
                    dispatch(getLocalToolSavesBlankJSON());
                }
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(getLocalToolSavesFailure(error));
            });
    };
}
/**
 * GET REMOTE COLLECTION
 */
export function getToolSavesRequest() {
    return {
        type: GET_TOOL_SAVES_LIST_REQUEST
    };
}
export function getToolSavesSuccess(json) {
    return {
        type: GET_TOOL_SAVES_LIST_SUCCESS,
        payload: json
    };
}
export function getToolSavesFailure(json) {
    return {
        type: GET_TOOL_SAVES_LIST_FAILURE,
        payload: json
    };
}
export function getToolSaves(sessionToken) {

    return dispatch => {
        dispatch(getToolSavesRequest());

        // Store or get a sessionToken
        return new AppAuthToken().getSessionToken(sessionToken)
            .then((token) => {
                return BackendFactory(token).getToolSaves();
            })

            .then((response) => {
                // console.log("getToolSaves(sessionToken) -> response: ", response);
                return response.json();
            })

            .then((json) => {
                // console.log('parsed json', json);
                return Store.setToolSaves(json.data)
                    .then(() => {
                        dispatch(getToolSavesSuccess(json.data));
                    })
            })

            .catch((error) => {
                /**
                 * Going to check first if the token is corrupted.
                 * This will be done in getProfile() so just silently fail here.
                 * Finally, throw error as usual.
                 */
                if (error === "Authorized users only.") {
                    // console.log("ERROR: ", error);
                } else {
                    dispatch(getToolSavesFailure(error));
                }
            });
    };
}
/**
 * GET LOCAL MEMBER
 */
export function getLocalToolSaveRequest() {
    return {
        type: GET_LOCAL_TOOL_SAVE_REQUEST
    };
}
export function getLocalToolSaveSuccess(json) {
    return {
        type: GET_LOCAL_TOOL_SAVE_SUCCESS,
        payload: json
    };
}
export function getLocalToolSaveBlankJSON() {
    return {
        type: GET_LOCAL_TOOL_SAVE_BLANK_JSON
    };
}
export function getLocalToolSaveFailure(json) {
    return {
        type: GET_LOCAL_TOOL_SAVE_FAILURE,
        payload: json
    };
}
export function getLocalToolSave(uuid) {
    // console.log(uuid);
    return dispatch => {
        dispatch(getLocalToolSaveRequest());
        /**
         * Going to grab locally held data, which will exist as there is a
         * sessionToken present.
         */
        return Store.getToolSaves()
            .then((json) => {
                // console.log('parsed json', json);

                if (json) {
                    let save = json.find((s) => {
                        return s.uuid === uuid;
                    });

                    return Store.getTools()
                        .then((json) => {
                            // console.log('parsed json: ', json);

                            if (json) {

                                let appendedJSON = Helpers.appendStaticTools(json, false);

                                let tool = appendedJSON.find((tool) => {
                                    return tool.id === save.toolId || tool.id === save.data.localId;
                                });

                                /**
                                 * Formatting tool
                                 */
                                let cardFields = {},
                                    tableFields = {},
                                    tableNewRowValues = {},
                                    dependencyIds = [],
                                    matches = [],
                                    regEx = /<val>(.*?)<\/val>/g;

                                tool.slides.forEach((slide, slideIndex) => {

                                    dependencyIds[slideIndex] = {
                                        cards: {},
                                        cardFields: {},
                                        tables: {},
                                        tableRows: {},
                                        tableCells: {}
                                    };

                                    slide.slideItems.forEach((slideItem) => {
                                        switch (slideItem.type) {
                                            case 'card':

                                                dependencyIds[slideIndex].cards[slideItem.id] = [];

                                                slideItem.fields.forEach((field) => {
                                                    cardFields[field.id] = field;

                                                    // Dependency IDs
                                                    dependencyIds[slideIndex].cardFields[field.id] = dependencyIds[slideIndex].cardFields[field.id] || [];
                                                    matches = Helpers.getMatches(field.value, regEx);
                                                    if (matches.length) {
                                                        matches.forEach((match, i) => {
                                                            dependencyIds[slideIndex].cards[slideItem.id].push(match.split('|')[0]);
                                                            dependencyIds[slideIndex].cardFields[field.id].push(match.split('|')[0]);
                                                        });
                                                    } else {
                                                        dependencyIds[slideIndex].cards[slideItem.id].push(field.id);
                                                    }
                                                });
                                                break;
                                            case 'table':
                                                let tableId = slideItem.table.id,
                                                    thisTableNewRowValues = [],
                                                    additionalRows = {};

                                                dependencyIds[slideIndex].tables[slideItem.table.id] = [];

                                                slideItem.table.columns.forEach((column, columnIndex) => {
                                                    const field = Immutable.fromJS(column.field);
                                                    thisTableNewRowValues.push(field.toJS().value);
                                                    slideItem.table.rows.forEach((row, rowIndex) => {

                                                        // In case value is dynamic
                                                        let returnValue = row.data[columnIndex],
                                                            cellId = [column.id, row.id].join('_');

                                                        tableFields[cellId] = regEx.test(returnValue) ? Object.assign(field.toJS(), {locked: true}) : Object.assign(field.toJS(), {locked: false});

                                                        // Dependency IDs
                                                        dependencyIds[slideIndex].tableRows[row.id] = dependencyIds[slideIndex].tableRows[row.id] || [];
                                                        dependencyIds[slideIndex].tableCells[cellId] = dependencyIds[slideIndex].tableCells[cellId] || [];
                                                        matches = Helpers.getMatches(returnValue, regEx);
                                                        if (matches.length) {
                                                            matches.forEach((match, i) => {
                                                                dependencyIds[slideIndex].tables[slideItem.table.id].push(match.split('|')[0]);
                                                                dependencyIds[slideIndex].tableRows[row.id].push(match.split('|')[0]);
                                                                dependencyIds[slideIndex].tableCells[cellId].push(match.split('|')[0]);
                                                            });
                                                        } else {
                                                            dependencyIds[slideIndex].tables[slideItem.table.id].push(cellId);
                                                            dependencyIds[slideIndex].tableRows[row.id].push(cellId);
                                                            dependencyIds[slideIndex].tableCells[cellId].push(cellId);
                                                        }
                                                    });

                                                    // Find additional rows
                                                    let fieldValues = save.data.tableFieldValues;
                                                    for (var fieldValueKey in fieldValues) {
                                                        if (fieldValues.hasOwnProperty(fieldValueKey)) {
                                                            let key = fieldValueKey.split('_'),
                                                                columnId = parseInt(key[0]),
                                                                rowId = isNaN(key[1]) ? key[1] : parseInt(key[1]);

                                                            let fieldValue = fieldValues[fieldValueKey];

                                                            // If an additional row, the id will be prefixed with NR => isNaN(rowId) returns true
                                                            // Conversely, any IDs from the server will be PostgreSQL integer ids
                                                            if (columnId === column.id && isNaN(rowId)) {
                                                                if (!additionalRows[rowId]) additionalRows[rowId] = [];
                                                                additionalRows[rowId][columnIndex] = fieldValue;

                                                                let cellId = [column.id, rowId].join('_');

                                                                tableFields[cellId] = Object.assign(field.toJS(), {locked: false});

                                                                dependencyIds[slideIndex].tables[tableId].push(cellId);
                                                                dependencyIds[slideIndex].tableRows[rowId] = dependencyIds[slideIndex].tableRows[rowId] || [];
                                                                dependencyIds[slideIndex].tableCells[cellId] = dependencyIds[slideIndex].tableCells[cellId] || [];
                                                                dependencyIds[slideIndex].tableRows[rowId].push(cellId);
                                                                dependencyIds[slideIndex].tableCells[cellId].push(cellId);
                                                            }
                                                        }
                                                    }
                                                });
                                                tableNewRowValues[tableId] = thisTableNewRowValues;

                                                // Append additional rows
                                                let rowCount = slideItem.table.rows.length;
                                                for (var additionalRowKey in additionalRows) {
                                                    if (additionalRows.hasOwnProperty(additionalRowKey)) {
                                                        slideItem.table.rows.push({
                                                            id: additionalRowKey,
                                                            position: rowCount + 1,
                                                            data: additionalRows[additionalRowKey]
                                                        });
                                                        rowCount++;
                                                    }
                                                }

                                                break;
                                            default:
                                                return false;
                                        }
                                    });
                                });

                                dispatch(getLocalToolSaveSuccess({
                                    name: save.data.name,
                                    staticData: save.data.staticData,
                                    tool: tool,
                                    cardFields: cardFields,
                                    cardFieldValues: save.data.cardFieldValues,
                                    cardHumanValues: save.data.cardHumanValues,
                                    tableNewRowValues: tableNewRowValues,
                                    tableFields: tableFields,
                                    tableFieldValues: save.data.tableFieldValues,
                                    tableHumanValues: save.data.tableHumanValues,
                                    dependencyIds: dependencyIds
                                }));
                            } else {
                                dispatch(getLocalToolSaveBlankJSON());
                            }
                        })

                        .catch((error) => {
                            // console.log("ERROR: ", error);
                            dispatch(getLocalToolSaveFailure(error));
                        });
                } else {
                    dispatch(getLocalToolSaveBlankJSON());
                }
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(getLocalToolSaveFailure(error));
            });
    };
}

/**
 * ## Setter actions
 *
 */
/**
 * SET LOCAL MEMBER
 */
export function localToolSaveCreateRequest() {
    return {
        type: LOCAL_TOOL_SAVE_CREATE_REQUEST
    };
}
export function localToolSaveCreateSuccess(uuid, name, staticData) {
    return {
        type: LOCAL_TOOL_SAVE_CREATE_SUCCESS,
        payload: {
            uuid: uuid,
            name: name,
            staticData: staticData
        }
    };
}
export function localToolSaveCreateAndExitSuccess(uuid, name, staticData) {
    return {
        type: LOCAL_TOOL_SAVE_CREATE_AND_EXIT_SUCCESS,
        payload: {
            uuid: uuid,
            name: name,
            staticData: staticData
        }
    };
}
export function localToolSaveCreateFailure(json) {
    return {
        type: LOCAL_TOOL_SAVE_CREATE_FAILURE,
        payload: json
    };
}
function updateJSON(currentJSON, toolId, toolSaveJSON, uuid, toolName, toolIcon) {
    var toolSave = {};

    if (_.isArray(currentJSON) && currentJSON.length) {

        if (uuid) {
            toolSave = currentJSON.find((save) => (save.uuid === uuid));
            // console.log(toolSave);

            if (toolSave) {
                // Update toolSave
                toolSave.data = toolSaveJSON;
            } else {
                // Create toolSave
                toolSave = {
                    uuid: uuid,
                    toolId: toolId,
                    data: toolSaveJSON,
                    toolName: toolName,
                    toolIcon: toolIcon
                };
                currentJSON.push(toolSave);
            }
        } else {
            // Create toolSave
            toolSave = {
                uuid: uuid,
                toolId: toolId,
                data: toolSaveJSON,
                toolName: toolName,
                toolIcon: toolIcon
            };
            currentJSON.push(toolSave);
        }
    } else {
        // Create toolSave
        toolSave = {
            uuid: uuid,
            toolId: toolId,
            data: toolSaveJSON,
            toolName: toolName,
            toolIcon: toolIcon
        };
        currentJSON = [toolSave];
    }
    
    return currentJSON;
}
export function createLocalToolSave(toolId, toolSaveJSON, uuid, toolName, toolIcon, thenExit = false) {
    return dispatch => {
        if (!uuid) uuid = Helpers.hex(16);

        dispatch(localToolSaveCreateRequest());
        // console.log("createLocalToolSave(toolId, toolSaveJSON, uuid, toolName, toolIcon, thenExit = false): ", toolId, toolSaveJSON, uuid, toolName, toolIcon, thenExit);
        /**
         * Going to set locally held data, which can be synced next
         * time online.
         */
        return Store.getToolSaves()
            .then((response) => {
                // console.log('parsed json', response);

                var json = _.clone(response);
                json = updateJSON(json, toolId, toolSaveJSON, uuid, toolName, toolIcon);

                return Store.setToolSaves(json)
                    .then(() => {
                        if (thenExit) {
                            // console.log(uuid, toolSaveJSON.name);
                            dispatch(localToolSaveCreateAndExitSuccess(uuid, toolSaveJSON.name, toolSaveJSON.staticData));
                            // createToolSave will follow with
                            // Actions.pop();
                        } else {
                            dispatch(localToolSaveCreateSuccess(uuid, toolSaveJSON.name, toolSaveJSON.staticData));
                            dispatch(getLocalToolSaves());
                        }
                    })

                    .catch((error) => {
                        // console.log("ERROR: ", error);
                        dispatch(localToolSaveCreateFailure(error));
                    });
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(localToolSaveCreateFailure(error));
            });
    };
}

/**
 * SET REMOTE MEMBER
 */
export function toolSaveCreateRequest() {
    return {
        type: TOOL_SAVE_CREATE_REQUEST
    };
}
export function toolSaveCreateSuccess(uuid, name, staticData) {
    return {
        type: TOOL_SAVE_CREATE_SUCCESS,
        payload: {
            uuid: uuid,
            name: name,
            staticData: staticData
        }
    };
}
export function toolSaveCreateAndExitSuccess(uuid, name, staticData) {
    return {
        type: TOOL_SAVE_CREATE_AND_EXIT_SUCCESS,
        payload: {
            uuid: uuid,
            name: name,
            staticData: staticData
        }
    };
}
export function toolSaveCreateFailure(json) {
    return {
        type: TOOL_SAVE_CREATE_FAILURE,
        payload: json
    };
}
export function createToolSave(toolId, toolSaveJSON, uuid, toolName, toolIcon, sessionToken, thenExit = false) {

    clearInterval(syncInterval);

    return dispatch => {
        if (!uuid) uuid = Helpers.hex(16);

        dispatch(toolSaveCreateRequest());
        // console.log("createToolSave(toolId, toolSaveJSON, uuid, toolName, toolIcon, sessionToken) -> sessionToken: ", toolId, toolSaveJSON, uuid, toolName, toolIcon, sessionToken);
        return new AppAuthToken().getSessionToken(sessionToken)
            .then((token) => {
                // Create toolSave
                return BackendFactory(token).createToolSave(
                    {
                        uuid: uuid,
                        toolId: toolId,
                        data: toolSaveJSON,
                        toolName: toolName,
                        toolIcon: toolIcon
                    }
                );
            })

            .then((response) => {
                // console.log("createToolSave(productivity, enthusiasm, sessionToken) -> sessionToken: ", response);
                return response.json();
            })

            .then((json) => {
                // console.log('parsed json', json);
                if (thenExit) {
                    // console.log(uuid, toolSaveJSON.name);
                    dispatch(toolSaveCreateAndExitSuccess(uuid, toolSaveJSON.name, toolSaveJSON.staticData));
                    Actions.pop();
                    dispatch(getToolSaves());
                } else {
                    dispatch(toolSaveCreateSuccess(uuid, toolSaveJSON.name, toolSaveJSON.staticData));
                    dispatch(getToolSaves());
                }
            })

            .catch((error) => {
                /**
                 * Going to check first if the server is down.
                 * If it is, then we've already can grabbed locally held data, so we can
                 * just display that. If not, then throw error as usual.
                 */
                if (error.name === "TypeError" && error.message === "Network request failed") {
                    syncInterval = setInterval(function () {
                        dispatch(toolSavesSync(sessionToken));
                    }, SYNC_INTERVAL);
                } else {
                    // console.log("ERROR: ", error);
                    dispatch(toolSaveCreateFailure(error));
                }
            });
    };
}
/**
 * SYNC REMOTE MEMBER
 */
export function toolSavesSyncRequest() {
    return {
        type: TOOL_SAVES_SYNC_REQUEST
    };
}
export function toolSavesSyncSuccess(uuid) {
    return {
        type: TOOL_SAVES_SYNC_SUCCESS,
        payload: uuid
    };
}
export function toolSavesSyncFailure(json) {
    return {
        type: TOOL_SAVES_SYNC_FAILURE,
        payload: json
    };
}
export function toolSavesSync(sessionToken) {
    return dispatch => {
        dispatch(toolSavesSyncRequest());
        // console.log("toolSavesSync(sessionToken) -> sessionToken: ", sessionToken);

        return Store.getToolSaves()
            .then((json) => {
                // console.log('parsed json', json);

                return new AppAuthToken().getSessionToken(sessionToken)

                    .then((token) => {
                        return BackendFactory(token).syncToolSaves(json);
                    })

                    .then((response) => {
                        // console.log("syncToolSaves(sessionToken) -> response: ", response);
                        return response.json();
                    })

                    .then((json) => {
                        // console.log('parsed json', json);

                        clearInterval(syncInterval);

                        dispatch(toolSavesSyncSuccess());
                        dispatch(getToolSaves());
                        Actions.Drawer();
                    })

                    .catch((error) => {
                        // console.log("ERROR: ", error);
                        dispatch(toolSavesSyncFailure(error));
                    });
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(toolSavesSyncFailure(error));
            });
    };
}


/**
 * ## Remove actions
 *
 */
/**
 * DELETE LOCAL COLLECTION
 */
export function deleteToolSavesRequest() {
    return {
        type: DELETE_TOOL_SAVES_REQUEST
    };
}
export function deleteToolSavesSuccess() {
    return {
        type: DELETE_TOOL_SAVES_SUCCESS
    };
}
export function deleteToolSaves() {
    return dispatch => {
        dispatch(deleteToolSavesRequest());
        return new Store().deleteToolSaves()
            .then(() => {
                dispatch(deleteToolSavesSuccess());
            });
    };
}

/**
 * DELETE LOCAL MEMBER
 */
export function localToolSaveDeleteRequest() {
    return {
        type: LOCAL_TOOL_SAVE_DELETE_REQUEST
    };
}
export function localToolSaveDeleteSuccess(uuid) {
    return {
        type: LOCAL_TOOL_SAVE_DELETE_SUCCESS,
        payload: uuid
    };
}
export function localToolSaveDeleteFailure(json) {
    return {
        type: LOCAL_TOOL_SAVE_DELETE_FAILURE,
        payload: json
    };
}
export function deleteLocalToolSave(uuid) {
    return dispatch => {
        dispatch(localToolSaveDeleteRequest());
        // console.log("deleteLocalToolSave(uuid): ", uuid);
        /**
         * Going to set locally held data, which can be synced next
         * time online.
         */
        return Store.getToolSaves()
            .then((response) => {
                // console.log('parsed json', response);

                var json = _.clone(response);

                if (_.isArray(json) && json.length) {

                    if (uuid) {
                        for (var i = 0; i < json.length; i++) {
                            if (json[i].uuid === uuid) {
                                json.splice(i, 1);
                                break;
                            }
                        }
                    }
                }

                return Store.setToolSaves(json)
                    .then(() => {
                        dispatch(localToolSaveDeleteSuccess(uuid));
                        dispatch(getLocalToolSaves());
                    })

                    .catch((error) => {
                        // console.log("ERROR: ", error);
                        dispatch(localToolSaveDeleteFailure(error));
                    });
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(localToolSaveDeleteFailure(error));
            });
    };
}
