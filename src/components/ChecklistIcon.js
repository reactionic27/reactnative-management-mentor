/**
 * # ChecklistIcon.js
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

class ChecklistIcon extends Component {

    constructor(props) {
        super(props);

        if (props.scene && props.scene.toolData) {
            // console.log(props.scene.toolData.checklist);
        }

        this.state = {
            iconStyles: {
                color: Colour.get(Helpers.getPrimaryColour(props)).menuIcon
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            iconStyles: {
                color: Colour.get(Helpers.getPrimaryColour(nextProps)).menuIcon
            }
        });
    }

    /**
     * ### render
     *
     * Display the ChecklistIcon
     */
    render() {
        const name = 'ChecklistIcon';

        /**
         * When the button is pressed, navigate to the checklist for this toolsList
         * passing the checklist with it
         */
        let onChecklistButtonPress = () => {
            let data = this.props.tool.data.toJS();
            if (data) {
                if (this.props.action === "ToolSaveChecklist") {
                    Actions.ToolSaveChecklist({
                        toolData: data,
                        backTitle: data.name
                    });
                } else {
                    Actions.Checklist({
                        toolData: data,
                        backTitle: data.name
                    });
                }
            } else {
                return false;
            }
        };

        return (

            <TouchableOpacity key={'rightNavBarBtn' + name}
                              testID="rightNavButton"
                              style={[styles.rightButton, this.props.buttonContainerStyle]}
                              onPress={onChecklistButtonPress.bind(this)}>
                <View style={[styles.view, this.props.buttonStyle]}>
                    <Icon style={this.state.iconStyles} name='playlist-add-check' size={30}/>
                </View>
            </TouchableOpacity>
        );
    }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(ChecklistIcon);
