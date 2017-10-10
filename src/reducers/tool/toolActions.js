/**
 * # toolActions.js
 *
 * The actions to support the users tools
 */
'use strict';
/**
 * ## Imports
 *
 * The actions for toolsList
 */
const {
    GET_LOCAL_TOOL_REQUEST,
    GET_LOCAL_TOOL_SUCCESS,
    GET_LOCAL_TOOL_BLANK_JSON,
    GET_LOCAL_TOOL_FAILURE,

    ON_TOOL_FIELD_CHANGE,
    ON_STATIC_TOOL_FIELD_CHANGE,

    ON_TABLE_ROW_ADD,
    ON_TABLE_ROW_DELETE
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
const _ = require('underscore');
import Immutable from 'immutable';

/**
 * ## Retrieving local tools actions
 */
export function getLocalToolRequest() {
    return {
        type: GET_LOCAL_TOOL_REQUEST
    };
}
export function getLocalToolSuccess(json) {
    return {
        type: GET_LOCAL_TOOL_SUCCESS,
        payload: json
    };
}
export function getLocalToolBlankJSON() {
    return {
        type: GET_LOCAL_TOOL_BLANK_JSON
    };
}
export function getLocalToolFailure(json) {
    return {
        type: GET_LOCAL_TOOL_FAILURE,
        payload: json
    };
}

export function getLocalTool(toolId, members) {
    return dispatch => {
        dispatch(getLocalToolRequest());
        /**
         * Going to grab locally held data, which will exist as there is a
         * sessionToken present.
         */
        return Store.getTools()
            .then((json) => {
                // console.log('parsed json for ', toolId, ": ", json);

                if (json) {

                    let appendedJSON = Helpers.appendStaticTools(json, false);

                    let tool = appendedJSON.find((tool) => {
                        return tool.id === toolId;
                    });

                    /**
                     * Formatting tool
                     */
                    let cardFields = {},
                        cardFieldValues = {},
                        cardHumanValues = {},
                        tableFields = {},
                        tableFieldValues = {},
                        tableHumanValues = {},
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

                                    if (!slideItem.fields || !slideItem.fields.length) break;

                                    slideItem.fields.forEach((field) => {
                                        cardFields[field.id] = field;
                                        cardFieldValues[field.id] = field.value;
                                        cardHumanValues[field.id] = Helpers.formatFieldValue(field, members);

                                        dependencyIds[slideIndex].cardFields[field.id] = dependencyIds[slideIndex].cardFields[field.id] || [];
                                        matches = Helpers.getMatches(field.value, regEx);
                                        if (matches.length) {
                                            matches.forEach((match, i) => {
                                                dependencyIds[slideIndex].cards[slideItem.id].push(match.split('|')[0]);
                                                dependencyIds[slideIndex].cardFields[field.id].push(match.split('|')[0]);
                                            });
                                        } else {
                                            dependencyIds[slideIndex].cards[slideItem.id].push(field.id.toString());
                                        }

                                        let recipientMatches = Helpers.getMatches(field.recipients, regEx);
                                        if (recipientMatches.length) {
                                            recipientMatches.forEach((match, i) => {
                                                dependencyIds[slideIndex].cards[slideItem.id].push(match);
                                                dependencyIds[slideIndex].cardFields[field.id].push(match);
                                            });
                                        }
                                    });
                                    break;
                                case 'table':
                                    let tableId = slideItem.table.id,
                                        thisTableNewRowValues = [];

                                    dependencyIds[slideIndex].tables[slideItem.table.id] = [];

                                    slideItem.table.columns.forEach((column, columnIndex) => {
                                        const field = Immutable.fromJS(column.field);
                                        thisTableNewRowValues.push(field.toJS().value);
                                        slideItem.table.rows.forEach((row, rowIndex) => {

                                            // In case value is dynamic
                                            let fields = Object.assign(cardFields, tableFields),
                                                humanValues = Object.assign(cardHumanValues, tableHumanValues),
                                                returnValue = row.data[columnIndex],
                                                cellId = [column.id, row.id].join('_');

                                            tableFields[cellId] = regEx.test(returnValue) ? Object.assign(field.toJS(), {locked: true}) : Object.assign(field.toJS(), {locked: false});
                                            tableFieldValues[cellId] = returnValue;
                                            tableHumanValues[cellId] = regEx.test(returnValue) ? Helpers.replaceVal(returnValue, fields, humanValues) : Helpers.formatRowValue(row.data[columnIndex], field.toJS(), members);

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
                                    });
                                    tableNewRowValues[tableId] = thisTableNewRowValues;
                                    break;
                                default:
                                    return false;
                            }
                        });
                    });

                    // console.log(tool, cardFields, cardFieldValues, cardHumanValues, tableNewRowValues, tableFields, tableFieldValues, tableHumanValues, dependencyIds);

                    dispatch(getLocalToolSuccess({
                        tool: tool,
                        cardFields: cardFields,
                        cardFieldValues: cardFieldValues,
                        cardHumanValues: cardHumanValues,
                        tableNewRowValues: tableNewRowValues,
                        tableFields: tableFields,
                        tableFieldValues: tableFieldValues,
                        tableHumanValues: tableHumanValues,
                        dependencyIds: dependencyIds
                    }));
                } else {
                    dispatch(getLocalToolBlankJSON());
                }
            })

            .catch((error) => {
                // console.log("ERROR: ", error);
                dispatch(getLocalToolFailure(error));
            });
    };
}

export function onToolFieldChange(prefix, id, fieldValue, humanValue) {
    return {
        type: ON_TOOL_FIELD_CHANGE,
        payload: {
            prefix: prefix,
            id: id,
            fieldValue: fieldValue,
            humanValue: humanValue,
            editedField: true
        }
    };
}

export function onStaticToolFieldChange(value) {
  value.editedField = true;
    return {
        type: ON_STATIC_TOOL_FIELD_CHANGE,
        payload: value
    };
}

export function onTableRowAdd(tool, slideId, tableId, columns, rowId) {
    return {
        type: ON_TABLE_ROW_ADD,
        payload: {
            tool: tool,
            slideId: slideId,
            tableId: tableId,
            columns: columns,
            rowId: rowId
        }
    };
}

export function onTableRowDelete(tool, tableId, columns, rowId) {
    return {
        type: ON_TABLE_ROW_DELETE,
        payload: {
            tool: tool,
            tableId: tableId,
            columns: columns,
            rowId: rowId
        }
    };
}
