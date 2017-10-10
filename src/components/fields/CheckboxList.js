/**
 * # CheckboxList.js
 *
 */
'use strict';
/**
 * ## Import
 *
 */
import React, {PropTypes} from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    ListView,
    StyleSheet,
    Switch
}
    from 'react-native';

const {is} = require('immutable');

var globalStyles = require('../Stylesheet');
const PADDING = 20;
const BORDER_COLOUR = 'hsl(210, 13%, 91%)';
const LABEL_COLOUR = 'hsl(0, 0%, 20%)';
const FONT_SIZE = 14;
const styles = StyleSheet.create({
    listViewContainer: {
        flex: 1,
        marginBottom: PADDING
    },
    listViewRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: BORDER_COLOUR,
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingTop: PADDING / 4,
        paddingBottom: PADDING / 4
    },
    switchLabelOuter: {
        flex: 1,
        flexDirection: 'column'
    },
    switchLabel: {
        fontSize: FONT_SIZE,
        color: LABEL_COLOUR
    },
    switchOuter: {
        flex: 1,
        flexDirection: 'column'
    },
    switch: {
        alignSelf: 'flex-end'
    },
    fakeInputLabel: {
        marginBottom: 2
    }
});

var CheckboxList = React.createClass({

    propTypes: {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        field: PropTypes.object,
        thisPrimaryColour: PropTypes.string,
        thisSecondaryColour: PropTypes.string,
        cardBackgroundColour: PropTypes.string
    },

    getInitialState: function () {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        return {
            loading: true,
            dataSource: ds.cloneWithRows([{value: false, text: 'Option 1'}]),
            options: [],
            label: ''
        };
    },

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.state, nextProps.cardFieldValues.toJS()[nextProps.id]);
    },

    componentDidMount() {
        if (this.props.cardFields) {
            let id = this.props.id,
                cardFields = this.props.cardFields.toJS(),
                tableFields = this.props.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields)
                //field = fields[id];

            var field = this.props.field;

            var ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });

            this.setState({
                loading: false,
                dataSource: ds.cloneWithRows(field.options),
                options: field.options,
                label: field.label
            });
        }
    },

    _renderRow(rowData, sec, i) {
        // console.log(this.props.field.options[i]);

        if (typeof rowData.value == 'string' || rowData.value instanceof String) {
            if (rowData.value === 'true' ) {
                rowData.value = true
            } else {
                rowData.value = false
            }
        }

        if (typeof rowData.value == 'number' || rowData.value instanceof Number) {
            if (rowData.value === 0 ) {
                rowData.value = false
            } else {
                rowData.value = true
            }
        }

        return <View style={styles.listViewRow}>
            <View style={styles.switchLabelOuter}>
                <Text style={[globalStyles.sansSerifLightText, styles.switchLabel]}>
                    {rowData.text}
                </Text>
            </View>
            <View style={styles.switchOuter}>
                <Switch
                    onValueChange={(value) => this._onValueChange(i, value)}
                    style={styles.switch}
                    value={rowData.value}
                />
            </View>
        </View>
    },

    render: function () {

        return <View style={styles.listViewContainer}>
        <Text
            style={[globalStyles.sansSerifLightText, globalStyles.bodyText, styles.fakeInputLabel, {color: '#939393'}]}>
            {this.state.label}
        </Text>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData, sec, i) => (this._renderRow(rowData, sec, i))}
            />
        </View>
    },

    _onValueChange(itemPosition, itemValue) {
        var newOptions = this.state.options;
        newOptions[itemPosition].value = itemValue;

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.setState({
            dataSource: ds.cloneWithRows(newOptions)
        });

        let checkedValues = [],
            checkedTexts = [];
        newOptions.forEach((opt) => {
            if (opt.value) {
                checkedValues.push(opt.value);
                checkedTexts.push(opt.text);
            }
        });

        let prefix = (typeof this.props.id === "string" && this.props.id.split('_').length > 1) ? 'tables' : 'cards';
        this.props.onToolFieldChange(prefix, this.props.id, newOptions, checkedTexts.join(', '));
    }
});

module.exports = CheckboxList;
