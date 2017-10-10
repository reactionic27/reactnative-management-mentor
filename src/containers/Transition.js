/**
 * # Transition.js
 *  Display startup screen when transitioning
 *
 *
 *
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
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {Actions} from 'react-native-router-flux'

/**
 * Immutable Map
 */
import {Map} from 'immutable';

/**
 * Project actions
 */
import * as authActions from '../reducers/auth/authActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * The components we need from ReactNative
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
}
    from 'react-native';

/**
 * ## Actions
 * 4 of our actions will be available as ```actions```
 */
const actions = [
    authActions,
    globalActions
];

/**
 *  Save that state
 */
function mapStateToProps(state) {
    return {
        ...state
    };
}

/**
 * Bind all the functions from the ```actions``` and bind them with
 * ```dispatch```
 */
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

const BLUE_COLOUR = 'hsl(189, 67%, 68%)';

var globalStyles = require('../components/Stylesheet');
var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: BLUE_COLOUR
    },
    titleContainer: {
        flex: 1
    },
    title: {
        fontSize: 40,
        color: 'white'
    }
});

/**
 * ## App class
 */
class Transition extends Component {

    /**
     * ## Rating class
     * Set the initial state and prepare the errorAlert
     */
    constructor(props) {
        super(props);
    }

    /**
     * See if there's a sessionToken from a previous login
     *
     */
    componentWillReceiveProps(nextProps) {
        setTimeout(function(event) {
            Actions.Drawer();
        }, 3000);
    }

    render(props) {
        // console.log(props)
        return (
            <View style={[globalStyles.container, styles.container]}>
                <View style={[globalStyles.column, {justifyContent: 'center'}, styles.titleContainer]}>
                    <Text style={{alignSelf: 'center'}}>
                        <Text style={globalStyles.sansSerifLightText}>
                            <Text style={[globalStyles.bodyText, styles.title]}>
                                WAITING
                            </Text>
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }
};

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Transition);

