/**
 * # FormStylesheet.js
 *
 * Global stylesheet for form fields.
 *
 */
'use strict';
/**
 * ## Imports
 *
 * The necessary React components
 */
import React from 'react';
import {
    StyleSheet,
    Platform
}
    from 'react-native';

const LABEL_COLOUR = 'hsl(211, 12%, 54%)';
const INPUT_COLOUR = 'hsl(0, 0%, 20%)';
const BORDER_COLOUR = 'hsl(210, 13%, 91%)';
const ERROR_COLOUR = 'hsl(1, 44%, 46%)';
const HELP_COLOUR = 'hsl(189, 67%, 68%)';
const DISABLED_COLOUR = 'hsl(0, 0%, 47%)';
const DISABLED_BACKGROUND_COLOUR = 'hsl(0, 0%, 93%)';
const FONT = 'Roboto';
const FONT_SIZE = 14;
const FONT_WEIGHT = '300';

var stylesheet = Object.freeze({
    fieldset: {},
    // the style applied to the container of all inputs
    formGroup: {
        normal: {
            marginBottom: 20
        },
        error: {
            marginBottom: 20
        }
    },
    inputBorder: {
        normal: {
            borderBottomColor: BORDER_COLOUR,
            borderBottomWidth: StyleSheet.hairlineWidth
        },
        error: {
            borderBottomColor: ERROR_COLOUR,
            borderBottomWidth: StyleSheet.hairlineWidth,
            // Overflow is not supported on Android
            // https://github.com/facebook/react-native/issues/6802
            // So need to increase container size to fit errorBlock
            paddingBottom: Platform.OS === 'ios' ? 0 : 18
        }
    },
    controlLabel: {
        normal: {
            color: LABEL_COLOUR,
            fontFamily: FONT,
            fontSize: FONT_SIZE,
            marginBottom: 2,
            fontWeight: FONT_WEIGHT
        },
        // the style applied when a validation error occurs
        error: {
            color: ERROR_COLOUR,
            fontFamily: FONT,
            fontSize: FONT_SIZE,
            marginBottom: 2,
            fontWeight: FONT_WEIGHT
        }
    },
    helpBlock: {
        normal: {
            color: HELP_COLOUR,
            fontFamily: FONT,
            fontSize: FONT_SIZE,
            fontWeight: FONT_WEIGHT,
            marginBottom: 2
        },
        // the style applied when a validation error occurs
        error: {
            color: HELP_COLOUR,
            fontFamily: FONT,
            fontSize: FONT_SIZE,
            fontWeight: FONT_WEIGHT,
            marginBottom: 2
        }
    },
    errorBlock: {
        position: 'absolute',
        right: 0,
        fontFamily: FONT,
        fontSize: FONT_SIZE - 3,
        fontWeight: FONT_WEIGHT,
        marginBottom: 2,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: ERROR_COLOUR,
        color: 'white',
        textAlign: 'center'
    },
    textbox: {
        normal: {
            color: INPUT_COLOUR,
            fontFamily: FONT,
            fontSize: FONT_SIZE,
            fontWeight: FONT_WEIGHT,
            height: 32,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 7,
            paddingRight: 7,
            borderRadius: 0
        },
        // the style applied when a validation error occurs
        error: {
            color: INPUT_COLOUR,
            fontFamily: FONT,
            fontSize: FONT_SIZE,
            fontWeight: FONT_WEIGHT,
            height: 32,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 7,
            paddingRight: 7,
            borderRadius: 0
        },
        // the style applied when the textbox is not editable
        notEditable: {
            fontFamily: FONT,
            fontSize: FONT_SIZE,
            fontWeight: FONT_WEIGHT,
            height: 32,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 7,
            paddingRight: 7,
            borderRadius: 0,
            color: DISABLED_COLOUR
        }
    },
    checkbox: {
        normal: {
            marginBottom: 4
        },
        // the style applied when a validation error occurs
        error: {
            marginBottom: 4
        }
    },
    select: {
        normal: {
            marginBottom: 4
        },
        // the style applied when a validation error occurs
        error: {
            marginBottom: 4
        }
    },
    datepicker: {
        normal: {
            marginBottom: 4
        },
        // the style applied when a validation error occurs
        error: {
            marginBottom: 4
        }
    }
});

module.exports = stylesheet;
