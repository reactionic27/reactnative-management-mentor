/**
 * # Tool.js
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
 * Immutable
 */
import Immutable from 'immutable';
const _ = require('underscore');

/**
 * The necessary React components
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    StatusBar,
    Dimensions,
    ScrollView,
    Platform,
    Animated,
    Easing,
    InteractionManager,
    ActivityIndicator,
    Image,
    TextInput,
    Switch,
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {CustomSegmentedControl} from 'react-native-custom-segmented-control';

import Separator from '../components/Separator';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../components/scrollableTabView/TabBar'

import FormButton from '../components/FormButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BackButton from '../components/BackButton';
/**
 * Router
 */
import {
    Actions,
} from 'react-native-router-flux';

/**
 * ## Redux boilerplate
 */
const actions = [

];

function mapStateToProps(state) {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch) {
    const creators = Immutable.Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();

    return {
        actions: bindActionCreators(creators, dispatch),
        dispatch
    };
}

const User1_Icon =  require('../images/newimages/user1.png');
const User2_Icon =  require('../images/newimages/user2.png');
const User3_Icon =  require('../images/newimages/user3.png');
const Plus_Icon =  require('../images/newimages/plus.png');

/**
 * ## Styles
 */
import GradientOverlay from '../components/BackgroundImage'
import Colour from '../lib/colour'
var globalStyles = require('../components/Stylesheet');
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
const PADDING = 20;
const SERIF_FONT = 'Roboto Slab';
const FONT_SIZE = 14;
const LIGHT_FONT_WEIGHT = '300';
const styles = StyleSheet.create({
    listViewContainer: {
        flex: 1,
    },
    messageList: {
        width: width, 
        height: 80, 
        flexDirection: 'row',
    },
    messageLeftView: {
        width: 60, 
        height: 80, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    messageRightView: {
        width: width-60, 
        flexDirection: 'column', 
        marginLeft: 10
    },
    upperView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 10
    },
    footerView: {
        width: width, 
        height: 50, 
        backgroundColor: '#EEEEEE', 
        flexDirection: 'row'
    },
    plusView: {
        width: 50, 
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    inputView: {
        width: width-80, 
        height: 50, 
        alignItems: 'center'
    },
    textinputView: {
        backgroundColor: '#FFFFFF', 
        width: width-80, 
        height: 30, 
        marginTop: 10
    },
});

class AgendaTwo extends Component {
    /**
     * ## Tools class
     * Set the initial state
     */
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    /**
     * ### componentWillReceiveProps
     */
    componentWillReceiveProps(nextProps) {

    }

    _onComponentDidMount() {

    }

    componentDidMount() {
        Actions.refresh({
            // TODO: This sends an object rather than string
            title: "Budget Review",
            renderBackButton: this._renderBackButton.bind(this)
        });

        if (Platform.OS === 'ios') {
            InteractionManager.runAfterInteractions(() => {
                this._onComponentDidMount();
            });
        } else {
            this._onComponentDidMount();
        }
    }

    _renderBackButton() {
        return <BackButton
            scene={this.props}
            onPress={() => {Actions.pop();}}
        />;
    }

    /**
     * ### render
     * display the form wrapped with the header and button
     */
    render() {
        return (
            <View style={styles.listViewContainer}>
                <ScrollView contentContainerStyle={{width: width, height: height-50}}>
                    <View style={styles.messageList}>
                        <View style={styles.messageLeftView}>
                            <Image source={User1_Icon} style={{width: 50, height: 50, resizeMode: 'contain'}}/>
                        </View>
                        <View style={styles.messageRightView}>
                            <View style={styles.upperView}>
                                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15, color: 'black'}}>
                                    James Merritt
                                </Text>
                                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#9CA1A6', marginLeft: 10}}>
                                    11:41 AM TODAY
                                </Text>
                            </View>
                            <View style={{width: width-100, marginTop: 5}}>
                                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 14, color: 'black'}}>
                                    Hi guys, I’ve changed the meeting room to 1F which has a screen for our presentation
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#EEEEEE"} width={width} height={1}/>
                    <View style={styles.messageList}>
                        <View style={styles.messageLeftView}>
                            <Image source={User3_Icon} style={{width: 50, height: 50, resizeMode: 'contain'}}/>
                        </View>
                        <View style={styles.messageRightView}>
                            <View style={styles.upperView}>
                                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15, color: 'black'}}>
                                    Liam Carter-Hawkins
                                </Text>
                                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#9CA1A6', marginLeft: 10}}>
                                    12:07 PM TODAY
                                </Text>
                            </View>
                            <View style={{width: width-100, marginTop: 5}}>
                                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 14, color: 'black'}}>
                                    Ok! Can Oliver please bring a HDMI cable??
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#EEEEEE"} width={width} height={1}/>
                    <View style={styles.messageList}>
                        <View style={styles.messageLeftView}>
                            <Image source={User2_Icon} style={{width: 50, height: 50, resizeMode: 'contain'}}/>
                        </View>
                        <View style={styles.messageRightView}>
                            <View style={styles.upperView}>
                                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15, color: 'black'}}>
                                    Oliver Costa
                                </Text>
                                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#9CA1A6', marginLeft: 10}}>
                                    12:12 PM TODAY
                                </Text>
                            </View>
                            <View style={{width: width-100, marginTop: 5}}>
                                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 14, color: 'black'}}>
                                    Yes, I will do that Liam.
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#EEEEEE"} width={width} height={1}/>
                </ScrollView>
                <View style={styles.footerView}>
                    <View style={styles.plusView}>
                        <Image source={Plus_Icon} style={{width: 24, height: 24, resizeMode: 'contain'}}/>
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.textinputView}>
                            <TextInput placeholder="Message group"
                                        placeholderTextColor="#9CA1A6"
                                        style={{width: width-80, marginLeft: 10, height: 34,}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaTwo);
