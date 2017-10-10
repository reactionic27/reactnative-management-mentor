/**
 * # toolReducer.js
 *
 * The reducer user tool actions
 */
'use strict';

const {fromJS, Map} = require('immutable');

/**
 * ## Actions
 *
 */
const {
    GET_LOCAL_TOOL_REQUEST,
    GET_LOCAL_TOOL_SUCCESS,
    GET_LOCAL_TOOL_BLANK_JSON,
    GET_LOCAL_TOOL_FAILURE,

    GET_LOCAL_TOOL_SAVE_REQUEST,
    GET_LOCAL_TOOL_SAVE_SUCCESS,
    GET_LOCAL_TOOL_SAVE_BLANK_JSON,
    GET_LOCAL_TOOL_SAVE_FAILURE,

    LOCAL_TOOL_SAVE_CREATE_SUCCESS,
    TOOL_SAVE_CREATE_SUCCESS,
    TOOL_SAVE_SYNC_SUCCESS,

    LOCAL_TOOL_SAVE_CREATE_AND_EXIT_SUCCESS,
    TOOL_SAVE_CREATE_AND_EXIT_SUCCESS,

    ON_TOOL_FIELD_CHANGE,
    ON_STATIC_TOOL_FIELD_CHANGE,

    ON_TABLE_ROW_ADD,
    ON_TABLE_ROW_DELETE,

    LOGOUT_SUCCESS,

    SET_STATE
} = require('../../lib/constants').default;

/**
 * ## Initial State
 *
 */
const InitialState = require('./toolInitialState').default;
const initialState = new InitialState;

