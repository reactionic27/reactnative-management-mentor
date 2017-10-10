/**
 * # BackButton.js
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
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

import {Actions} from 'react-native-router-flux';

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
import Colour from '../lib/colour'
var globalStyles = require('./Stylesheet');
const styles = StyleSheet.create({
    leftButton: {
        flexDirection: 'row',
        width: 100,
        height: 40,
        position: 'absolute',
        bottom: 8,
        left: 2,
        padding: 8
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 1
    },
    textContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 0
    },
    text: {
        fontSize: 18,
        fontWeight: '300',
        backgroundColor: 'transparent'
    }
});

import Helpers from '../lib/helpers'

class BackButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            iconStyles: {
                color: Colour.get(Helpers.getPrimaryColour(props)).menuIcon
            },
            wideBackButton: props.scene.wideBackButton
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            iconStyles: {
                color: Colour.get(Helpers.getPrimaryColour(nextProps)).menuIcon
            },
            wideBackButton: nextProps.scene.wideBackButton
        });
    }

    componentDidMount() {
        // console.log(this.props);

        switch(this.props.scene.name) {
            case "Checklist":
                var title = Helpers.truncate.apply(this.props.scene.backTitle, [20, true]);
                Actions.refresh({backTitle: title.toString()});
                break;
        }
    }

    /**
     * ### render
     *
     * Display the BackButton
     */
    render() {
        const name = 'BackButton';
        const backTitle = this.props.scene.backTitle || 'back';

        return (

            <TouchableOpacity key={'leftNavBarBtn' + name}
                              testID="leftNavButton"
                              style={this.state.wideBackButton ? [styles.leftButton, {width: width - 100}] : styles.leftButton}
                              onPress={() => {
                                  if (this.props.onPress) {
                                      this.props.onPress();
                                  } else {
                                      Actions.pop();
                                  }
                              }}>
                <View style={styles.iconContainer}>
                    <Icon style={this.state.iconStyles} name='angle-left' size={30}/>
                </View>
                <View style={[this.state.wideBackButton ? [styles.textContainer, {flex: 15}] : styles.textContainer]}>
                    <Text style={globalStyles.sansSerifLightText}>
                        <Text style={[this.state.iconStyles, styles.text]}>
                            {backTitle}
                        </Text>
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(BackButton);
