/**
 * # MemberProfile.js
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
import * as profileActions from '../reducers/profile/profileActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Immutable
 */
import Immutable from 'immutable';

/**
 * The necessary React components
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    StatusBar,
    Animated,
    TouchableOpacity,
    PanResponder,
    ScrollView,
    Platform,
    Dimensions,
    InteractionManager
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

import SimpleGesture from 'react-native-simple-gesture';
import NavBarWithProps from '../components/NavBarWithProps'
import Chart from '../components/Chart'

/**
 * ## Redux boilerplate
 */
const actions = [
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

const moment = require('moment');
const _ = require('underscore');
const titleize = require('titleize');

/**
 * ## Styles
 */
import GradientOverlay from '../components/BackgroundImage'
import Colour from '../lib/colour'
import Icon from 'react-native-vector-icons/MaterialIcons';
var globalStyles = require('../components/Stylesheet');
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const GREEN_COLOUR = '#65d39a';
const YELLOW_COLOUR = '#efc95f';
const RED_COLOUR = '#f67877';
const PADDING = 20;
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
const styles = StyleSheet.create({
    scrollView: {
        paddingTop: NAVBAR_PADDING
    },
    historicalDateContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: PADDING
    },
    historicalDateLeft: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    historicalDateRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    historicalDate: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

import Helpers from '../lib/helpers'

const DEFAULT_AVATAR = 'data:image/png;base64,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';

class MemberProfile extends Component {

    _getState(props, offset) {
        var stateObj = {},
            p,
            e,
            day,
            ratings = props.member.ratings,
            sunday = moment().day(0 + offset).startOf('day'),
            saturday = moment().day(6 + offset).endOf('day'),
            thisWeeksRatings = ratings.filter(function (rating) {
                return moment(rating.scoreDatetime).isSameOrAfter(sunday) && moment(rating.scoreDatetime).isSameOrBefore(saturday);
            });

        ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].forEach(function (day) {
            ['productivity', 'enthusiasm'].forEach(function (measure) {
                stateObj[titleize(day) + '' + titleize(measure)] = new Animated.Value(0);
                stateObj[titleize(day) + '' + titleize(measure) + 'None'] = new Animated.Value(100);
            });
        });

        thisWeeksRatings.forEach(function (rating) {
            p = parseInt(rating.productivity);
            e = parseInt(rating.enthusiasm);
            day = moment(rating.scoreDatetime).format('ddd');
            stateObj[day + '' + titleize("productivity")] = new Animated.Value(p);
            stateObj[day + '' + titleize("enthusiasm")] = new Animated.Value(e);
            stateObj[day + '' + titleize("productivity") + 'None'] = new Animated.Value(100 - p);
            stateObj[day + '' + titleize("enthusiasm") + 'None'] = new Animated.Value(100 - e);
        });

        stateObj.currentOffset = offset;
        stateObj.currentDate = (offset < 0) ? 'w/b' + " " + moment().day(0).add(offset, 'days').format('Do MMMM YYYY') : moment().format('Do MMMM YYYY');
        stateObj.canLeft = (offset > -21);
        stateObj.canRight = (offset < 0);
        return stateObj;
    }

    /**
     * ## MemberProfile class
     * Set the initial state
     */
    constructor(props) {
        super(props);

        this.state = {
            currentOffset: 0,
            currentDate: moment().format('Do MMMM YYYY'),
            canLeft: false,
            canRight: false
        };
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
            onPanResponderGrant: this._handlePanResponderGrant.bind(this),
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderEnd.bind(this),
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
            onPanResponderTerminationRequest: () => false,
            onStartShouldSetPanResponderCapture: () => true
        });
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setTimeout(() => {
                this.setState(this._getState(this.props, 0, true));
            }, 350);
        });
    }

    _handleStartShouldSetPanResponder(e:Object, gestureState:Object) {
        // Should we become active when the user presses down on the circle?
        // console.log('_handleStartShouldSetPanResponder(e:Object, gestureState:Object) -> e, gestureState', e, gestureState)
        return true;
    }

    _handleMoveShouldSetPanResponder(e:Object, gestureState:Object) {
        // Should we become active when the user moves a touch over the circle?
        // console.log('_handleMoveShouldSetPanResponder(e:Object, gestureState:Object) -> e, gestureState', e, gestureState)
        let simpleGestureState = new SimpleGesture(e, gestureState);
        return simpleGestureState.isHorizontal();
    }

    _handlePanResponderGrant(e:Object, gestureState:Object) {
        // console.log('_handlePanResponderGrant(e:Object, gestureState:Object) -> e, gestureState', e, gestureState)
    }

    _handlePanResponderMove(e:Object, gestureState:Object) {
        // console.log('_handlePanResponderMove(e:Object, gestureState:Object) -> e, gestureState', e, gestureState)
    }

    _handlePanResponderEnd(e:Object, gestureState:Object) {
        // console.log('_handlePanResponderEnd(e:Object, gestureState:Object) -> e, gestureState', e, gestureState)
        let simpleGestureState = new SimpleGesture(e, gestureState);
        var sign = gestureState.dx >= 0 ? 1 : -1,
            velocity = Math.abs(gestureState.vx);
        if (simpleGestureState.isHorizontal()) this._onClickArrow(-1 * sign, velocity)
    }

    _onClickArrow(direction, velocity) {
        if (direction < 0 && !this.state.canLeft || direction > 0 && !this.state.canRight) return false;

        const timing = Animated.timing;
        const newState = this._getState(this.props, this.state.currentOffset + (7 * direction), false);

        this.setState({
            currentOffset: newState.currentOffset,
            currentDate: (newState.currentOffset < 0) ? 'w/b' + " " + moment().day(0).add(newState.currentOffset, 'days').format('Do MMMM YYYY') : moment().format('Do MMMM YYYY'),
            canLeft: (newState.currentOffset > -21),
            canRight: (newState.currentOffset < 0)
        }, () => {
            var keys = Object.keys(newState);

            keys = _.without(keys, 'currentOffset', 'currentDate', 'canLeft', 'canRight');

            var baseDuration = 150;
            var duration = (velocity > 1) ? baseDuration / velocity : baseDuration;

            Animated.stagger(20, keys.map(key => {
                return timing(this.state[key], {toValue: newState[key]._value, duration: duration})
            })).start();
        });
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
        var thisPrimaryColour = Helpers.getPrimaryColour(this.props);
        var avatar = this.props.member.avatar ? this.props.member.avatar : DEFAULT_AVATAR;
        return (
            <View style={{
                flex: 1
            }}>
                <GradientOverlay/>
                <ScrollView
                    style={[styles.scrollView, {backgroundColor: 'transparent'}]}
                    contentContainerStyle={{
                        paddingBottom: Platform.OS === 'ios' ? PADDING : 3 * PADDING,
                        height: height * 1.2,
                        backgroundColor: 'transparent'
                    }}
                    keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'none'}
                >
                    <StatusBar
                        barStyle={this.props.firstTime ? "default" : "light-content"}
                    />
                    <View
                        style={[
                        globalStyles.avatarWithCaption,
                        {
                            paddingTop: 20,
                            backgroundColor: Colour.get(thisPrimaryColour).drawerHeaderTextColour,
                            shadowOpacity: 0.4,
                            shadowRadius: PADDING / 16,
                            shadowOffset: {
                                height: PADDING / 8,
                                width: 0
                            },
                            borderBottomWidth: 0,
                            elevation: 5
                        }
                    ]}>
                        <GradientOverlay/>
                        <Image
                            source={{uri: avatar}}
                            resizeMode="cover"
                            style={[globalStyles.avatar, {alignSelf: 'center'}]}/>

                        <Text
                            style={[globalStyles.serifBoldText, globalStyles.captionTitle, {color: Colour.get(thisPrimaryColour).drawerTextColour, backgroundColor: 'transparent'}]}>
                            {this.props.member.firstName + " " + this.props.member.lastName}
                        </Text>

                        <Text
                            style={[globalStyles.sansSerifLightText, globalStyles.bodyText, globalStyles.captionText, {color: Colour.get(thisPrimaryColour).drawerTextColour, backgroundColor: 'transparent'}]}>
                            {this.props.member.email}
                        </Text>

                        <Text
                            style={[globalStyles.sansSerifLightText, globalStyles.bodyText, {marginBottom: PADDING / 4}, globalStyles.captionText, {color: Colour.get(thisPrimaryColour).drawerTextColour, backgroundColor: 'transparent'}]}>
                            {this.props.member.nationality}
                        </Text>

                        <Text
                            style={[globalStyles.sansSerifLightText, globalStyles.bodyText, globalStyles.captionText, {marginBottom: 0, color: Colour.get(thisPrimaryColour).drawerTextColour, backgroundColor: 'transparent'}]}>
                            {this.props.member.age + " years old"}
                        </Text>
                    </View>

                    <View style={styles.historicalDateContainer}>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => (this._onClickArrow(-1, 1))}
                            style={styles.historicalDateLeft}
                        >
                            <Icon name='fast-rewind' size={20}
                                  color={this.state.canLeft ? DARK_GREY_COLOUR : 'white'}/>
                        </TouchableOpacity>
                        <View style={styles.historicalDate}>
                            <Text style={{textAlign: 'center'}}>
                                <Text
                                    style={[globalStyles.serifBoldText, globalStyles.captionTitle, {color: DARK_GREY_COLOUR}]}>
                                    {this.state.currentDate}
                                </Text>
                            </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => (this._onClickArrow(1, 1))}
                            style={styles.historicalDateRight}
                        >
                            <Icon name='fast-forward' size={20}
                                  color={this.state.canRight ? DARK_GREY_COLOUR : 'white'}/>
                        </TouchableOpacity>
                    </View>

                    <Chart
                        state={this.state}
                        columns={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                        measure="Productivity"
                        colourInterpolation={{
                        inputRange: [
                           0,
                           50,
                           100
                        ],
                        outputRange: [
                           RED_COLOUR,
                           YELLOW_COLOUR,
                           GREEN_COLOUR
                        ]
                    }}
                        headingText="Productivity"
                        headingColour={DARK_GREY_COLOUR}
                        legendTexts={["sun", "mon", "tue", "wed", "thu", "fri", "sat"]}
                        legendColour={DARK_GREY_COLOUR}
                        panHandlers={this._panResponder.panHandlers}
                    />

                    <Chart
                        state={this.state}
                        columns={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                        measure="Enthusiasm"
                        colourInterpolation={{
                        inputRange: [
                           0,
                           50,
                           100
                        ],
                        outputRange: [
                           RED_COLOUR,
                           YELLOW_COLOUR,
                           GREEN_COLOUR
                        ]
                    }}
                        headingText="Enthusiasm"
                        headingColour={DARK_GREY_COLOUR}
                        legendTexts={["sun", "mon", "tue", "wed", "thu", "fri", "sat"]}
                        legendColour={DARK_GREY_COLOUR}
                        panHandlers={this._panResponder.panHandlers}
                    />
                </ScrollView>
            </View>
        );
    }
}

reactMixin(MemberProfile.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(MemberProfile);
