/**
 * # TableHeaderRow.js
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

import TableHeaderCell from './TableHeaderCell'

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

var TableHeaderRow = React.createClass({
    propTypes: {
        columns: PropTypes.array
    },

    render: function () {
        return <View style={[styles.tr, {backgroundColor: '#f4f4f4'}]}>
            {
                this.props.columns.map((th, columnIndex) => {
                    return <TableHeaderCell
                        key={[th.id, columnIndex].join('_')}
                        th={th}
                        columnIndex={columnIndex}
                    />
                })
            }
        </View>
    }
});

module.exports = TableHeaderRow;
