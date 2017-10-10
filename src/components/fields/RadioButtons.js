/**
 * # RadioButtons.js
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
    StyleSheet
}
    from 'react-native';

const {is} = require('immutable');

var globalStyles = require('../Stylesheet');
const PADDING = 20;
const FONT_SIZE = 14;
const styles = StyleSheet.create({
    segmentedControlsOption: {
        fontSize: FONT_SIZE
    },
    fakeInputLabel: {
        marginBottom: 2
    }
});

import {RadioButtons, SegmentedControls} from 'react-native-radio-buttons'

var RadioButtonsComponent = React.createClass({

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
            options: ['holder'],
            selected: 'holder',
            label: ''
        };
    },

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.state, nextProps.cardFieldValues.toJS()[nextProps.id]);
        if (nextProps.cardFields) {
            let id = nextProps.id,
                cardFields = nextProps.cardFields.toJS(),
                tableFields = nextProps.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields),
                field = fields[id];

            /*
            let selected = field.options.find((opt) => (opt.value)).text;

            this.setState({
                selected: selected
            });
            */
        }
    },

    componentDidMount() {
        if (this.props.cardFields) {
            let id = this.props.id,
                cardFields = this.props.cardFields.toJS(),
                tableFields = this.props.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields),
                field = fields[id];

            let options = field.options.map((option) => {
                    return option.text;
                }),
                selected = field.options.find((opt) => (opt.value)).text;

            this.setState({
                loading: false,
                options: options,
                selected: selected,
                label: field.label
            });
        }
    },

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.state.loading,
        //     this.props.prefix === 'cards'
        //     && is(nextProps.cardFieldValues.get(this.props.id.toString()), this.props.cardFieldValues.get(this.props.id.toString())) === false,
        //     this.props.prefix === 'tables'
        //     && is(nextProps.tableFieldValues.get(this.props.id.toString()), this.props.tableFieldValues.get(this.props.id.toString())) === false);
        return this.state.loading
            || (this.props.prefix === 'cards'
            && is(nextProps.cardFieldValues.get(this.props.id.toString()), this.props.cardFieldValues.get(this.props.id.toString())) === false)
            || (this.props.prefix === 'tables'
            && is(nextProps.tableFieldValues.get(this.props.id.toString()), this.props.tableFieldValues.get(this.props.id.toString())) === false)
    },

    render: function () {
        // console.log("===RENDER===");
        let radioButtons = <SegmentedControls
            direction={this.state.options.length > 3 ? 'column' : 'row'}
            options={this.state.options}
            onSelection={this._onValueChange}
            selectedOption={this.state.selected}
            tint={'hsl(0, 0%, 20%)'}
            backTint={this.props.cardBackgroundColour}
            selectedTint={this.props.cardBackgroundColour}
            optionStyle={[globalStyles.sansSerifLightText, styles.segmentedControlsOption]}
            containerStyle={{
                marginTop: PADDING,
                marginBottom: PADDING
            }}
        />;

        return <View>
        <Text
            style={[globalStyles.sansSerifLightText, globalStyles.bodyText, styles.fakeInputLabel, {color: '#939393'}]}>
            {this.state.label}
        </Text>
            {radioButtons}
        </View>
    },

    _onValueChange: function (selected) {
        this.setState({
            selected: selected
        });

        let prefix = (typeof this.props.id === "string" && this.props.id.split('_').length > 1) ? 'tables' : 'cards';
        this.props.onToolFieldChange(prefix, this.props.id, selected, selected);
    }
});

module.exports = RadioButtonsComponent;
