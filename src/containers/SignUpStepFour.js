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
}
    from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-spring-carousel';
import Separator from '../components/Separator';

var {height, width} = Dimensions.get('window');
const CAROUSEL_HEIGHT = 250;

const Back_Button =  require('../images/newimages/backbutton.png');
const RightArrow_Button =  require('../images/newimages/rightarrow_gray.png');

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
        backgroundColor: '#FF5722',
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
        marginTop: 20,
        alignItems: 'center'
    },
    mainText: {
        fontFamily: 'Roboto-Medium', 
        fontSize: 24, 
        color: 'white'
    },
    touchView: {
        width: width-40, 
        marginLeft: 20
    },
    touchUpperView: {
        width: width-40, 
        height: 50, 
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    textView: {
        width: width-40-50, 
        height: 50, 
        justifyContent: 'center', 
        marginLeft: 10
    },
    textStyle: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 17, 
        color: '#4A4A4A'
    },
    arrowView: {
        width: 50, 
        height: 50,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    imageStyle: {
        width: 9, 
        height: 15, 
        resizeMode: 'contain'
    }
});

var CookieManager = require('react-native-cookies');

class SignUpStepFour extends Component {
    componentDidMount() {
        // console.log(this.state, this.props);
        if (Platform.OS === 'ios') CookieManager.getAll((err, res) => {
            // console.log('cookies!');
            // console.log(err);
            // console.log(res);
        });
    }

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
                        <Text style={styles.navTitle}>
                                Step 4 of 4
                        </Text>
                    </View>
                    <View style={styles.nextView}>
                        <TouchableOpacity  onPress={() => {
                                                Actions.TabBar({
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
                    <Text style={styles.mainText}>
                        iLeader
                    </Text>
                </View>
                <View style={styles.touchView}>
                    <TouchableOpacity style={styles.touchUpperView}>
                        <View style={styles.textView}>
                            <Text style={styles.textStyle}>
                                Company Type
                            </Text>
                        </View>
                        <View style={styles.arrowView}>
                            <Image source={RightArrow_Button} style={styles.imageStyle}/>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#9B9B9B"} width={width-40} height={1}/>
                    <TouchableOpacity style={styles.touchUpperView}>
                        <View style={styles.textView}>
                            <Text style={styles.textStyle}>
                                Company Size
                            </Text>
                        </View>
                        <View style={styles.arrowView}>
                            <Image source={RightArrow_Button} style={styles.imageStyle}/>
                        </View>
                    </TouchableOpacity>                    
                </View>
            </View>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStepFour);
