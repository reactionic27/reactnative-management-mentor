/**
 * # MenuTitleIcon.js
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
    Animated,
    StyleSheet,
    Platform
}
    from 'react-native';

/**
 * ## Redux boilerplate
 */
const actions = [
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
import Icon from 'react-native-vector-icons/FontAwesome';
const DEFAULT_PRIMARY_COLOUR = 'white';
const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        marginTop: 10,
        position: 'absolute',
        top: Platform.OS === 'ios' ? 20 : 0,
        left: 0,
        right: 0
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
});

import Helpers from '../lib/helpers'

class MenuTitleIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            iconStyles: {
                color: Helpers.getPrimaryColour(props)
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            iconStyles: {
                color: Helpers.getPrimaryColour(nextProps)
            }
        });
    }

    /**
     * ### render
     *
     * Display the DrawerContent
     */
    render() {
        const key = this.props.navigationState.key,
            index = this.props.titleIndex,
            anim = this.props.position,
            icon = this.props.titleIcon;

        return (
            <Animated.View
                key={key}
                style={[
                styles.title,
                {
                  opacity: anim.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0, 1, 0]
                  }),
                  left: anim.interpolate({
                    inputRange: [index - 1, index + 1],
                    outputRange: [100, -100]
                  }),
                  right: anim.interpolate({
                    inputRange: [index - 1, index + 1],
                    outputRange: [-100, 100]
                  })
                }
              ]}
            >
                <View style={styles.view}>
                    <Icon style={this.state.iconStyles} name={icon} size={20}/>
                </View>
            </Animated.View>
        );
        // );
    }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(MenuTitleIcon);
