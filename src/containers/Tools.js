/**
 * # Tools.js
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
import * as toolsListActions from '../reducers/toolsList/toolsListActions';
import * as profileActions from '../reducers/profile/profileActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Immutable
 */
import Immutable from 'immutable';

const Button = require('apsl-react-native-button');

/**
 * ### Search bar
 *
 * Add Search bar from React Native elements
 *
 */
import { SearchBar } from 'react-native-elements'

/**
 * The necessary React components
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    ScrollView,
    Platform,
    InteractionManager,
    ActivityIndicator,
    Image,
    TouchableOpacity
}
    from 'react-native';

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

var {height, width} = Dimensions.get('window');

import NavBarWithProps from '../components/NavBarWithProps'
import Accordion from '../components/AccordionList';

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
    toolsListActions,
    profileActions,
    globalActions
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

/**
 * ## Import Images
 */
const TeamMeeting_Yellow =  require('../images/newimages/team_meeting_yellow.png');
const DailyStandup_Yellow =  require('../images/newimages/daily_standup_yellow.png');
const DailyCheckin_Yellow =  require('../images/newimages/team_meeting_yellow.png');
const TeamMeeting_Blue =  require('../images/newimages/team_meeting_blue.png');
const DailyStandup_Blue =  require('../images/newimages/daily_standup_blue.png');
const TeamMeeting_Purple =  require('../images/newimages/team_meeting_purple.png');
const DailyStandup_Purple =  require('../images/newimages/daily_standup_purple.png');

/**
 * ## Styles
 */
import BackgroundImage from '../components/BackgroundImage'
import Colour from '../lib/colour'
var globalStyles = require('../components/Stylesheet');
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
const PADDING = 20;
const FONT_SIZE = 14;
const DEFAULT_BORDER_RADIUS = 0;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBarContainer: {
        width: width-10, 
        marginLeft: 5, 
        marginTop: 20, 
        backgroundColor: 'white', 
        borderTopWidth: 0,
    },
    searchInput: {
        backgroundColor: '#EEEEEE', 
        textAlign: 'center'
    },
    parentScrollView: {
        marginTop: 20, 
        marginLeft: 10, 
        width: width-20
    },
    categoryText: {
        fontFamily: 'Roboto-Medium', 
        fontSize: 14, 
        color: '#787A80',
        marginLeft: 10,
    },
    teammeetingScrollView: {
        width: width/2.4, 
        height: width/2.4, 
        shadowColor: '#000000', 
        shadowOpacity: 0.8, 
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 }, 
        marginLeft: 10
    },
    teammeetingImg: {
        width: width/2.4, 
        height: width/2.4-30, 
        resizeMode: 'cover'
    },
    teammeetingTxt: {
        fontFamily: 'Roboto-Medium', 
        fontSize: 12, 
        color: '#000000', 
        marginLeft: 10, 
        marginTop: 5
    },
    employeeScrollView: {
        width: width/2, 
        height: width/2.4, 
        shadowColor: '#000000', 
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 }, 
        marginLeft: 10
    },
    employeeImg: {
        width: width/2, 
        height: width/2.4-30, 
        resizeMode: 'cover'
    },
    textViewHeight: {
        height: 30,
    }
});

class Tools extends Component {

    /**
     * ## Tools class
     * Set the initial state
     */
    constructor(props) {
        super(props);
    }

    /**
     * ### componentWillReceiveProps
     */
    componentWillReceiveProps(nextProps) {

    }

    /**
     * ### componentDidMount
     */
    componentDidMount() {
    }

    /**
     * ### renderNavigationBar
     * Pass props to the React Native Router Flux NavBar
     */
    static renderNavigationBar(props) {
        return <NavBarWithProps {...props}/>;
    }

    /**
     * ### render
     * display the form wrapped with the header and button
     */
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="default"
                />
                <SearchBar
                    lightTheme
                    placeholder='Search Tools'
                    containerStyle={styles.searchBarContainer}
                    inputStyle={styles.searchInput} />
                <ScrollView contentContainerStyle={styles.parentScrollView} showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.categoryText}>
                            Team Meetings
                        </Text>
                        <ScrollView horizontal={true} contentContainerStyle={{marginTop: 10, height: width/2.4+10}} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity 
                                style={styles.teammeetingScrollView} 
                                onPress={() => {
                                    Actions.ToolsShow({
                                    });
                                }}
                            >
                                <Image source={TeamMeeting_Yellow} style={styles.teammeetingImg}/>
                                <View style={styles.textViewHeight}>
                                    <Text style={styles.teammeetingTxt}>
                                        Weekly Team Meeting
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.teammeetingScrollView}>
                                <Image source={DailyStandup_Yellow} style={styles.teammeetingImg}/>
                                <View style={styles.textViewHeight}>
                                    <Text style={styles.teammeetingTxt}>
                                        Daily Standup
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.teammeetingScrollView}>
                                <Image source={DailyCheckin_Yellow} style={styles.teammeetingImg}/>
                                <View style={styles.textViewHeight}>
                                    <Text style={styles.teammeetingTxt}>
                                        Daily Checkin
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={{marginTop: 30}}>
                        <Text style={styles.categoryText}>
                            Employee Management
                        </Text>
                        <ScrollView horizontal={true} contentContainerStyle={{marginTop: 10,  height: width/2.4+10}} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={styles.employeeScrollView}>
                                <Image source={TeamMeeting_Blue} style={styles.employeeImg}/>
                                <View style={styles.textViewHeight}>
                                    <Text style={styles.teammeetingTxt}>
                                        Weekly Team Meeting
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.employeeScrollView}>
                                <Image source={DailyStandup_Blue} style={styles.employeeImg}/>
                                <View style={styles.textViewHeight}>
                                    <Text style={styles.teammeetingTxt}>
                                        Daily Standup
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>    
                    <View style={{marginTop: 30}}>
                        <Text style={styles.categoryText}>
                            Presentations
                        </Text>
                        <ScrollView horizontal={true} contentContainerStyle={{marginTop: 10, height: width/2.4+10}} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={styles.teammeetingScrollView}>
                                <Image source={TeamMeeting_Purple} style={styles.teammeetingImg}/>
                                <View style={styles.textViewHeight}>
                                    <Text style={styles.teammeetingTxt}>
                                        Weekly Team Meeting
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.teammeetingScrollView}>
                                <Image source={DailyStandup_Purple} style={styles.teammeetingImg}/>
                                <View style={styles.textViewHeight}>
                                    <Text style={styles.teammeetingTxt}>
                                        Daily Standup
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.teammeetingScrollView}>
                                <Image source={TeamMeeting_Purple} style={styles.teammeetingImg}/>
                                <View style={styles.textViewHeight}>
                                    <Text style={styles.teammeetingTxt}>
                                        Daily Checkin
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>      
                    <View style={{height: 50}}>
                    </View>                              
                </ScrollView>
            </View>
        );
    }
}

reactMixin(Tools.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
