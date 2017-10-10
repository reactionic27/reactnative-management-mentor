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
import * as globalActions from '../reducers/global/globalActions';
import * as toolSavesListActions from '../reducers/toolSavesList/toolSavesListActions';
import * as toolsListActions from '../reducers/toolsList/toolsListActions';
import * as ratingActions from '../reducers/rating/ratingActions';
import * as profileActions from '../reducers/profile/profileActions';

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

/**
 *  The LoginForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import LoginForm from '../components/LoginForm';
import { organisationLogin } from "../reducers/auth/authActions"

var {height, width} = Dimensions.get('window');
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
    toolSavesListActions,
    toolsListActions,
    ratingActions,
    profileActions,
    authActions,
    globalActions
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
        marginLeft: 20, 
        marginTop: 150,
    },
    commentText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 14, 
        color: '#FFFFFF',
        textDecorationLine: 'underline',
    }
});

var CookieManager = require('react-native-cookies');

function buttonPressHandler(actions, uuid) {
    actions.organisationLogin(uuid);
}

class LoginStepOne extends Component {
    constructor(props) {
		super(props);
		this.state = {
            inputText: '',
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
			inputText: text
		});
	};

    render() {
        let onButtonPress = buttonPressHandler.bind(null,
            this.props.actions,
            this.state.inputText
        );

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
                        <TouchableOpacity  onPress={onButtonPress}
                        >
                            <Text style={styles.nextTitle}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputView}>
                    <TextInput ref="orgName"
                               placeholder="Enter your team name"
                               placeholderTextColor="#FFFFFF"
                               fontSize={22}
                               color="white"
                               fontFamily={'Roboto-light'}
                               style={styles.inputText}
                               value={ this.state.inputText }
                               onChangeText={(text) => this._onKeywordChange(text)}
                    />
                </View>
                <TouchableOpacity style={styles.commentView}>
                    <Text style={styles.commentText}>
                        I’ve don’t know my team’s name
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginStepOne);
