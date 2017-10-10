/**
 * # TextBlock.js
 *
 */
'use strict';
/**
 * ## Import
 *
 */
import React, {PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    Platform
}
    from 'react-native';

import Colour from '../../lib/colour'
const PADDING = 20;
const SANS_SERIF_FONT = 'Roboto';
const SERIF_FONT = 'Roboto Slab';
const FONT_SIZE = 14;
const REGULAR_FONT_WEIGHT = '400';
const LIGHT_FONT_WEIGHT = '300';
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const styles = StyleSheet.create({
    heading1: Platform.OS === 'ios' ? {
        fontFamily: SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT,
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 10
    } : {
        fontFamily: 'RobotoSlab-Light',
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 10
    },
    heading2: Platform.OS === 'ios' ? {
        fontFamily: SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT,
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 4
    } : {
        fontFamily: 'RobotoSlab-Light',
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 4
    },
    heading3: Platform.OS === 'ios' ? {
        fontFamily: SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT,
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 2
    } : {
        fontFamily: 'RobotoSlab-Light',
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 2
    },
    paragraph: Platform.OS === 'ios' ? {
        fontFamily: SANS_SERIF_FONT,
        fontWeight: REGULAR_FONT_WEIGHT,
        marginBottom: PADDING,
        fontSize: FONT_SIZE
    } : {
        fontFamily: 'Roboto-Regular',
        marginBottom: PADDING,
        fontSize: FONT_SIZE
    },
    label: Platform.OS === 'ios' ? {
        fontFamily: SANS_SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT,
        marginBottom: PADDING / 2,
        fontSize: FONT_SIZE
    } : {
        fontFamily: 'Roboto-Light',
        marginBottom: PADDING,
        fontSize: FONT_SIZE
    }
});

import Helpers from '../../lib/helpers'

var PureRenderMixin = require('react-addons-pure-render-mixin');
var TextBlock = React.createClass({

    mixins: [PureRenderMixin],

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
            value: '',
            color: 'white',
            style: 'heading1',
            textAlign: 'left',
            fields: []
        };
    },

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.state);
        if (nextProps.cardFields) {
            let id = nextProps.id,
                cardFields = nextProps.cardFields.toJS(),
                tableFields = nextProps.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields),
                field = fields[id],
                cardHumanValues = nextProps.cardHumanValues.toJS(),
                tableHumanValues = nextProps.tableHumanValues.toJS(),
                humanValues = Object.assign(cardHumanValues, tableHumanValues),
                unformattedValue = humanValues[id],
                textTransform = field.textTransform;

            var value = Helpers.transformString(unformattedValue, textTransform);

            this.setState({
                value: value,
                humanValues: humanValues
            })
        }
    },

    componentDidMount() {
        if (this.props.cardFields) {
            // console.log(this.props, this.state);

            let id = this.props.id,
                cardFields = this.props.cardFields.toJS(),
                tableFields = this.props.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields),
                field = fields[id],
                cardHumanValues = this.props.cardHumanValues.toJS(),
                tableHumanValues = this.props.tableHumanValues.toJS(),
                humanValues = Object.assign(cardHumanValues, tableHumanValues),
                unformattedValue = humanValues[id],
                textTransform = field.textTransform;

            var value = Helpers.transformString(unformattedValue, textTransform);

            var colour = DARK_GREY_COLOUR;
            switch (field.style) {
                case 'heading1':
                case 'heading2':
                case 'heading3':
                case 'label':
                    colour = '#939393';
                    break;
                case 'paragraph':
                    colour = DARK_GREY_COLOUR;
                    break;
            }

            this.setState({
                value: value,
                colour: colour,
                style: field.style,
                textAlign: field.textAlign,
                humanValues: humanValues
            })
        }
    },

    render: function () {
        let returnValue, valId, defaultText,
            regEx = /<val>(.*?)<\/val>/g;
        return <Text
            style={[styles[this.state.style], {textAlign: this.state.textAlign, color: this.state.colour}]}>
            {
                this.state.value.replace(/<br>/g, '\n').replace(/<uli>/g, '\u2022 ').replace(regEx, (match, p1, p2) => {

                    [valId, defaultText] = p1.split('|');

                    returnValue = this.state.humanValues[valId] ? this.state.humanValues[valId] : defaultText;
                    returnValue = returnValue ? returnValue : defaultText;

                    return returnValue;
                })
            }
        </Text>;
    }
});

module.exports = TextBlock;
