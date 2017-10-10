/**
 * # MenuBurger.js
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
import React, {
    PropTypes,
    Component
} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Platform
}
    from 'react-native';

var DismissKeyboard = require('dismissKeyboard'); // Require React Native's utility library.

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
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colour from '../lib/colour'
const DEFAULT_PRIMARY_COLOUR = 'hsl(204, 73%, 23%)';
const styles = StyleSheet.create({
    leftButton: {
        width: 100,
        height: 37,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 4 : 7,
        left: 2,
        padding: 8
    },
    view: {
        flex:1,
        justifyContent:'center',
        alignItems:'flex-start'
    }
});

import Helpers from '../lib/helpers'

class MenuBurger extends Component {

    constructor(props) {
        super(props);

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
     * Display the DrawerContent
     */
    render() {
        const name = 'MenuBurger';
        const drawer = this.context.drawer;

        return (

            <TouchableOpacity key={'leftNavBarBtn' + name}
                              testID="leftNavButton"
                              style={styles.leftButton}
                              onPress={() => {
                                  DismissKeyboard();
                                  drawer.toggle();
                              }}
            >
                <View style={styles.view}>
                    <Icon style={this.state.iconStyles} name='dehaze' size={30}/>
                </View>
            </TouchableOpacity>
        );
    }
}

MenuBurger.contextTypes = {
    drawer: PropTypes.object
};

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(MenuBurger);
