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


const BACKGROUND_COLOUR = 'white';
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const GREY_COLOUR = 'hsl(211, 12%, 54%)';
const BLUE_COLOUR = 'hsl(189, 67%, 68%)';
const BORDER_COLOUR = 'hsl(210, 13%, 91%)';
const NAV_BAR_COLOUR = 'hsl(204, 73%, 23%)';
const LABEL_COLOUR = 'hsl(211, 12%, 54%)';
const CAPTION_COLOUR = 'hsl(195, 14%, 28%)';
const SANS_SERIF_FONT = 'Roboto';
const SERIF_FONT = 'Roboto Slab';
const FONT_SIZE = 14;
const LIGHT_FONT_WEIGHT = '300';
const REGULAR_FONT_WEIGHT = '400';
const MEDIUM_FONT_WEIGHT = '500';
const BOLD_FONT_WEIGHT = '600';
const PADDING = 20;

module.exports = StyleSheet.create({
    // NavBar
    navigationBarStyle: {
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        backgroundColor: NAV_BAR_COLOUR
    },
    navigationBarTitleStyle: {
        fontFamily: SANS_SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT,
        color: 'white'
    },
    tabBarStyle: {
        backgroundColor: BLUE_COLOUR,
        borderTopWidth: 1,
        borderTopColor: GREY_COLOUR,
        paddingTop: 1
    },

    // ScrollView
    scrollContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
    },

    // Flexbox
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOUR,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingTop: 2 * PADDING,
        paddingBottom: PADDING,
        paddingLeft: PADDING,
        paddingRight: PADDING
    },
    containerWithNavBar: {
        paddingTop: PADDING
    },
    row: {
        flex: 1,
        alignSelf: 'stretch'
    },
    column: {
        flex: 1,
        flexDirection: 'column'
    },

    // Text
    baseTextColour: {
        color: DARK_GREY_COLOUR
    },
    sansSerifLightText: Platform.OS === 'ios' ? {
        fontFamily: SANS_SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT
    } : {
        fontFamily: 'Roboto-Light'
    },
    serifLightText: Platform.OS === 'ios' ? {
        fontFamily: SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT
    } : {
        fontFamily: 'RobotoSlab-Light'
    },
    sansSerifRegularText: Platform.OS === 'ios' ? {
        fontFamily: SANS_SERIF_FONT,
        fontWeight: REGULAR_FONT_WEIGHT
    } : {
        fontFamily: 'Roboto-Regular'
    },
    serifRegularText: Platform.OS === 'ios' ? {
        fontFamily: SERIF_FONT,
        fontWeight: REGULAR_FONT_WEIGHT
    } : {
        fontFamily: 'RobotoSlab-Regular'
    },
    sansSerifMediumText: Platform.OS === 'ios' ? {
        fontFamily: SANS_SERIF_FONT,
        fontWeight: MEDIUM_FONT_WEIGHT
    } : {
        fontFamily: 'Roboto-Medium'
    },
    sansSerifBoldText: Platform.OS === 'ios' ? {
        fontFamily: SANS_SERIF_FONT,
        fontWeight: BOLD_FONT_WEIGHT
    } : {
        fontFamily: 'Roboto-Bold'
    },
    serifBoldText: Platform.OS === 'ios' ? {
        fontFamily: SERIF_FONT,
        fontWeight: BOLD_FONT_WEIGHT
    } : {
        fontFamily: 'RobotoSlab-Bold'
    },

    titleText: {
        fontSize: FONT_SIZE + 10,
        color: BLUE_COLOUR,
        fontWeight: REGULAR_FONT_WEIGHT
    },
    bodyText: {
        fontSize: FONT_SIZE,
        marginBottom: PADDING
    },
    labelText: {
        color: LABEL_COLOUR,
        fontSize: FONT_SIZE,
        marginBottom: PADDING
    },
    captionTitle: {
        color: CAPTION_COLOUR,
        fontSize: FONT_SIZE + 4,
        alignSelf: 'center',
        textAlign: 'center'
    },
    captionText: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    descriptionText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: FONT_SIZE + 3,
        marginTop: PADDING,
        marginBottom: PADDING
    },

    // List View
    listViewList: {
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 0 : PADDING / 2
    },
    listViewGridList: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: PADDING * 2
    },
    listViewSection: {
        flexDirection: 'row',
        paddingRight: PADDING,
        paddingLeft: PADDING,
        paddingTop: PADDING / 2,
        paddingBottom: PADDING / 2,
        marginBottom: PADDING / 2,
        backgroundColor: 'white',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: BORDER_COLOUR,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: BORDER_COLOUR
    },
    listViewSectionText: {
        fontSize: FONT_SIZE - 3
    },
    listViewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: PADDING / 2,
        paddingRight: PADDING,
        paddingLeft: PADDING
    },

    // Form inputs
    checkbox: {
        marginRight: 7,
        color: 'white'
    },
    avatarWithCaption: {
        borderBottomColor: BORDER_COLOUR,
        borderBottomWidth: 1,
        paddingBottom: PADDING - 5,
        marginLeft: -1 * PADDING,
        marginRight: -1 * PADDING
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: PADDING / 2
    },
    editAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: PADDING / 2
    },
    sliderLabel: {
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: PADDING / 2
    },

    // Buttons
    iconAndText: {
        flex: 1,
        flexDirection: 'row'
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    textContainer: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    formButtonContainer: {
        paddingTop: PADDING,
        paddingBottom: PADDING,
        paddingLeft: PADDING,
        paddingRight: PADDING
    },
    buttonIconContainer: {
        justifyContent: 'center'
    },
    buttonTextContainer: {
        justifyContent: 'center',
        marginLeft: PADDING / 4
    },
    
    // InfoBlock
    infoBlock: {
        flex: 1,
        paddingTop: PADDING / 2,
        paddingBottom: PADDING / 2,
        paddingLeft: PADDING,
        paddingRight: PADDING * 2,
        marginBottom: 10,
        shadowOpacity: 0.2,
        shadowRadius: PADDING / 16,
        shadowOffset: {
            height: PADDING / 8,
            width: 0
        },
        elevation: 5
    },
    infoBlockText: Platform.OS === 'ios' ? {
        fontFamily: SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT
    } : {
        fontFamily: 'RobotoSlab-Light'
    },
    infoBlockClose: {
        position: 'absolute',
        top: (PADDING / 2) + 1,
        right: (PADDING / 2) + 1
    }
});