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
import React from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
}
    from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-spring-carousel';

var {height, width} = Dimensions.get('window');
const CAROUSEL_HEIGHT = 250;

const Discussion_Icon =  require('../images/newimages/discussIcon.png');

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
        height: height
    },
    carouselView: {
        width: width-50, 
        height: CAROUSEL_HEIGHT, 
        backgroundColor: '#FF5722', 
        marginLeft: 25, 
        borderRadius: 4, 
        shadowColor: '#000000', 
        shadowOpacity: 0.8, 
        shadowRadius: 1,  
        shadowOffset: { width: 0, height: 1 },
        alignItems: 'center'
    },
    commentText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: '#FFFFFF', 
        marginTop: 20, 
        width: width-100, 
        textAlign: 'center'
    },
    discussionImage: {
        width: 85, 
        height: 85, 
        resizeMode: 'contain', 
        marginTop: 40
    },
    headText: {
        fontFamily: 'Roboto-Bold', 
        fontSize: 19, 
        color: 'white', 
        marginTop: 20
    },
    titleText: {
        fontFamily: 'Roboto-Bold', 
        fontSize: 20, 
        color: 'black', 
        width: width - 50, 
        textAlign: 'center'
    },
    titleView: {
        width: width - 50, 
        marginLeft: 25, 
        marginTop: 80
    },
    carouselEntireView: {
        width: width, 
        height: CAROUSEL_HEIGHT, 
        marginTop: 20,
    },
    loginButtonView: {
        width: width-20, 
        marginLeft: 10, 
        height: height-CAROUSEL_HEIGHT-100, 
        justifyContent: 'center'
    },
    signUpButton: {
        width: width-20, 
        height: 50, 
        backgroundColor: '#3F51B5', 
        borderRadius: 4, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    signupText: {
        fontFamily: 'Roboto-Bold', 
        fontSize: 17, 
        color: 'white'
    },
    signInButton: {
        width: width-100, 
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: 50, 
        marginTop: 10
    },
    signInText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: '#3F51B5'
    }
});

var CookieManager = require('react-native-cookies');

let Login = React.createClass({

    componentDidMount() {
        // console.log(this.state, this.props);
        if (Platform.OS === 'ios') CookieManager.getAll((err, res) => {
            // console.log('cookies!');
            // console.log(err);
            // console.log(res);
        });
    },

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="default"/>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        iLeader is your management secret weapon
                    </Text>
                </View>
                <View style={styles.carouselEntireView}>
                    <Carousel
                        width={width}
                        height={CAROUSEL_HEIGHT}
                        pagerColor={'rgba(0.74, 0.74, 0.74, 0.5)'}
                        activePagerColor={'rgba(0.74, 0.74, 0.74, 1)'}
                        pagerSize={5}
                        pagerOffset={10}
                        pagerMargin={3}
                    >
                        <View style={styles.carouselView}>  
                            <Text style={styles.headText}>
                                Heading
                            </Text>
                            <Image source={Discussion_Icon} style={styles.discussionImage}/>
                            <Text style={styles.commentText}>
                                Walkthrough iLeaders value and functions
                            </Text>
                        </View>
                        <View style={styles.carouselView}>  
                            <Text style={styles.headText}>
                                Heading
                            </Text>
                            <Image source={Discussion_Icon} style={styles.discussionImage}/>
                            <Text style={styles.commentText}>
                                Walkthrough iLeaders value and functions
                            </Text>
                        </View>
                        <View style={styles.carouselView}>  
                            <Text style={styles.headText}>
                                Heading
                            </Text>
                            <Image source={Discussion_Icon} style={styles.discussionImage}/>
                            <Text style={styles.commentText}>
                                Walkthrough iLeaders value and functions
                            </Text>
                        </View>
                        <View style={styles.carouselView}>  
                            <Text style={styles.headText}>
                                Heading
                            </Text>
                            <Image source={Discussion_Icon} style={styles.discussionImage}/>
                            <Text style={styles.commentText}>
                                Walkthrough iLeaders value and functions
                            </Text>
                        </View>
                    </Carousel>
                </View>
                <View style={styles.loginButtonView}>
                    <TouchableOpacity style={styles.signUpButton}
                                        onPress={() => {
                                            Actions.SignUpStepOne({
                                            });
                                        }}
                    >
                        <Text style={styles.signupText}>
                            Create a new iLeader Team
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signInButton}
                                        onPress={() => {
                                            Actions.LoginStepOne({
                                            });
                                        }}
                    >
                        <Text style={styles.signInText}>
                            Sign in to an existing team
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
