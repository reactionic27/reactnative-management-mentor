/**
 * # Login.js
 *
 *  The container to display the Login form
 *
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
import * as authActions from '../reducers/auth/authActions';

/**
 * Router
 */
import {
    Actions,
} from 'react-native-router-flux';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   LoginRender
 */
import LoginRender from '../components/LoginRender';

/**
 * The necessary React components
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
}
    from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-spring-carousel';

const {height, width} = Dimensions.get('window');
const CAROUSEL_HEIGHT = 250;

const Back_Button =  require('../images/newimages/backbutton.png');

const {
    ORGANISATION_LOGIN,
    LOGIN,
    FORGOT_PASSWORD
} = require('../lib/constants').default;

/**
 * ## Redux boilerplate
 */
const actions = [
    authActions
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

var globalStyles = require('../components/Stylesheet');
var styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
        backgroundColor: '#2196F3',
    },
    navigationView: {
        width: width, 
        height: 60, 
        flexDirection: 'row', 
        marginTop: 20
    },
    backView: {
        width: 60, 
        height: 60, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    middleView: {
        width: width-60-60, 
        height: 60, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    nextView: {
        width: 60, 
        height: 60, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    backTouchView: {
        width: 16, 
        height: 16
    },
    backIcon: {
        width: 16, 
        height: 16, 
        resizeMode: 'contain'
    },
    navTitle: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 17, 
        color: 'white'
    },
    nextTitle: {
        fontFamily: 'Roboto-Medium', 
        fontSize: 17, 
        color: 'white'
    },
    inputView: {
        width: width-40, 
        height: 50, 
        marginLeft: 20, 
        marginTop: 30
    },
    inputText: {
        width: width-40, 
        marginLeft: 10, 
        height: 34,
    },
    commentView: {
        width: width-40, 
        marginLeft: 20, 
        height: 150, 
        justifyContent: 'flex-end'
    },
    commentText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 14, 
        color: '#FFFFFF'
    }
});

var CookieManager = require('react-native-cookies');

class LoginStepTwo extends Component {
    constructor(props) {
		super(props);
		this.state = {
            email: '',
		};
	}

    componentDidMount() {
        // console.log(this.state, this.props);
        if (Platform.OS === 'ios') {
			Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
			Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
		}
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardDidShow(e));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardDidHide(e));
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow (e) {

    }

    _keyboardDidHide (e) {

    }

    keyboardWillShow (e) {

	}

	keyboardWillHide (e) {

	}

    _onKeywordChange(text) {
		this.setState({
			email: text
		});
	};

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <View style={styles.navigationView}>
                    <View style={styles.backView}>
                        <TouchableOpacity style={styles.backTouchView}
                                            onPress={() => {
                                                Actions.pop({
                                                });
                                            }}
                        >
                            <Image source={Back_Button} style={styles.backIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.middleView}>
                    </View>
                    <View style={styles.nextView}>
                        <TouchableOpacity  onPress={() => {
                                                Actions.LoginStepThree({
                                                    email: this.state.email
                                                });
                                            }}
                        >
                            <Text style={styles.nextTitle}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder="Enter your email"
                               placeholderTextColor="#FFFFFF"
                               fontSize={22}
                               color="white"
                               fontFamily={'Roboto-light'}
                               style={styles.inputText}
                               value={ this.state.email }
                               onChangeText={(text) => this._onKeywordChange(text)}
                    />
                </View>
            </View>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginStepTwo);
