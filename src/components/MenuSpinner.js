/**
 * # MenuSpinner.js
 *
 * The list of links to go in the side drawer
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
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
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Platform
}
    from 'react-native';

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

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
 * A spiner
 */
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colour from '../lib/colour'
const DEFAULT_PRIMARY_COLOUR = 'hsl(204, 73%, 23%)';
const styles = StyleSheet.create({
    rightButton: {
        width: 100,
        height: 37,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 5 : 8,
        right: 2,
        padding: 8
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});

import Helpers from '../lib/helpers'
let tickTimeout;
const TICK_TIMEOUT = 3000;

class MenuSpinner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinnerColor: Colour.get(Helpers.getPrimaryColour(props)).menuIcon,
            animating: Helpers.getAnimating(props),
            iconStyles: {
                color: Colour.get(Helpers.getPrimaryColour(props)).menuIcon
            },
            showIcon: false,
            icon: 'spinner'
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(Helpers.getAnimating(this.props), Helpers.getAnimating(nextProps));

        const nextState = {
            animating: Helpers.getAnimating(nextProps),
            showIcon: true
        };

        if (!Helpers.getAnimating(this.props) && Helpers.getAnimating(nextProps)) {
            nextState.icon = 'spinner';
        } else if (Helpers.getAnimating(this.props) && !Helpers.getAnimating(nextProps)) {
            nextState.icon = 'tick';

            clearInterval(tickTimeout);
            tickTimeout = this.setTimeout(() => {
                nextState.icon = 'spinner';
                nextState.animating = false;
                nextState.showIcon = false;
                this.setState(nextState);
            }, TICK_TIMEOUT);
        }

        this.setState(nextState);
    }

    /**
     * ### render
     *
     * Display the MenuSpinner
     */
    render() {
        const name = 'MenuSpinner';

        let icon,
            activityIndicator = <ActivityIndicator
                color={this.state.spinnerColor}
                animating={this.state.animating}
                style={{opacity: this.state.animating ? 1 : 0}}
            />;

        switch(this.state.icon) {
            case 'spinner':
                icon = activityIndicator;
                break;
            case 'tick':
                icon = <Icon style={[this.state.iconStyles, {opacity: this.state.showIcon ? 1 : 0}]} name='check' size={30}/>;
                break;
            default:
                icon = activityIndicator;
        }

        return (

            <TouchableOpacity key={'rightNavBarBtn' + name}
                              testID="rightNavButton"
                              style={styles.rightButton}>
                <View style={styles.view}>
                    {icon}
                </View>
            </TouchableOpacity>
        );
    }
}

reactMixin(MenuSpinner.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(MenuSpinner);
