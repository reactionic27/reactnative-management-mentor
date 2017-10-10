/**
 * # OptionSelect.js
 *
 */
'use strict';
/**
 * ## Imports
 *
 */
import React, {PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Picker,
    Text,
    TouchableWithoutFeedback,
    Platform
}
    from 'react-native';
const Item = Picker.Item;

const {is} = require('immutable');

var globalStyles = require('../Stylesheet');
const FONT_SIZE = 14;
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const styles = StyleSheet.create({
    picker: Platform.OS === 'ios' ? {
        flex: 1
    } : {
        flex: 1,
        color: DARK_GREY_COLOUR
    },
    pickerItem: {
        color: DARK_GREY_COLOUR,
        height: 80,
        fontSize: FONT_SIZE + 4
    },
    fakeInputLabel: {
        marginBottom: 2
    },
    fakeInput: {
        height: 32,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 0,
        borderBottomColor: 'hsl(210, 13%, 91%)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 15
    },
    fakeInputText: {
        color: DARK_GREY_COLOUR,
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 14
    }
});

var OptionSelect = React.createClass({

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
        return {
            loading: true,
            selected: 1,
            placeholder: '',
            options: [],
            mode: Picker.MODE_DIALOG,
            label: ''
        };
    },

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.state, nextProps.cardFieldValues.toJS()[nextProps.id]);
        if (nextProps.cardFields) {
            let id = nextProps.id,
                cardFieldValues = nextProps.cardFieldValues.toJS(),
                tableFieldValues = nextProps.tableFieldValues.toJS(),
                fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                selected = fieldValues[id];

            this.setState({
                selected: selected
            });
        }
    },

    componentDidMount() {
        if (this.props.cardFields) {
            let id = this.props.id,
                cardFields = this.props.cardFields.toJS(),
                tableFields = this.props.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields),
                field = fields[id],
                cardFieldValues = this.props.cardFieldValues.toJS(),
                tableFieldValues = this.props.tableFieldValues.toJS(),
                fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                selected = fieldValues[id];

            this.setState({
                loading: false,
                selected: selected,
                placeholder: field.placeholder,
                options: field.options,
                label: field.label
            });
        }
    },

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("OPTION SELECT shouldComponentUpdate: ",
        //     this.state.loading
        //     || (this.props.prefix === 'cards'
        //     && is(nextProps.cardFieldValues.get(this.props.id.toString()), this.props.cardFieldValues.get(this.props.id.toString())) === false)
        //     || (this.props.prefix === 'tables'
        //     && is(nextProps.tableFieldValues.get(this.props.id.toString()), this.props.tableFieldValues.get(this.props.id.toString())) === false)
        //     || is(nextState.selected, this.state.selected) === false);
        return this.state.loading
            || (this.props.prefix === 'cards'
            && is(nextProps.cardFieldValues.get(this.props.id.toString()), this.props.cardFieldValues.get(this.props.id.toString())) === false)
            || (this.props.prefix === 'tables'
            && is(nextProps.tableFieldValues.get(this.props.id.toString()), this.props.tableFieldValues.get(this.props.id.toString())) === false)
            || is(nextState.selected, this.state.selected) === false;
    },

    render() {
        // console.log("===RENDER===");
        return <View>
            <Text
                style={[globalStyles.sansSerifLightText, globalStyles.bodyText, styles.fakeInputLabel, {color: '#939393'}]}>
                {this.state.label}
            </Text>
            <Picker
                style={styles.picker}
                itemStyle={[globalStyles.sansSerifLightText, styles.pickerItem]}
                selectedValue={this.state.selected}
                onValueChange={this._onValueChange}>
                {
                    this.state.options.map(function (option) {
                        return <Item
                            key={option.value}
                            label={option.text}
                            value={option.value}
                        />;
                    })
                }
            </Picker>
        </View>
    },

    _onValueChange(itemValue, itemPosition) {
        this.setState({
            selected: itemValue
        });

        let prefix = (typeof this.props.id === "string" && this.props.id.split('_').length > 1) ? 'tables' : 'cards';
        this.props.onToolFieldChange(prefix, this.props.id, itemValue, this.state.options[itemPosition].text);
    }
});

module.exports = OptionSelect;
