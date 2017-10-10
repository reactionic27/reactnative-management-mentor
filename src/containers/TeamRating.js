/**
 * # TeamRating.js
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
    ListView,
    Text,
    Image,
    View,
    Platform,
    StatusBar,
    TouchableOpacity
}
    from 'react-native';

import NavBarWithProps from '../components/NavBarWithProps'

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
    profileActions,
    globalActions
];

const DEFAULT_AVATAR = 'data:image/png;base64,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';

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

/**
 * ## Styles
 */
import GradientOverlay from '../components/BackgroundImage'
import Colour from '../lib/colour'
var globalStyles = require('../components/Stylesheet');
const BORDER_COLOUR = 'hsl(210, 13%, 91%)';
const GREEN_COLOUR = '#65d39a';
const YELLOW_COLOUR = '#efc95f';
const RED_COLOUR = '#f67877';
const PADDING = 20;
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
const styles = StyleSheet.create({
    listViewContainer: {
        flex: 1,
        marginTop: NAVBAR_PADDING
    },
    listViewAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center'
    },
    listViewRating: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center'
    }
});

import Helpers from '../lib/helpers'

const RATING_TIME_OFFSET_DAYS = -1;
const RATING_TIME_OFFSET_HOURS = 1;
const RATING_TIME_OFFSET_MINUTES = 0;

class TeamRating extends Component {

