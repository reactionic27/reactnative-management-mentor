/**
 * # TeamHistorical.js
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
import * as appHistoryActions from '../reducers/appHistory/appHistoryActions';
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
    ScrollView,
    Dimensions,
    StatusBar,
    Platform,
    Animated,
    TouchableOpacity,
    PanResponder,
    InteractionManager
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

import SimpleGesture from 'react-native-simple-gesture';
import NavBarWithProps from '../components/NavBarWithProps'
import Chart from '../components/ChartMulti'

/**
 * ## Redux boilerplate
 */
const actions = [
    appHistoryActions,
    profileActions,
    globalActions
];

import {
    Actions,
} from 'react-native-router-flux';


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
    historicalDateContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: NAVBAR_PADDING
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

class TeamHistorical extends Component {

    _getVal(ratingHistory, measure, colour, day, members) {

        var m = ratingHistory.toJS()[measure];

        if (m) {

            if (colour === 'none') {

                var red = m['red'][day] || 0,
                    yellow = m['yellow'][day] || 0,
                    green = m['green'][day] || 0;

                return members - red - yellow - green;
            } else {

                return m[colour][day] || 0;
            }
        }
        return 0;
    }

    _getState(props, offset) {
        var stateObj = {}, that = this;

        ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].forEach(function (day, index) {
            ['productivity', 'enthusiasm'].forEach(function (measure) {
                ['none', 'red', 'yellow', 'green'].forEach(function (colour) {

                    var value, opacity = (titleize(day) === moment().format('ddd') && offset === 0) ? 1 : 0.5;

                    value = that._getVal(
                        Helpers.getRatingHistory(props),
                        measure,
                        colour,
                        moment().day(index + offset).format("DD/MM/YYYY"),
                        Helpers.getMembers(props).toArray().length
                    );

                    stateObj[day + '' + titleize(measure) + '' + titleize(colour)] = new Animated.Value(value);
                    stateObj[day + '' + titleize(measure) + 'Opacity'] = new Animated.Value(opacity)
                });
            });
        });

        stateObj.currentOffset = offset;
        stateObj.currentDate = (offset < 0) ? 'w/b' + " " + moment().day(0).add(offset, 'days').format('Do MMMM YYYY') : moment().format('Do MMMM YYYY');
        stateObj.canLeft = (offset > -21);
        stateObj.canRight = (offset < 0);
        // console.log(props.appHistory.toJS().visitedTeamHistoricalPage);
        stateObj.visited = props.appHistory.toJS().visitedTeamHistoricalPage;
        stateObj.greyedOutColour = 'white';

