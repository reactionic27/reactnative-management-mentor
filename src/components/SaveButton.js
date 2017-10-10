/**
 * # SaveButton.js
 *
 * The list of links to go in the side drawer
 */
'use strict';
/**
 * ## Imports
 *
 * Imports from redux
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/**
 * The actions we need
 */
import * as toolsListActions from '../reducers/toolsList/toolsListActions';
import * as profileActions from '../reducers/profile/profileActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 * The necessary React components
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    ActivityIndicator,
    Platform
}
    from 'react-native';

import {Actions} from 'react-native-router-flux';

/**
 * ## Redux boilerplate
 */
const actions = [
    toolsListActions,
    profileActions
];

function mapStateToProps(state) {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch) {
    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();

    return {
        actions: bindActionCreators(creators, dispatch),
        dispatch
    };
}

/**
 * ### icons
 *
 * Add icon support for use in NavBar
 *
 */
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colour from '../lib/colour'
const DEFAULT_PRIMARY_COLOUR = 'hsl(204, 73%, 23%)';
var globalStyles = require('./Stylesheet');
const styles = StyleSheet.create({
    rightButton: {
        width: 100,
        height: 37,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 6 : 9,
        right: 2,
        padding: 8
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 1
    }
});

import Helpers from '../lib/helpers'

class SaveButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            iconStyles: {
                color: Colour.get(Helpers.getPrimaryColour(props)).menuIcon
            },
            icon: 'save'
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.saveIconState);
        this.setState({
            iconStyles: {
                color: Colour.get(Helpers.getPrimaryColour(nextProps)).menuIcon
            },
            icon: nextProps.saveIconState
        });
    }

    /**
     * ### render
     *
     * Display the SaveButton
     */
    render() {
        const name = 'SaveButton';

        let icon,
            onPress;
        switch(this.state.icon) {
            case 'save':
                icon = <Icon style={this.state.iconStyles} name='save' size={30}/>;
                onPress = () => {
                    this.props.persistToolSave();
                };
                break;
            case 'spinner':
                icon = <ActivityIndicator color={this.state.iconStyles.color} animating={true} style={{opacity: 1, marginRight: 5}}/>;
                onPress = () => (false);
                break;
            case 'tick':
                icon = <Icon style={this.state.iconStyles} name='check' size={30}/>;
                onPress = () => (false);
                break;
            default:
                icon = <Icon style={this.state.iconStyles} name='save' size={30}/>;
                onPress = () => {
                    this.props.persistToolSave();
                };
        }

        return (

            <TouchableOpacity key={'rightNavBarBtn' + name}
                              testID="rightNavButton"
                              style={[styles.rightButton, this.props.buttonContainerStyle]}
                              onPress={onPress.bind(this)}>
                <View style={[styles.view, this.props.buttonStyle]}>
                    {icon}
                </View>
            </TouchableOpacity>
        );
    }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
