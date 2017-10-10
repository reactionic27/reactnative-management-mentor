/**
 * # FormButton.js
 *
 * Display a button that responds to onPress and is colored appropriately
 */
'use strict';
/**
 * ## Imports
 *
 * React
 */
import React, {PropTypes} from 'react';
import {
    View,
    ActivityIndicator
}
    from 'react-native';

/**
 * The platform neutral button
 */
var globalStyles = require('./Stylesheet');
const BLUE_COLOUR = 'hsl(189, 67%, 68%)';
const BORDER_RADIUS = 0;
const FONT_SIZE = 14;

const Button = require('apsl-react-native-button');

var FormButton = React.createClass({

    propTypes: {
        color: PropTypes.string,
        isFetching: PropTypes.bool,
        isDisabled: PropTypes.bool,
        onPress: PropTypes.func,
        buttonText: PropTypes.any
    },

    /**
     * ### render
     *
     * Display the Button
     */
    render() {
        let activityIndicator = <ActivityIndicator
            color='white'
            animating={true}
            style={{opacity: 1}}
        />;
        return (
            <View>
                <Button style={{
        backgroundColor: this.props.color || BLUE_COLOUR,
        borderColor: this.props.color || BLUE_COLOUR,
        borderRadius: BORDER_RADIUS
    }}
                        textStyle={[globalStyles.sansSerifRegularText, {
        color: 'white',
        fontSize: FONT_SIZE
    }]}
                        isDisabled={this.props.isDisabled}
                        onPress={this.props.onPress}>
                    {this.props.isFetching ? activityIndicator : this.props.buttonText}
                </Button>
            </View>
        );
    }
});

module.exports = FormButton;
