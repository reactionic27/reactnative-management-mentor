/**
 * # TeamAvatarList.js
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
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    ListView,
    Text,
    TouchableOpacity,
    Image,
    View,
    Dimensions,
    Platform
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

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
const CLOSE_IMAGE = 'data:image/png;base64,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';
const BORDER_COLOUR = 'hsl(210, 13%, 91%)';
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const GREEN_COLOUR = '#65d39a';
const YELLOW_COLOUR = '#efc95f';
const RED_COLOUR = '#f67877';
const FONT_SIZE = 14;
const PADDING = 20;
const AVATAR_SIZE = 60;
const BORDER_WIDTH = 3;
const styles = StyleSheet.create({
    listViewSection: {
        width: width,
        height: 46,
        paddingRight: PADDING,
        paddingLeft: PADDING,
        paddingTop: PADDING / 2,
        paddingBottom: PADDING / 2,
        marginBottom: PADDING / 2,
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: BORDER_COLOUR
    },
    listViewAvatarBorder: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderWidth: BORDER_WIDTH,
        marginTop: PADDING / 4,
        marginBottom: PADDING / 4,
        marginLeft: PADDING,
        marginRight: PADDING,
        alignSelf: 'center',
        transform: [{rotate: '-45deg'}]
    },
    listViewAvatar: {
        width: AVATAR_SIZE - (BORDER_WIDTH * 2),
        height: AVATAR_SIZE - (BORDER_WIDTH * 2),
        borderRadius: (AVATAR_SIZE - (BORDER_WIDTH * 2)) / 2,
        alignSelf: 'center',
        transform: [{rotate: '45deg'}]
    },
    listViewCloseBorder: {
        width: AVATAR_SIZE / 2,
        height: AVATAR_SIZE / 2,
        borderRadius: AVATAR_SIZE / 4,
        borderWidth: BORDER_WIDTH,
        marginTop: PADDING / 4,
        marginBottom: PADDING / 4,
        marginLeft: PADDING,
        marginRight: PADDING,
        alignSelf: 'center',
        transform: [{rotate: '-45deg'}]
    },
    listViewClose: {
        width: (AVATAR_SIZE / 2) - (BORDER_WIDTH * 2),
        height: (AVATAR_SIZE / 2) - (BORDER_WIDTH * 2),
        borderRadius: ((AVATAR_SIZE / 2) - (BORDER_WIDTH * 2)) / 2,
        alignSelf: 'center',
        transform: [{rotate: '45deg'}]
    },
    listViewAvatarName: {
        width: AVATAR_SIZE + (PADDING * 2),
        marginLeft: (PADDING / 2) - 10,
        marginRight: (PADDING / 2) - 10,
        paddingBottom: PADDING / 2,
        backgroundColor: 'transparent',
        alignItems: 'center'
    }
});

import Helpers from '../lib/helpers'

class TeamAvatarList extends Component {

    static propTypes = {
        showSectionHeader: PropTypes.bool,
        renderSectionHeader: PropTypes.func,
        sectionHeaderText: PropTypes.string,
        showRatings: PropTypes.bool,
        defaultOnPress: PropTypes.bool,
        textStyle: PropTypes.object,
        borderStyle: PropTypes.object,
        listViewBackgroundColour: PropTypes.string,
        listViewContentContainerBackgroundColour: PropTypes.string,
        renderCancelButton: PropTypes.bool,
        onPressCancelButton: PropTypes.func,
        greyedAvatars: PropTypes.array,
        includeSelf: PropTypes.bool
    };

    /**
     * ## TeamAvatarList class
     * Set the initial state
     */
    constructor(props) {
        super(props);

        if (this.props.showRatings) {
            this.state = {
                enthusiasmMax: Helpers.getBounds('enthusiasmMax', 100, props),
                enthusiasmMin: Helpers.getBounds('enthusiasmMin', 0, props),
                enthusiasmFirstTertileGreatestUpperBound: Helpers.getBounds('enthusiasmFirstTertileGreatestUpperBound', 30, props),
                enthusiasmSecondTertileGreatestUpperBound: Helpers.getBounds('enthusiasmSecondTertileGreatestUpperBound', 70, props),
                productivityMax: Helpers.getBounds('productivityMax', 100, props),
                productivityMin: Helpers.getBounds('productivityMin', 0, props),
                productivityFirstTertileGreatestUpperBound: Helpers.getBounds('productivityFirstTertileGreatestUpperBound', 30, props),
                productivitySecondTertileGreatestUpperBound: Helpers.getBounds('productivitySecondTertileGreatestUpperBound', 70, props)
            };
        } else {
            this.state = {}
        }

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });

        let members = Helpers.getMembers(props).toArray();
        if (this.props.includeSelf) members.push(Immutable.Map(props.global.currentUser));

        this.state.dataSource = ds.cloneWithRows(members);
        this.state.members = members;
        this.state.team = Helpers.getCurrentTeam(props);
    }

    /**
     * ### componentWillReceiveProps
     */
    componentWillReceiveProps(nextProps) {

        if (this.props.showRatings) {
            this.setState({
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
    }

    _renderSectionHeader() {
        if (!this.props.showSectionHeader) return false;

        if (this.props.renderSectionHeader && typeof this.props.renderSectionHeader === "function") {
            return this.props.sectionHeader();
        }

        var thisPrimaryColour = Helpers.getPrimaryColour(this.props);
        return <View
            style={[
                styles.listViewSection,
                {
                    backgroundColor: Colour.get(thisPrimaryColour).drawerHeaderTextColour,
                    marginBottom: 3 * PADDING / 2,
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
            <Text style={{textAlign: 'center', backgroundColor: 'transparent'}}>
                <Text
                    style={[globalStyles.serifBoldText, globalStyles.captionTitle, {color: Colour.get(thisPrimaryColour).drawerTextColour}]}>
                    {this.props.sectionHeaderText ? this.props.sectionHeaderText : this.state.team.name}
                </Text>
            </Text>
        </View>;
    }

    _onPress(member) {
        if (this.props.onPress) return this.props.onPress(member);

        if (this.props.defaultOnPress) return Actions.TeamProfilesShow({
            member: member
        });

        return false;
    }

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
    _renderRow(rowData, state) {
        var avatar = rowData.toJS().avatar ? rowData.toJS().avatar : DEFAULT_AVATAR;
        var thisPrimaryColour = Helpers.getPrimaryColour(this.props),
            greyed = this.props.greyedAvatars &&
                this.props.greyedAvatars.length &&
                this.props.greyedAvatars.indexOf(rowData.toJS().id) > -1;
        return <View style={{height: 2 * AVATAR_SIZE}}>
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                    if (greyed) return false;
                    this._onPress(rowData.toJS())
                }}
            >
                <View
                    style={[styles.listViewAvatarBorder, {borderColor: 'transparent'}, this.props.borderStyle, {opacity: greyed ? 0.5 : 1}]}>
                    <Image
                        source={{uri: avatar}}
                        resizeMode="cover"
                        style={styles.listViewAvatar}/>
                </View>
                <View style={[styles.listViewAvatarName]}>

                    <Text
                        style={[globalStyles.sansSerifRegularText, {
                                color: Colour.get(thisPrimaryColour).base,
                                textAlign: 'center',
                                fontSize: FONT_SIZE - 3
                            }, this.props.textStyle]}>
                        {rowData.toJS().firstName}
                        {'\n'}
                        {rowData.toJS().lastName}
                    </Text>

                </View>
            </TouchableOpacity>
        </View>
    }

    _renderRowWithRatings(rowData, state) {
        var thisPrimaryColour = Helpers.getPrimaryColour(this.props);
        var ratings = rowData.toJS().ratings,
            monday = moment().isoWeekday(1).day(1).startOf('day');
        var latestRatings = ratings.filter(function (rating) {
            return moment(rating.scoreDatetime).isSameOrAfter(monday);
        });

        let productivityColour = GREEN_COLOUR;
        let enthusiasmColour = GREEN_COLOUR;
        let averageColour = GREEN_COLOUR;

        if (latestRatings.length) {
            var productivitySum = 0;
            var enthusiasmSum = 0;
            for (var i = 0, l = latestRatings.length; i < l; i++) {
                productivitySum += parseInt(latestRatings[i].productivity, 10);
                enthusiasmSum += parseInt(latestRatings[i].enthusiasm, 10);
            }

            var averageProductivityScore = productivitySum / latestRatings.length,
                averageEnthusiasmScore = enthusiasmSum / latestRatings.length,
                averageScore = (averageProductivityScore + averageEnthusiasmScore) / 2,
                averageProductivityFirst = (
                        parseInt(state.productivityFirstTertileGreatestUpperBound, 10)
                        + parseInt(state.productivityFirstTertileGreatestUpperBound, 10)
                    ) / 2,
                averageProductivitySecond = (
                        parseInt(state.productivitySecondTertileGreatestUpperBound, 10)
                        + parseInt(state.productivitySecondTertileGreatestUpperBound, 10)
                    ) / 2,
                averageEnthusiasmFirst = (
                        parseInt(state.enthusiasmFirstTertileGreatestUpperBound, 10)
                        + parseInt(state.enthusiasmFirstTertileGreatestUpperBound, 10)
                    ) / 2,
                averageEnthusiasmSecond = (
                        parseInt(state.enthusiasmSecondTertileGreatestUpperBound, 10)
                        + parseInt(state.enthusiasmSecondTertileGreatestUpperBound, 10)
                    ) / 2,
                averageFirst = (averageProductivityFirst + averageEnthusiasmFirst) / 2,
                averageSecond = (averageProductivitySecond + averageEnthusiasmSecond) / 2;

            // console.log(averageScore);

            if (averageProductivityScore < averageProductivitySecond) productivityColour = YELLOW_COLOUR;
            if (averageEnthusiasmScore < averageEnthusiasmSecond) enthusiasmColour = YELLOW_COLOUR;
            if (averageScore < averageSecond) averageColour = YELLOW_COLOUR;
            if (averageProductivityScore < averageProductivityFirst) productivityColour = RED_COLOUR;
            if (averageEnthusiasmScore < averageEnthusiasmFirst) enthusiasmColour = RED_COLOUR;
            if (averageScore < averageFirst) averageColour = RED_COLOUR;
        } else {
            productivityColour = BORDER_COLOUR;
            enthusiasmColour = BORDER_COLOUR;
            averageColour = BORDER_COLOUR;
        }

        let borderStyle = {};
        if (Platform.OS === 'ios') {
            borderStyle = {
                borderTopColor: productivityColour,
                borderLeftColor: productivityColour,
                borderBottomColor: enthusiasmColour,
                borderRightColor: enthusiasmColour
            }
        } else {
            borderStyle = {
                borderColor: averageColour
            }
        }

        var avatar = rowData.toJS().avatar ? rowData.toJS().avatar : DEFAULT_AVATAR;

        return <View style={{height: 2 * AVATAR_SIZE}}>
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {this._onPress(rowData.toJS())}}
            >
                <View
                    style={[styles.listViewAvatarBorder, borderStyle, this.props.borderStyle]}>
                    <Image
                        source={{uri: avatar}}
                        resizeMode="cover"
                        style={styles.listViewAvatar}/>
                </View>
                <View style={[styles.listViewAvatarName]}>

                    <Text
                        style={[globalStyles.sansSerifRegularText, {
                                color: DARK_GREY_COLOUR,
                                textAlign: 'center',
                                fontSize: FONT_SIZE - 3
                            }, this.props.textStyle]}>
                        {rowData.toJS().firstName}
                        {'\n'}
                        {rowData.toJS().lastName}
                    </Text>

                </View>
            </TouchableOpacity>
        </View>
    }

    /**
     * ### render
     * display the form wrapped with the header and button
     */
    render() {
        let cancelButton = <View/>;
        if (this.props.renderCancelButton && this.props.onPressCancelButton) {
            cancelButton = <View style={{marginBottom: PADDING}}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={this.props.onPressCancelButton}>
                    <View style={[styles.listViewCloseBorder, {borderColor: 'transparent'}, this.props.borderStyle]}>
                        <Image
                            source={{uri: CLOSE_IMAGE}}
                            resizeMode="cover"
                            style={styles.listViewClose}/>
                    </View>
                </TouchableOpacity>
            </View>
        }

        var thisPrimaryColour = Helpers.getPrimaryColour(this.props);
        return (
            <View style={{flex: 1}}>
                {cancelButton}
                <ListView
                    style={[globalStyles.listViewList, {backgroundColor: this.props.listViewBackgroundColour ? this.props.listViewBackgroundColour : 'transparent'}]}
                    contentContainerStyle={[globalStyles.listViewGridList, {backgroundColor: this.props.listViewContentContainerBackgroundColour ? this.props.listViewContentContainerBackgroundColour : 'transparent'}]}
                    dataSource={this.state.dataSource}
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
                    renderRow={(rowData) => (this.props.showRatings ? this._renderRowWithRatings(rowData, this.state) : this._renderRow(rowData, this.state))}
                    pageSize={this.state.members.length}
                />
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TeamAvatarList);
