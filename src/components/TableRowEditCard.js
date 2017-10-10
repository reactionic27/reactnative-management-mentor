/**
 * # TableRowEditCard.js
 *
 */
'use strict';
/**
 * ## Imports
 *
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    Dimensions
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

import FormButton from '../components/FormButton';
const _ = require('underscore');

/**
 * ## Styles
 */
import Colour from '../lib/colour'
import Icon from 'react-native-vector-icons/MaterialIcons';
var globalStyles = require('../components/Stylesheet');
const PADDING = 20;
import Helpers from '../lib/helpers'
import HTMLParser from '../components/fields/HTMLParser'

var TableRowEditCard = React.createClass({
    propTypes: {
        rowData: PropTypes.object,
        rowIndex: PropTypes.number,
        columns: PropTypes.array,
        activeSection: PropTypes.bool
    },

    getInitialState: function () {
        return {
            editableComponents: []
        };
    },

    componentDidMount: function () {
        let editableComponents = [], that = this,
            rowId = this.props.rowData.id;
        const columns = this.props.columns,
            members = this.props.members,
            thisPrimaryColour = this.props.thisPrimaryColour,
            thisSecondaryColour = this.props.thisSecondaryColour;

        this.props.rowData.data.forEach((td, columnIndex) => {
            let id = [columns[columnIndex].field.id, rowId].join('_'),
                cardFields = this.props.cardFields.toJS(),
                tableFields = this.props.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields),
                f = fields[id];

            const field = _.assign({}, f);
            field.id = id;

            if (field.type == "checkbox") {
              field.isCell = true;
              field.options = [{value: td, text: columns[columnIndex].value}];
            }

            if (!field.locked) {
                let component = HTMLParser.getFieldComponent(
                    field,
                    that.props,
                    members,
                    thisPrimaryColour,
                    thisSecondaryColour,
                    Colour.get(that.props.thisPrimaryColour).drawerHeaderTextColour
                );

                editableComponents.push(component);
            }
        });

        // console.log(editableComponents.length);

        this.setState({
            editableComponents: editableComponents
        })
    },

    _componentHasChanged(nextProps, nextState) {
        // TODO: Very odd that this returns the correct boolean value, but the accordion doesn't toggle if it returns
        // TODO: anything but the bool "true". Perhaps all rows need to return true?
        // console.log("TABLE ROW EDIT CARD _componentHasChanged: ", nextProps.activeSection, this.props.activeSection);
        // console.log(is(nextProps.activeSection, this.props.activeSection) === false
        //     || (
        //         nextProps.updatedIds.toJS().length > 0
        //         && typeof nextProps.dependencyIds !== "undefined"
        //         && typeof nextProps.dependencyIds.toJS()[this.props.currentTab] !== "undefined"
        //         && typeof nextProps.dependencyIds.toJS()[this.props.currentTab].tableRows !== "undefined"
        //         && typeof nextProps.dependencyIds.toJS()[this.props.currentTab].tableRows[nextProps.id] !== "undefined"
        //         && nextProps.dependencyIds.toJS()[this.props.currentTab].tableRows[nextProps.rowData.id].length > 0
        //         && _.intersection(nextProps.updatedIds.toJS(), nextProps.dependencyIds.toJS()[this.props.currentTab].tableRows[nextProps.rowData.id]).length > 0
        //     ));
        return true;
    },

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("TABLE ROW EDIT CARD shouldComponentUpdate: ", this._componentHasChanged(nextProps, nextState));
        return this._componentHasChanged(nextProps, nextState);
    },

    render: function () {
        // console.log("===RENDER ROW EDIT CARD===");

        let deleteButtonText = <View>
            <View style={globalStyles.iconAndText}>
                <View style={globalStyles.buttonIconContainer}>
                    <Icon name='eject' size={18} color='white'/>
                </View>
                <View style={globalStyles.buttonTextContainer}>
                    <Text style={globalStyles.sansSerifRegularText}>
                        <Text style={[globalStyles.bodyText, {color: 'white'}]}>
                            DELETE ROW
                        </Text>
                    </Text>
                </View>
            </View>
        </View>;

        let deleteButton = <View style={{
                    paddingBottom: PADDING
                }}/>;
        // If an additional row, the id will be prefixed with NR => isNaN(rowId) returns true
        // Conversely, any IDs from the server will be PostgreSQL integer ids
        if (isNaN(this.props.rowData.id)) {
            // This is a row added in the app
            deleteButton = <View style={{
                    paddingTop: PADDING,
                    paddingBottom: PADDING
                }}>
                <FormButton
                    isDisabled={false}
                    onPress={this._deleteRow}
                    buttonText={deleteButtonText}
                    color={this.props.thisPrimaryColour}
                />
            </View>;
        }

        return <View
            style={this.state.editableComponents.length ? {
                        backgroundColor: '#f4f4f4',
                        borderTopColor: 'white',
                        borderTopWidth: StyleSheet.hairlineWidth
                } : {
                    height: 0
                }}
        >
            <ScrollView
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={350}
                style={{
                    paddingTop: PADDING,
                    paddingBottom: PADDING,
                    paddingLeft: PADDING,
                    paddingRight: PADDING
                }}
                keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'none'}
            >
                {this.state.editableComponents}
                {deleteButton}
            </ScrollView>
        </View>
    },

    _deleteRow() {
        let tableId = this.props.table.id,
            rowIndex = this.props.rowIndex,
            rowId = this.props.rowData.id;

        // console.log(this.props);

        let slideItem = this.props.tool.slides[this.props.currentTab].slideItems.find((slideItem) => (slideItem.table.id === tableId)),
            rows = slideItem.table.rows;

        for (var i = rowIndex + 1; i < rows.length; i++) {
            rows[i].position -= 1;
        }

        rows.splice(rowIndex, 1);

        let columns = this.props.table.columns.map((column) => {
            return {
                id: column.id,
                fields: column.field,
                fieldValue: column.field.value,
                humanValue: Helpers.formatFieldValue(column.field, this.props.members)
            }
        });

        this.props.onTableRowDelete(this.props.tool, tableId, columns, rowId);
    }

});

module.exports = TableRowEditCard;