        return stateObj;
    }

    /**
     * ## TeamHistorical class
     * Set the initial state
     */
    constructor(props) {
        super(props);

        this.state = {
            currentOffset: 0,
            currentDate: moment().format('Do MMMM YYYY'),
            canLeft: false,
            canRight: false,
            greyedOutColour: 'white',
            visited: true
        };
    }

    /**
     * ### componentWillReceiveProps
     */
    componentWillReceiveProps(nextProps) {
        this.setState(this._getState(nextProps, 0));
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
                this.setState(this._getState(this.props, 0));

                // App History
                this.props.actions.getTeamHistoricalPageVisits(this.props.global.currentUser.id);
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
        const newState = this._getState(this.props, this.state.currentOffset + (7 * direction));

        this.setState({
            currentOffset: newState.currentOffset,
            currentDate: (newState.currentOffset < 0) ? 'w/b' + " " + moment().day(0).add(newState.currentOffset, 'days').format('Do MMMM YYYY') : moment().format('Do MMMM YYYY'),
            canLeft: (newState.currentOffset > -21),
            canRight: (newState.currentOffset < 0)
        }, () => {
            var keys = Object.keys(newState);

            keys = _.without(keys, 'currentOffset', 'currentDate', 'canLeft', 'canRight', 'greyedOutColour', 'visited');

            var baseDuration = 350;
            var duration = (velocity > 1) ? baseDuration / velocity : baseDuration;

            Animated.stagger(10, keys.map(key => {
                return timing(this.state[key], {toValue: newState[key]._value, duration: duration})
            })).start();
        });
    }

    _visitTeamHistoricalPage() {
        this.props.actions.visitTeamHistoricalPage(this.props.global.currentUser.id);
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
        var thisPrimaryColour = Helpers.getPrimaryColour(this.props),
            thisSecondaryColour = Helpers.getSecondaryColour(this.props);

        let infoBlock = this.state.visited ? <View/> : <View
            style={[globalStyles.infoBlock, {
                flex: 3,
                backgroundColor: Colour.get(thisSecondaryColour).buttonPrimary
            }]}
        >
            <GradientOverlay/>
            <Text
                style={[globalStyles.infoBlockText, {
                    color: 'white',
                    backgroundColor: 'transparent'
                }]}
            >
                The historical ratings by the team will appear here.
                {'\n\n'}
                Use this to see how your team's scores have trended in the past few weeks and make decisions on how you
                can improve the team's morale on a weekly basis.
            </Text>

            <View
                style={[globalStyles.infoBlockClose, {backgroundColor: 'transparent'}]}
            >
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={this._visitTeamHistoricalPage.bind(this)}
                >
                    <Icon style={{color: 'white'}} name='close' size={18}/>
                </TouchableOpacity>
            </View>

        </View>;

        return (
            <View style={{
                flex: 1
            }}>
                <GradientOverlay/>
                <ScrollView
                    style={[styles.scrollView, {backgroundColor: 'transparent'}]}
                    contentContainerStyle={{
                        paddingBottom: Platform.OS === 'ios' ? PADDING : 3 * PADDING,
                        height: this.state.visited ? height : height + 200,
                        backgroundColor: 'transparent'
                    }}
                    keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'none'}
                >
                    <StatusBar
                        barStyle={this.props.firstTime ? "default" : "light-content"}
                    />

                    <View
                        style={[
                        styles.historicalDateContainer,
                        {
                            paddingTop: 20,
                            paddingBottom: 20,
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
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => (this._onClickArrow(-1, 1))}
                            style={[styles.historicalDateLeft, {backgroundColor: 'transparent'}]}
                        >
                            <Icon name='fast-rewind' size={20}
                                  color={this.state.canLeft ? Colour.get(thisPrimaryColour).drawerTextColour : Colour.get(thisPrimaryColour).base}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => (Actions.TaskLog())}
                            style={[styles.historicalDate, {backgroundColor: 'transparent'}]}>
                            <Text style={{textAlign: 'center'}}>
                                <Text
                                    style={[globalStyles.serifBoldText, globalStyles.captionTitle, {marginBottom: PADDING, color: Colour.get(thisPrimaryColour).drawerTextColour}]}>
                                    {this.state.currentDate}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => (this._onClickArrow(1, 1))}
                            style={[styles.historicalDateRight, {backgroundColor: 'transparent'}]}
                        >
                            <Icon name='fast-forward' size={20}
                                  color={this.state.canRight ? Colour.get(thisPrimaryColour).drawerTextColour : Colour.get(thisPrimaryColour).base}/>
                        </TouchableOpacity>
                    </View>

                    {infoBlock}

                    <Chart
                        state={this.state}
                        columns={["sun", "mon", "tue", "wed", "thu", "fri", "sat"]}
                        measure="Productivity"
                        subMeasures={[
                        {
                            subMeasure: 'Green',
                            colour: GREEN_COLOUR
                        },
                        {
                            subMeasure: 'Yellow',
                            colour: YELLOW_COLOUR
                        },
                        {
                            subMeasure: 'Red',
                            colour: RED_COLOUR
                        }
                    ]}
                        headingText="Productivity"
                        headingColour={DARK_GREY_COLOUR}
                        legendTexts={["sun", "mon", "tue", "wed", "thu", "fri", "sat"]}
                        legendColour={DARK_GREY_COLOUR}
                        panHandlers={this._panResponder.panHandlers}
                    />

                    <Chart
                        state={this.state}
                        columns={["sun", "mon", "tue", "wed", "thu", "fri", "sat"]}
                        measure="Enthusiasm"
                        subMeasures={[
                        {
                            subMeasure: 'Green',
                            colour: GREEN_COLOUR
                        },
                        {
                            subMeasure: 'Yellow',
                            colour: YELLOW_COLOUR
                        },
                        {
                            subMeasure: 'Red',
                            colour: RED_COLOUR
                        }
                    ]}
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

reactMixin(TeamHistorical.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(TeamHistorical);
