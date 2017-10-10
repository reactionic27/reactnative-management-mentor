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
    ScrollView,
}
    from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-spring-carousel';
import BackButton from '../components/BackButton';
import Separator from '../components/Separator';
var {height, width} = Dimensions.get('window');
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
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

function buttonPressHandler(login, email, password) {
    login(email, password);
}

var globalStyles = require('../components/Stylesheet');
var styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
        backgroundColor: 'white'
    },
    navView: {
        width: width, 
        height: NAVBAR_PADDING, 
        backgroundColor: 'white',
        shadowColor: '#000000', 
        borderWidth: 0,
        shadowOpacity: 0.8, 
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 }, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    scrollView: {
        width: width-40, 
        marginLeft: 20,
    },
    minipaddingView: {
        width: width,
        height: 20,
    },
    separatorView: {
        width: width-40, 
        height: 50, 
        justifyContent: 'center', 
        flexDirection: 'row'
    },
    separatorTextView: {
        width: 100, 
        height: 50, 
        justifyContent: 'center',
        marginLeft: 20
    },
    separatorText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: '#787A80'
    },
    separatorLineView: {
        width: width-20-100, 
        height: 50, 
        justifyContent: 'center'
    },
    contentView: {
        width: width-40, 
        height: 66, 
        backgroundColor: '#CBD2D8', 
        borderRadius: 1,
        marginTop: 5,
    },
    paddingView: {
        width: width,
        height: 80,
    }
});

var CookieManager = require('react-native-cookies');

class Tasks extends Component {
    constructor(props) {
		super(props);
		this.state = {

		};
	}

    componentDidMount() {
        // console.log(this.state, this.props);
        Actions.refresh({
            // TODO: This sends an object rather than string
            title: "Tasks",
            renderBackButton: this._renderBackButton.bind(this)
        });
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

    _renderBackButton() {
        return <BackButton
            scene={this.props}
            onPress={() => {Actions.pop();}}
        />;
    }

    _keyboardDidShow (e) {

    }

    _keyboardDidHide (e) {

    }

    keyboardWillShow (e) {

	}

	keyboardWillHide (e) {

	}

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="default"/>
                <View style={styles.navView}>
                    <Text style={{fontFamily: 'Roboto-Regular', fontSize: 17, color: '#3F51B5'}}>
                        Tasks
                    </Text>
                </View>
                <View style={styles.minipaddingView}>
                </View>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.separatorView}>
                        <View style={styles.separatorTextView}>
                            <Text style={styles.separatorText}>
                                OVERDUE
                            </Text>
                        </View>
                        <View style={styles.separatorLineView}>
                            <Separator color={"#787A80"} width={width-40-100} height={1}/>
                        </View>
                    </View>
                    <View style={styles.contentView}>
                    </View>
                    <View style={styles.separatorView}>
                        <View style={styles.separatorTextView}>
                            <Text style={styles.separatorText}>
                                THIS WEEK
                            </Text>
                        </View>
                        <View style={styles.separatorLineView}>
                            <Separator color={"#787A80"} width={width-40-100} height={1}/>
                        </View>
                    </View>
                    <View style={styles.contentView}>
                    </View>
                    <View style={styles.contentView}>
                    </View>
                    <View style={styles.contentView}>
                    </View>
                    <View style={styles.contentView}>
                    </View>
                    <View style={styles.separatorView}>
                        <View style={styles.separatorTextView}>
                            <Text style={styles.separatorText}>
                                THIS MONTH
                            </Text>
                        </View>
                        <View style={styles.separatorLineView}>
                            <Separator color={"#787A80"} width={width-40-100} height={1}/>
                        </View>
                    </View>
                    <View style={styles.contentView}>
                    </View>
                    <View style={styles.contentView}>
                    </View>
                    <View style={styles.contentView}>
                    </View>
                    <View style={styles.contentView}>
                    </View>
                    <View style={styles.contentView}>
                    </View>
                    <View style={styles.paddingView}>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
