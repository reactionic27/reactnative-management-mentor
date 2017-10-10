/**
 * # Checklist.js
 *
 *
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
import {Map} from 'immutable';

/**
 * The necessary React components
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    Platform,
    InteractionManager,
    Animated
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

import NavBarWithProps from '../components/NavBarWithProps'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../components/scrollableTabView/TabBar'
import Chart from '../components/ChartMulti'

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
    }
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

/**
 * ## Styles
 */
var globalStyles = require('../components/Stylesheet');
import Colour from '../lib/colour'
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
const PADDING = 20;
const GREEN_COLOUR = '#65d39a';
const YELLOW_COLOUR = '#efc95f';
const RED_COLOUR = '#f67877';
const styles = StyleSheet.create({
    scrollView: {
        width: width,
        paddingTop: PADDING / 2,
        paddingBottom: PADDING / 2
    }
});

import Helpers from '../lib/helpers'
import HTMLParser from '../components/fields/HTMLParser'
const moment = require('moment');
const titleize = require('titleize');

class Checklist extends Component {

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

    _getState(props) {
        var stateObj = {}, that = this;

        ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].forEach(function (day, index) {
            ['productivity', 'enthusiasm'].forEach(function (measure) {
                ['none', 'red', 'yellow', 'green'].forEach(function (colour) {

                    var value, opacity = (titleize(day) === moment().format('ddd')) ? 1 : 0.5;

                    value = that._getVal(
                        Helpers.getRatingHistory(props),
                        measure,
                        colour,
                        moment().day(index).format("DD/MM/YYYY"),
                        Helpers.getMembers(props).toArray().length
                    );

                    stateObj[day + '' + titleize(measure) + '' + titleize(colour)] = new Animated.Value(value);
                    stateObj[day + '' + titleize(measure) + 'Opacity'] = new Animated.Value(opacity)
                });
            });
        });

        stateObj.checklist = props.toolData.checklist;
        var thisPrimaryColour = Helpers.getPrimaryColour(this.props);
        stateObj.greyedOutColour = Colour.get(thisPrimaryColour).drawerTextColour;

        return stateObj;
    }

    constructor(props) {
        super(props);

        this.state = {
            checklist: ''
        };
    }

    /**
     * ### componentDidMount
     */
    componentDidMount() {
        // console.log("componentDidMount() -> this.props", this.props);
        InteractionManager.runAfterInteractions(() => {
            this.setTimeout(() => {
                this.setState(this._getState(this.props));
            }, 0);
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
     * Setup some default presentations and render
     */
    render() {

        var thisPrimaryColour = Helpers.getPrimaryColour(this.props),
            thisSecondaryColour = Helpers.getSecondaryColour(this.props);

        let parsed = HTMLParser.parse(
            this.state.checklist,
            [
                globalStyles.serifLightText,
                globalStyles.bodyText,
                {
                    textAlign: 'center',
                    color: Colour.get(thisPrimaryColour).drawerTextColour
                }
            ],
            this.props,
            thisPrimaryColour,
            thisSecondaryColour,
            false
        );

        return (
            <View
                style={{flex: 1, paddingTop: NAVBAR_PADDING, backgroundColor: Colour.get(thisPrimaryColour).drawerHeaderTextColour}}>
                <StatusBar
                    barStyle="light-content"
                />
                <ScrollableTabView
                    renderTabBar={(props) => (<TabBar {...props}/>)}
                    tabBarPosition="bottom"
                    tabBarUnderlineColor={Colour.get(thisPrimaryColour).base}
                    tabBarBackgroundColor='white'
                    tabBarTextStyle={{color: Colour.get(thisPrimaryColour).drawerHeaderTextColour}}
                    style={{
                        paddingTop: 40
                    }}
                >
                    <ScrollView
                        tabLabel="Checklist"
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={350}
                        style={styles.scrollView}
                        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'none'}
                    >
                        <View
                            style={[globalStyles.container, {
                            justifyContent: 'flex-start',
                            paddingTop: PADDING,
                            backgroundColor: Colour.get(thisPrimaryColour).drawerHeaderTextColour
                        }]}>
                            {parsed}
                        </View>
                    </ScrollView>

                    <View tabLabel="This Week's Ratings">
                        <View style={{height: (height / 2) - NAVBAR_PADDING}}>
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
                                headingColour='white'
                                legendTexts={["sun", "mon", "tue", "wed", "thu", "fri", "sat"]}
                                legendColour='white'
                                panHandlers={null}
                            />
                        </View>

                        <View style={{height: (height / 2) - NAVBAR_PADDING}}>
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
                                headingColour='white'
                                legendTexts={["sun", "mon", "tue", "wed", "thu", "fri", "sat"]}
                                legendColour='white'
                                panHandlers={null}
                            />
                        </View>
                    </View>
                </ScrollableTabView>
            </View>
        );
    }
}

reactMixin(Checklist.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
