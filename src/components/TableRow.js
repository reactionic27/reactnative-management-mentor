/**
 * # TableRow.js
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
    View
}
    from 'react-native';

const _ = require('underscore');

import TableCell from './TableCell'

/**
 * ## Styles
 */
const PADDING = 20;
const styles = StyleSheet.create({
    tr: {
        flexDirection: 'row',
        overflow: 'hidden',
        paddingLeft: PADDING / 2,
        paddingRight: PADDING / 2,
        borderTopColor: '#f4f4f4',
        borderTopWidth: StyleSheet.hairlineWidth
    }
});

var TableRow = React.createClass({
    propTypes: {
        rowData: PropTypes.object,
        rowIndex: PropTypes.number,
        columns: PropTypes.array,
        activeSection: PropTypes.bool
    },

    _componentHasChanged(nextProps, nextState) {
        // console.log("TABLE ROW _componentHasChanged: ", nextProps, this.props, nextState, this.state);
        return nextProps.updatedIds.toJS().length > 0
                && typeof nextProps.dependencyIds !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab] !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab].tableRows !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab].tableRows[nextProps.rowData.id] !== "undefined"
                && nextProps.dependencyIds.toJS()[this.props.currentTab].tableRows[nextProps.rowData.id].length > 0
                && _.intersection(nextProps.updatedIds.toJS(), nextProps.dependencyIds.toJS()[this.props.currentTab].tableRows[nextProps.rowData.id]).length > 0;
    },

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("TABLE ROW shouldComponentUpdate: ", this._componentHasChanged(nextProps, nextState));
        return this._componentHasChanged(nextProps, nextState);
    },

    render: function () {
        // console.log("===RENDER ROW===");
        let rowId = this.props.rowData.id;
        return <View style={styles.tr}>
            {
                this.props.rowData.data.map((td, columnIndex) => {
                    const field = _.assign({}, this.props.columns[columnIndex].field);
                    let id = [field.id, rowId].join('_');

                    return <TableCell
                        {...this.props}
                        key={id}
                        id={id}
                        td={td}
                        rowIndex={this.props.rowIndex}
                        columnIndex={columnIndex}
                        column={this.props.columns[columnIndex]}
                    />
                })
            }
        </View>
    }
});

module.exports = TableRow;
