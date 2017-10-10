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
    Dimensions,
    ActivityIndicator
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

let AUTHENTICATED_BACKGROUND_IMAGE = require('../images/daily-feedback.jpg');

/**
 * ## App class
 */
let App = React.createClass({

    getInitialState() {
        return {
            loaded: false
        };
    },

    componentWillReceiveProps(nextProps) {
        // console.log(this.props.global.loaded, nextProps.global.loaded);

        // this.props.actions.setOrganisationInState();
        // this.props.actions.setProfileInState();
        // have both completed
        if (nextProps.global.loaded) {
            this.setState({
                loaded: true
            },
                () => this.props.actions.getSessionToken()
            );
        }
    },

    /**
     * Get any stored data
     *
     */
    componentWillMount() {
        this.props.actions.setOrganisationInState();
        this.props.actions.setProfileInState();
    },

    /**
     * See if there's a sessionToken from a previous login
     *
     */
    componentDidMount() {
    },

    render() {
        // console.log(this.state.loaded);
        let image = <View/>,
            spinnerColour = 'black';

        if (this.state.loaded) {
            if (this.props.global.currentUser) {
                image = <Image
                    source={AUTHENTICATED_BACKGROUND_IMAGE}
                    resizeMode='cover'
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        // Fix https://github.com/facebook/react-native/issues/950#issuecomment-210758358
                        height: null,
                        width: null
                    }}
                />;
                spinnerColour = 'black'
            } else {
                image = <Image
                    source={BACKGROUND_IMAGE}
                    resizeMode='cover'
                />;
                spinnerColour = 'white'
            }
        }

        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                {image}
                <ActivityIndicator
                    color={spinnerColour}
                    animating={true}
                    style={{
                        opacity: 1,
                        position: 'absolute',
                        top: (height / 2) - 10,
                        left: (width / 2) - 10
                    }}
                />
            </View>
        );
    }
});

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App);