/**
 * ## toolReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function toolReducer(state = initialState, action) {
    let nextState = null;

    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

    switch (action.type) {
        /**
         * ### Request starts
         *
         */
        case GET_LOCAL_TOOL_REQUEST:
        case GET_LOCAL_TOOL_SAVE_REQUEST:
            // console.log(state, action);
            return state;

        /**
         * ### Request ends successfully
         */
        case GET_LOCAL_TOOL_SUCCESS:
            // console.log(state, action);
            nextState = state
                .set('uuid', null)
                .set('name', null)
                .set('staticData', fromJS({}))
                .set('updatedIds', fromJS([]))
                .set('lastAddedTableId', null)
                .set('data', fromJS(action.payload.tool))
                .set('dependencyIds', fromJS(action.payload.dependencyIds))

                .setIn(['cards', 'fields'], fromJS(action.payload.cardFields))
                .setIn(['cards', 'fieldValues'], fromJS(action.payload.cardFieldValues))
                .setIn(['cards', 'humanValues'], fromJS(action.payload.cardHumanValues))

                .setIn(['tables', 'fields'], fromJS(action.payload.tableFields))
                .setIn(['tables', 'fieldValues'], fromJS(action.payload.tableFieldValues))
                .setIn(['tables', 'humanValues'], fromJS(action.payload.tableHumanValues))
                .setIn(['tables', 'newRowValues'], fromJS(action.payload.tableNewRowValues));

            return nextState;

        case GET_LOCAL_TOOL_SAVE_SUCCESS:
            // console.log(state, action);
            nextState = state
                .set('name', action.payload.name)
                .set('staticData', fromJS(action.payload.staticData))
                .set('updatedIds', fromJS([]))
                .set('lastAddedTableId', null)
                .set('data', fromJS(action.payload.tool))
                .set('dependencyIds', fromJS(action.payload.dependencyIds))

                .setIn(['cards', 'fields'], fromJS(action.payload.cardFields))
                .setIn(['cards', 'fieldValues'], fromJS(action.payload.cardFieldValues))
                .setIn(['cards', 'humanValues'], fromJS(action.payload.cardHumanValues))

                .setIn(['tables', 'fields'], fromJS(action.payload.tableFields))
                .setIn(['tables', 'fieldValues'], fromJS(action.payload.tableFieldValues))
                .setIn(['tables', 'humanValues'], fromJS(action.payload.tableHumanValues))
                .setIn(['tables', 'newRowValues'], fromJS(action.payload.tableNewRowValues));

            return nextState;

        case LOCAL_TOOL_SAVE_CREATE_SUCCESS:
        case TOOL_SAVE_CREATE_SUCCESS:
        case TOOL_SAVE_SYNC_SUCCESS:
            // console.log(state, action);
            return state
                .set('uuid', action.payload.uuid)
                .set('name', action.payload.name)
                .set('staticData', fromJS(action.payload.staticData));

        case LOCAL_TOOL_SAVE_CREATE_AND_EXIT_SUCCESS:
        case TOOL_SAVE_CREATE_AND_EXIT_SUCCESS:
            // console.log(state, action);
            return state
                .set('uuid', null)
                .set('name', null)
                .set('staticData', fromJS({}))
                .set('updatedIds', fromJS([]))
                .set('lastAddedTableId', null)
                .set('data', Map())
                .set('dependencyIds', fromJS([]));

        case ON_TOOL_FIELD_CHANGE:
            // console.log(state, action);
            const {prefix, id, fieldValue, humanValue, editedField} = action.payload;

            let updatedIds = state.updatedIds.toJS();
            if (updatedIds.indexOf(id.toString()) === -1) updatedIds.push(id.toString());

            nextState = state
                .updateIn([prefix, 'fieldValues'], (x) => {
                    return x.set(id.toString(), fieldValue);
                })
                .updateIn([prefix, 'humanValues'], (x) => {
                    return x.set(id.toString(), humanValue)
                })
                .set('updatedIds', fromJS(updatedIds))
                .set('lastAddedTableId', null)
                .set('editedField', editedField);

            return nextState;


        case ON_STATIC_TOOL_FIELD_CHANGE:
            // console.log(state, action);

            let obj = action.payload,
                staticData = state.staticData.toJS();

            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    staticData[prop] = obj[prop];
                }
            }

            return state
                .set('staticData', fromJS(staticData));

        case ON_TABLE_ROW_ADD:
            // console.log(state, action);
            var {tool, slideId, tableId, columns, rowId} = action.payload;
            var fieldsObj = {}, fieldValuesObj = {}, humanValuesObj = {};

            let dependencyIds = state.dependencyIds.toJS();

            columns.forEach((column) => {
                var columnId = column.id,
                    fieldId = [columnId, rowId].join('_');

                fieldsObj[fieldId] = column.fields;
                fieldValuesObj[fieldId] = column.fieldValue;
                humanValuesObj[fieldId] = column.humanValue;

                dependencyIds[slideId].tables[tableId].push(fieldId);
                dependencyIds[slideId].tableRows[rowId] = dependencyIds[slideId].tableRows[rowId] || [];
                dependencyIds[slideId].tableCells[fieldId] = dependencyIds[slideId].tableCells[fieldId] || [];
                dependencyIds[slideId].tableRows[rowId].push(fieldId);
                dependencyIds[slideId].tableCells[fieldId].push(fieldId);
            });

            // console.log(tableId, columns, rowId, fieldValuesObj, humanValuesObj);

            nextState = state
                .mergeIn(['tables', 'fields'], fromJS(fieldsObj))
                .mergeIn(['tables', 'fieldValues'], fromJS(fieldValuesObj))
                .mergeIn(['tables', 'humanValues'], fromJS(humanValuesObj))
                .set('data', fromJS(tool))
                .set('lastAddedTableId', tableId.toString())
                .set('dependencyIds', fromJS(dependencyIds));

            // console.log(nextState.lastAddedTableId, nextState.tables.fieldValues.toJS(), nextState.tables.humanValues.toJS());

            return nextState;


        case ON_TABLE_ROW_DELETE:
            // console.log(state, action);
            var {tool, tableId, columns, rowId} = action.payload;

            let keysToDelete = columns.map((column) => {
                return [column.id, rowId].join('_');
            });

            var fieldsObj = state.tables.fields.toJS(),
                fieldValuesObj = state.tables.fieldValues.toJS(),
                humanValuesObj = state.tables.humanValues.toJS();

            keysToDelete.forEach((key) => {
                delete fieldsObj[key];
                delete fieldValuesObj[key];
                delete humanValuesObj[key];
            });

            nextState = state
                .setIn(['tables', 'fields'], fromJS(fieldsObj))
                .setIn(['tables', 'fieldValues'], fromJS(fieldValuesObj))
                .setIn(['tables', 'humanValues'], fromJS(humanValuesObj))
                .set('data', fromJS(tool))
                .set('lastAddedTableId', tableId.toString())
                .set('updatedIds', fromJS([]));

            return nextState;


        /**
         * User logged out.
         *
         */
        case LOGOUT_SUCCESS:
            // console.log(state, action);
            return state;

        /**
         * ### Request fails
         */
        case GET_LOCAL_TOOL_FAILURE:
        case GET_LOCAL_TOOL_SAVE_FAILURE:
            // console.log(state, action);
            return state;

        /**
         * no state change, just an ability to track action requests...
         */
        case GET_LOCAL_TOOL_BLANK_JSON:
        case GET_LOCAL_TOOL_SAVE_BLANK_JSON:
            // console.log(state, action);
            return state;

        /**
         * ### set the state
         *
         * This is in support of Hot Loading - take the payload
         * and set the values into the state
         *
         */
        case SET_STATE:
            debugger;
            return state;

    }//switch
    /**
     * # Default
     */
    return state;
}