    /**
     * ## TeamRating class
     * Set the initial state
     */
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });

        this.state = {
            dataSource: ds.cloneWithRows(Helpers.getMembers(props).toArray()),
            enthusiasmMax: Helpers.getBounds('enthusiasmMax', 100, props),
            enthusiasmMin: Helpers.getBounds('enthusiasmMin', 0, props),
            enthusiasmFirstTertileGreatestUpperBound: Helpers.getBounds('enthusiasmFirstTertileGreatestUpperBound', 30, props),
            enthusiasmSecondTertileGreatestUpperBound: Helpers.getBounds('enthusiasmSecondTertileGreatestUpperBound', 70, props),
            productivityMax: Helpers.getBounds('productivityMax', 100, props),
            productivityMin: Helpers.getBounds('productivityMin', 0, props),
            productivityFirstTertileGreatestUpperBound: Helpers.getBounds('productivityFirstTertileGreatestUpperBound', 30, props),
            productivitySecondTertileGreatestUpperBound: Helpers.getBounds('productivitySecondTertileGreatestUpperBound', 70, props)
        };
    }

    /**
     * ### componentWillReceiveProps
     */
    componentWillReceiveProps(nextProps) {

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });

        this.setState({
            dataSource: ds.cloneWithRows(Helpers.getMembers(nextProps).toArray()),
            enthusiasmMax: Helpers.getBounds('enthusiasmMax', 100, nextProps),
            enthusiasmMin: Helpers.getBounds('enthusiasmMin', 0, nextProps),
            enthusiasmFirstTertileGreatestUpperBound: Helpers.getBounds('enthusiasmFirstTertileGreatestUpperBound', 30, nextProps),
            enthusiasmSecondTertileGreatestUpperBound: Helpers.getBounds('enthusiasmSecondTertileGreatestUpperBound', 70, nextProps),
            productivityMax: Helpers.getBounds('productivityMax', 100, nextProps),
            productivityMin: Helpers.getBounds('productivityMin', 0, nextProps),
            productivityFirstTertileGreatestUpperBound: Helpers.getBounds('productivityFirstTertileGreatestUpperBound', 30, nextProps),
            productivitySecondTertileGreatestUpperBound: Helpers.getBounds('productivitySecondTertileGreatestUpperBound', 70, nextProps)
        });
    }

    _renderHeader(props) {
        var thisPrimaryColour = Helpers.getPrimaryColour(props),
            thisSecondaryColour = Helpers.getSecondaryColour(props);
        return <View
            style={[
                globalStyles.column,
                {
                    justifyContent: 'center',
                    paddingTop: 20,
                    paddingBottom: 20,
                    backgroundColor: Colour.get(thisPrimaryColour).drawerHeaderTextColour
                }
            ]}>
            <GradientOverlay/>
            <View style={{marginBottom: 10, backgroundColor: 'transparent'}}>
                <Text style={{textAlign: 'center'}}>
                    <Text style={globalStyles.sansSerifLightText}>
                        <Text
                            style={[globalStyles.sansSerifLightText, globalStyles.captionText, {color: Colour.get(thisPrimaryColour).drawerTextColour}]}>
                            How the team scored today
                        </Text>
                    </Text>
                </Text>
            </View>
            <View style={{backgroundColor: 'transparent'}}>
                <Text style={{textAlign: 'center'}}>
                    <Text
                        style={[globalStyles.serifBoldText, globalStyles.captionTitle, {marginBottom: PADDING, color: Colour.get(thisPrimaryColour).drawerTextColour}]}>
                        {moment().format('Do MMMM YYYY')}
                    </Text>
                </Text>
            </View>
        </View>;
    }

    _renderSectionHeader() {
        return <View style={[globalStyles.listViewSection, {
                            shadowOpacity: 0.2,
                            shadowRadius: PADDING / 16,
                            shadowOffset: {
                                height: PADDING / 8,
                                width: 0
                            },
                            borderBottomWidth: 0,
                            elevation: 5
        }]}>
            <View style={{flex: 3, alignItems: 'center'}}>
                <Text style={[globalStyles.sansSerifRegularText, globalStyles.baseTextColour]}>
                    <Text style={globalStyles.listViewSectionText}>
                        Team member
                    </Text>
                </Text>
            </View>
            <View style={{flex: 3, alignItems: 'center'}}>
                <Text style={[globalStyles.sansSerifRegularText, globalStyles.baseTextColour]}>
                    <Text style={globalStyles.listViewSectionText}>
                        Productivity
                    </Text>
                </Text>
            </View>
            <View style={{flex: 3, alignItems: 'center'}}>
                <Text style={[globalStyles.sansSerifRegularText, globalStyles.baseTextColour]}>
                    <Text style={globalStyles.listViewSectionText}>
                        Enthusiasm
                    </Text>
                </Text>
            </View>
        </View>;
    }

    _renderRow(rowData, state) {
        // console.log(rowData.toJS());
        /**
         * acceptTerms: null,
         * age: "32",
         * avatar: "data:image/png;base64,iVBO..."
         * createdAt: "2016-04-01T11:28:02.857Z",
         * email: "user@example.com",
         * firstName: "Matthew",
         * gender: "Male",
         * id: 1,
         * isActive: true,
         * lastName: "Ager",
         * nationality: "United Kingdom",
         * provider: "email",
         * role: "admin",
         * uid: "user@example.com",
         * updatedAt: "2016-04-02T09:43:45.763Z"
         * iLeader: true
         * member: false
         * ratings: [
         * * {
         * * * id: 1,
         * * * userId: 1,
         * * * scoreDatetime: "2016-04-02T09:43:45.763Z",
         * * * productivity: "100",
         * * * enthusiasm: "100",
         * * },
         * * {},
         * * ...
         * ]
         */

        var ratings = rowData.toJS().ratings;
        var latestRating = ratings[ratings.length - 1];

        var startTime = moment()
                .add((new Date()).getHours() < 1 ? RATING_TIME_OFFSET_DAYS : RATING_TIME_OFFSET_DAYS + 1, 'days')
                .hour(RATING_TIME_OFFSET_HOURS)
                .minute(RATING_TIME_OFFSET_MINUTES)
                .second(0),
            endTime = moment()
                .add((new Date()).getHours() < 1 ? RATING_TIME_OFFSET_DAYS + 1 : RATING_TIME_OFFSET_DAYS + 2, 'days')
                .hour(RATING_TIME_OFFSET_HOURS)
                .minute(RATING_TIME_OFFSET_MINUTES)
                .second(0),
            ratedToday = ratings.length > 0 ? moment(latestRating.scoreDatetime).isSameOrAfter(startTime) && moment(latestRating.scoreDatetime).isSameOrBefore(endTime) : false;

        let productivityColor = GREEN_COLOUR;
        let enthusiasmColor = GREEN_COLOUR;
        if (ratedToday) {
            if (latestRating.productivity < state.productivitySecondTertileGreatestUpperBound) productivityColor = YELLOW_COLOUR;
            if (latestRating.productivity < state.productivityFirstTertileGreatestUpperBound) productivityColor = RED_COLOUR;

            if (latestRating.enthusiasm < state.enthusiasmSecondTertileGreatestUpperBound) enthusiasmColor = YELLOW_COLOUR;
            if (latestRating.enthusiasm < state.enthusiasmFirstTertileGreatestUpperBound) enthusiasmColor = RED_COLOUR;
        } else {
            productivityColor = BORDER_COLOUR;
            enthusiasmColor = BORDER_COLOUR;
        }

        var avatar = rowData.toJS().avatar ? rowData.toJS().avatar : DEFAULT_AVATAR;

        return <View style={globalStyles.listViewRow}>
            <View style={{flex: 3, alignItems: 'center'}}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => {
                        Actions.TeamRatingProfilesShow({
                            member: rowData.toJS()
                        })
                    }}
                >
                    <Image
                        source={{uri: avatar}}
                        resizeMode="cover"
                        style={[styles.listViewAvatar]}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 3, alignItems: 'center'}}>
                <View
                    style={[styles.listViewRating, {backgroundColor: productivityColor}]}/>
            </View>
            <View style={{flex: 3, alignItems: 'center'}}>
                <View
                    style={[styles.listViewRating, {backgroundColor: enthusiasmColor}]}/>
            </View>
        </View>
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
        return (
            <View style={styles.listViewContainer}>
                <StatusBar
                    barStyle={this.props.firstTime ? "default" : "light-content"}
                />
                <GradientOverlay/>
                <ListView
                    style={globalStyles.listViewList}
                    dataSource={this.state.dataSource}
                    renderHeader={() => (this._renderHeader(this.props))}
                    renderSectionHeader={this._renderSectionHeader}
                    renderRow={(rowData) => (this._renderRow(rowData, this.state))}
                />
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TeamRating);
