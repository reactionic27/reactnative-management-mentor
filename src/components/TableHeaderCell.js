/**
 * # TableHeaderCell.js
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

/**
 * ## Styles
 */
const PADDING = 20;
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const styles = StyleSheet.create({
    th: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: PADDING / 2,
        paddingBottom: PADDING / 2
    },
    thContent: {
        color: DARK_GREY_COLOUR,
        backgroundColor: 'transparent',
        fontSize: 12
    }
});

import Helpers from '../lib/helpers'
var TableHeaderCell = React.createClass({
    propTypes: {
        th: PropTypes.object,
        columnIndex: PropTypes.number
    },

    render: function () {
        let value = Helpers.transformString(this.props.th.value, this.props.th.textTransform);

        let columnFlex = Helpers.getColumnFlex(this.props.th.field);

        return <View
            style={[styles.th, {flex: columnFlex}]}
        >
            <Text
                style={[styles.thContent, {textAlign: this.props.th.textAlign}]}
            >
                {value}
            </Text>
        </View>
    }
});

module.exports = TableHeaderCell;
