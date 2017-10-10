/**
 * # app.js
 *  Display startup screen and
 *  getSessionTokenAtStartup which will navigate upon completion
 *
 *
 *
 */
'use strict';
/*
 * ## Imports
 *  
 * Imports from redux
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

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

let BACKGROUND_IMAGE;
if (height <= 480) {
    BACKGROUND_IMAGE = require('../images/loginBackground/Default@2x.png'); // iPhone 4/4s
} else if (height <= 568) {
    BACKGROUND_IMAGE = require('../images/loginBackground/Default-568h@2x.png'); // iPhone 5/5s
} else if (height <= 667) {
    BACKGROUND_IMAGE = require('../images/loginBackground/Default-667h@2x.png'); // iPhone 6
} else if (height <= 736) {
    BACKGROUND_IMAGE = require('../images/loginBackground/Default-Portrait-736h@3x.png'); // iPhone 6+
} else {
    BACKGROUND_IMAGE = require('../images/loginBackground/Default-Portrait-736h@3x.png'); // iPhone 6+
}

/**
 * ## App class
 */
let App = React.createClass({
    /**
     * See if there's a sessionToken from a previous login
     *
     */
    componentDidMount() {
        this.props.actions.setOrganisationInState();
        this.props.actions.setProfileInState();
        
        this.props.actions.getSessionToken();
    },

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                    source={BACKGROUND_IMAGE}
                    resizeMode='cover'
                />
            </View>
        );
    }
});

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App);

