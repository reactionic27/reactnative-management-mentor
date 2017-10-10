/**
 * # TabIcon.js
 *
 * The list of links to go in the side drawer
 */
'use strict';
/**
 * ## Imports
 *
 * The necessary React components
 */
import React from 'react';
import {
    View,
    Text
}
    from 'react-native';

/**
 * ### icons
 *
 * Add icon support for use in TabBar
 *
 */
import Icon from 'react-native-vector-icons/FontAwesome';

var TabIcon = React.createClass({
    /**
     * ### render
     *
     * Display the DrawerContent
     */
    render() {
        var color = this.props.selected ? 'white' : 'hsla(360, 100%, 100%, 0.75)';

        return (
            <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center'}}>
                <Icon style={{color: color}} name={this.props.iconName} size={30}/>
                <Text style={{color: color}}>{this.props.title}</Text>
            </View>
        );
    }
});

module.exports = TabIcon;
