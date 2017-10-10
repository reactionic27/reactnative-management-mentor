/**
 * # Stylesheet.js
 *
 * Global stylesheet.
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


import Colour from '../../lib/colour'

const PADDING = 20;
const SANS_SERIF_FONT = 'Roboto';
const SERIF_FONT = 'Roboto Slab';
const FONT_SIZE = 14;
const REGULAR_FONT_WEIGHT = '400';
const LIGHT_FONT_WEIGHT = '300';
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';

module.exports = StyleSheet.create({
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
    },
    picker: Platform.OS === 'ios' ? {
        flex: 1,
        marginTop: -2
    } : {
        flex: 1,
        color: DARK_GREY_COLOUR
    },
    pickerItem: Platform.OS === 'ios' ? {
        color: DARK_GREY_COLOUR,
        height: 80,
        fontSize: FONT_SIZE,
        fontFamily: SANS_SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT
    } : {
        color: DARK_GREY_COLOUR,
        height: 67,
        fontSize: FONT_SIZE,
        fontFamily: 'Roboto-Light'
    }
});
