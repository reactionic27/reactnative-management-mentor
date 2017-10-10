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

import AgendaCreateModal from '../components/AgendaCreateModal';
import MeetingActiveModal from '../components/MeetingActiveModal';

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

const Calendar_Icon =  require('../images/newimages/calendar.png');
const Location_Icon =  require('../images/newimages/locationmark.png');
const Question_Icon =  require('../images/newimages/question.png');
const User1_Icon =  require('../images/newimages/user1.png');
const User2_Icon =  require('../images/newimages/user2.png');
const User3_Icon =  require('../images/newimages/user3.png');
const Start_Icon =  require('../images/newimages/start.png');

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
    locationView: {
        flexDirection: 'row', 
        width: width, 
        height: 40, 
        alignItems: 'center', 
        marginLeft: 10
    },
    locationHeight: {
        width: 30,
    },
    textStyle: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: 'black',
    },
    commentTextView: {
        width: width-40, 
        marginLeft: 20, 
        marginTop: 10
    },
    commentTextStyle: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: 'black', 
        width: width-40
    },
    separatorView: {
        width: width, 
        height: 30, 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 10
    },
    userImageView: {
        width: 60, 
        height: 60, 
        resizeMode: 'contain'
    },
    userScrollView: {
        height: 60, 
        marginTop: 10, 
        width: width-30, 
        marginLeft: 15
    },
    agendaLeftView: {
        width: width-30, 
        height: 60, 
        marginLeft: 15, 
        alignItems: 'center', 
        flexDirection: 'row', 
        marginTop: 10,
        shadowColor: '#000000', 
        shadowOpacity: 0.8, 
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 }, 
    },
    agendaTextView: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 16, 
        color: '#000000', 
        marginLeft: 10
    },
    agendaScoreView: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 26, 
        color: '#FF5722', 
        fontWeight: 'bold'
    },
    startbuttonView: {
        height: 50, 
        backgroundColor: '#FF5722', 
        justifyContent:'center', 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    startbuttonText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: '#FFFFFF', 
        marginLeft: 10,
    },
    agendaView: {
        width: 60, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
});

class AgendaOne extends Component {
    /**
     * ## Tools class
     * Set the initial state
     */
    constructor(props) {
        super(props);

        this.state = {
            agendaModalVisible: false,
            meetingActiveVisible: false,
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

    closeAgendaCreateModal(){
        this.setState({agendaModalVisible: false})
	}

    closeMeetingActiveModal(){
        this.setState({meetingActiveVisible: false})
	}

    /**
     * ### render
     * display the form wrapped with the header and button
     */
    render() {
        return (
            <View style={styles.listViewContainer}>
                <ScrollView contentContainerStyle={{height: height-50}}>
                    <View>
                        <View style={styles.locationView}>
                            <View style={styles.locationHeight}>
                                <Image source={Calendar_Icon} style={{width: 19, height: 22, resizeMode: 'contain'}}/>
                            </View>
                            <Text style={styles.textStyle}>
                                2PM, 19th December 2016
                            </Text>
                        </View>
                        <View style={styles.locationView}>
                            <View style={styles.locationHeight}>
                                <Image source={Location_Icon} style={{width: 23, height: 22, resizeMode: 'contain'}}/>
                            </View>
                            <Text style={styles.textStyle}>
                                Room GE
                            </Text>
                        </View>
                        <View style={styles.commentTextView}>
                            <Text style={styles.commentTextStyle}>
                                This is a quick meeting to determine whether or not it’s going to be worth pursueing new opportunities in this new segment.
                            </Text>
                        </View>
                        <View style={styles.separatorView}>
                            <View style={{width: 100,}}>
                                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 15, color: '#757575', marginLeft: 20}}>
                                    Attendees
                                </Text>
                            </View>
                            <View style={{width: width-100-50}}>
                                <Separator color={"#DFDCE3"} width={width-100-50} height={1}/>
                            </View>
                            <View style={{width: 50, marginLeft: 10}}>
                                <TouchableOpacity style={{width: 24, height: 24}}
                                                onPress={() => {
                                                    this.setState({agendaModalVisible: true})
                                                }}
                                >
                                    <Image source={Question_Icon} style={{width: 24, height: 24, resizeMode: 'contain'}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView horizontal={true} contentContainerStyle={styles.userScrollView}>
                            <Image source={User1_Icon} style={styles.userImageView}/>
                            <Image source={User2_Icon} style={styles.userImageView}/>
                            <Image source={User3_Icon} style={styles.userImageView}/>
                        </ScrollView>
                        <View style={styles.separatorView}>
                            <View style={{width: 100,}}>
                                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 15, color: '#757575', marginLeft: 20}}>
                                    Agenda
                                </Text>
                            </View>
                            <View style={{width: width-100-50}}>
                                <Separator color={"#DFDCE3"} width={width-100-50} height={1}/>
                            </View>
                            <View style={{width: 50, marginLeft: 10}}>
                                <TouchableOpacity style={{width: 24, height: 24}}
                                                onPress={() => {
                                                    this.setState({agendaModalVisible: true})
                                                }}
                                >
                                    <Image source={Question_Icon} style={{width: 24, height: 24, resizeMode: 'contain'}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.agendaLeftView}>
                            <View style={{width: width-30-60}}>
                                <Text style={styles.agendaTextView}>
                                    Monthly expenses review
                                </Text>
                            </View>
                            <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.agendaScoreView}>
                                    10
                                </Text>
                            </View>
                        </View>
                        <View style={styles.agendaLeftView}>
                            <View style={{width: width-30-60}}>
                                <Text style={styles.agendaTextView}>
                                    Discuss new employee benefits
                                </Text>
                            </View>
                            <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.agendaScoreView}>
                                    15
                                </Text>
                            </View>
                        </View>
                        <View style={styles.agendaLeftView}>
                            <View style={{width: width-30-60}}>
                                <Text style={styles.agendaTextView}>
                                    Discuss new employee benefits
                                </Text>
                            </View>
                            <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.agendaScoreView}>
                                    15
                                </Text>
                            </View>
                        </View>
                        <View style={styles.agendaLeftView}>
                            <View style={{width: width-30-60}}>
                                <Text style={styles.agendaTextView}>
                                    Monthly expenses review
                                </Text>
                            </View>
                            <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.agendaScoreView}>
                                    10
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.startbuttonView}
                                  onPress={() => {
                                      this.setState({meetingActiveVisible: true})
                                  }}
                >
                    <Image source={Start_Icon} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                    <Text style={styles.startbuttonText}>
                        START NOW
                    </Text>
                </TouchableOpacity>
                <AgendaCreateModal
						visible={this.state.agendaModalVisible}
						closeModal={() => this.closeAgendaCreateModal()}
				/>
                <MeetingActiveModal
						visible={this.state.meetingActiveVisible}
						closeModal={() => this.closeMeetingActiveModal()}
				/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaOne);
