/**
 * # TableCell.js
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
    View
}
    from 'react-native';

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

const {is} = require('immutable');
const _ = require('underscore');

/**
 * ## Styles
 */
const PADDING = 20;
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const styles = StyleSheet.create({
    td: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: PADDING / 2,
        paddingBottom: PADDING / 2
    },
    tdContent: {
        color: DARK_GREY_COLOUR,
        backgroundColor: 'transparent',
        fontSize: 12
    }
});

import Helpers from '../lib/helpers'

const moment = require('moment');

var TableCell = React.createClass({
    propTypes: {
        id: PropTypes.string,
        td: PropTypes.any,
        rowIndex: PropTypes.number,
        columnIndex: PropTypes.number,
        column: PropTypes.object
    },

    getInitialState: function () {
        return {
            value: '',
            loading: true
        };
    },

    componentWillReceiveProps: function (nextProps) {
        // console.log(nextProps.cardHumanValues.toJS());
        let id = nextProps.id,
            cardFields = nextProps.cardFields.toJS(),
            tableFields = nextProps.tableFields.toJS(),
            fields = Object.assign(cardFields, tableFields),
            field = fields[id],
            cardFieldValues = nextProps.cardFieldValues.toJS(),
            tableFieldValues = nextProps.tableFieldValues.toJS(),
            fieldValues = Object.assign(cardFieldValues, tableFieldValues),
            fieldValue = fieldValues[id],
            cardHumanValues = nextProps.cardHumanValues.toJS(),
            tableHumanValues = nextProps.tableHumanValues.toJS(),
            humanValues = Object.assign(cardHumanValues, tableHumanValues),
            unformattedValue = humanValues[id],
            textTransform = field.textTransform;

        let regEx = /<val>(.*?)<\/val>/g;

        if (regEx.test(fieldValue)) {
            unformattedValue = Helpers.replaceVal(fieldValue, fields, humanValues);
        }

        var value = Helpers.transformString(unformattedValue, textTransform);

        if (field.type == "checkbox") {
          if (fieldValue == "true") {
            value = "YES";
          } else if (fieldValue.value == true){
            value = "YES";
          } else if (fieldValue[0].value == true){
            value = "YES";
          } else {
            value = "NO";
          }
        }

        if (field.type == "dateTime") {
          value = fieldValue;
        }

        this.setState({
            value: value
        });
    },

    componentDidMount: function () {
        let id = this.props.id,
            cardFields = this.props.cardFields.toJS(),
            tableFields = this.props.tableFields.toJS(),
            fields = Object.assign(cardFields, tableFields),
            field = fields[id],
            cardFieldValues = this.props.cardFieldValues.toJS(),
            tableFieldValues = this.props.tableFieldValues.toJS(),
            fieldValues = Object.assign(cardFieldValues, tableFieldValues),
            fieldValue = fieldValues[id],
            cardHumanValues = this.props.cardHumanValues.toJS(),
            tableHumanValues = this.props.tableHumanValues.toJS(),
            humanValues = Object.assign(cardHumanValues, tableHumanValues),
            unformattedValue = humanValues[id],
            textTransform = field.textTransform;

        let regEx = /<val>(.*?)<\/val>/g;

        if (regEx.test(fieldValue)) {
            unformattedValue = Helpers.replaceVal(fieldValue, fields, humanValues);
        }

        var value = Helpers.transformString(unformattedValue, textTransform);

        if (field.type == "checkbox") {
          if (fieldValue == "true") {
            value = "YES";
          } else {
            value = "NO";
          }
        }

        if (field.type == "dateTime") {
          value = fieldValue;
        }

        this.setState({
            value: value,
            loading: false,
            field: field
        });
    },

    _componentHasChanged(nextProps, nextState) {
        // console.log("TABLE CELL _componentHasChanged: ", nextProps, this.props, nextState, this.state);
        return is(nextState.value, this.state.value) === false
            || (
                nextProps.updatedIds.toJS().length > 0
                && typeof nextProps.dependencyIds !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab] !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab].tableCells !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab].tableCells[nextProps.id] !== "undefined"
                && nextProps.dependencyIds.toJS()[this.props.currentTab].tableCells[nextProps.id].length > 0
                && _.intersection(nextProps.updatedIds.toJS(), nextProps.dependencyIds.toJS()[this.props.currentTab].tableCells[nextProps.id]).length > 0
            );
    },

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("TABLE CELL shouldComponentUpdate: ", this._componentHasChanged(nextProps, nextState));
        return this._componentHasChanged(nextProps, nextState);
    },

    render: function () {
        // console.log("===RENDER CELL===");

        let columnFlex = 1;
        if (this.state.field) {
            columnFlex = Helpers.getColumnFlex(this.state.field);
        }

        return <View
            style={[styles.td, {flex: columnFlex}]}
        >
            <Text
                style={[styles.tdContent, {textAlign: this.props.column.textAlign}]}
            >
                {this.state.value}
            </Text>
        </View>
    }
});

reactMixin(TableCell.prototype, TimerMixin);

module.exports = TableCell;
