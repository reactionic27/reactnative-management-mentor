/**
 * # TaskLog.js
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
import * as toolSavesListActions from '../reducers/toolSavesList/toolSavesListActions';
import * as toolsListActions from '../reducers/toolsList/toolsListActions';
import * as profileActions from '../reducers/profile/profileActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Immutable
 */
import Immutable from 'immutable';

/**
 * ### icons
 *
 * Add icon support for use in Drawer
 *
 */
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * The necessary React components
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ListView,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    Platform,
    InteractionManager,
    ActivityIndicator
}
    from 'react-native';

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

import NavBarWithProps from '../components/NavBarWithProps'

const moment = require('moment');

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
    toolSavesListActions,
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
 * ## Styles
 */
import GradientOverlay from '../components/BackgroundImage'
import Colour from '../lib/colour'
var globalStyles = require('../components/Stylesheet');
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
const PADDING = 20;
const FONT_SIZE = 14;
const BORDER_COLOUR = 'hsl(210, 13%, 91%)';
const AVATAR_SIZE = 40;
const USER_SCROLL_AVATAR_SIZE = 60;
const BORDER_WIDTH = 3;
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const styles = StyleSheet.create({
    listViewContainer: {
        flex: 1,
        marginTop: NAVBAR_PADDING
    },
    listViewRowIconBorder: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderWidth: BORDER_WIDTH,
        marginTop: PADDING / 4,
        marginBottom: PADDING / 4,
        marginLeft: PADDING,
        marginRight: PADDING,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            height: 1.5,
            width: 0
        },
        elevation: 3
    },
    listViewRowIcon: {
        backgroundColor: 'transparent',
        alignSelf: 'center'
    },
    backTextWhite: {
        color: '#FFF'
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
    userScrollView: {
        height: USER_SCROLL_AVATAR_SIZE + (2 * PADDING),
        backgroundColor: 'transparent',
        paddingLeft: 3 * PADDING / 4
    },
    userScrollBorder: {
        width: USER_SCROLL_AVATAR_SIZE,
        height: USER_SCROLL_AVATAR_SIZE,
        borderRadius: USER_SCROLL_AVATAR_SIZE / 2,
        borderWidth: BORDER_WIDTH,
        borderColor: 'white',
        marginTop: PADDING / 4,
        marginBottom: PADDING / 4,
        marginLeft: PADDING / 4,
        marginRight: PADDING / 4,
        alignSelf: 'center',
        transform: [{rotate: '-45deg'}]
    },
    userScroll: {
        width: USER_SCROLL_AVATAR_SIZE - (BORDER_WIDTH * 2),
        height: USER_SCROLL_AVATAR_SIZE - (BORDER_WIDTH * 2),
        borderRadius: (USER_SCROLL_AVATAR_SIZE - (BORDER_WIDTH * 2)) / 2,
        alignSelf: 'center',
        transform: [{rotate: '45deg'}]
    },
    listViewAvatarName: {
        width: USER_SCROLL_AVATAR_SIZE + PADDING,
        marginLeft: (PADDING / 2) - 10,
        marginRight: (PADDING / 2) - 10,
        paddingBottom: PADDING / 2,
        backgroundColor: 'transparent',
        alignItems: 'center'
    }
});

const DEFAULT_AVATAR = 'data:image/png;base64,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';

import Helpers from '../lib/helpers';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import ToolListItem from '../components/ToolListItem';

var UserScroll = React.createClass({
    propTypes: {
        users: PropTypes.array,
        thisPrimaryColour: PropTypes.string
    },

    getInitialState: function () {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });

        return {
            dataSource: ds.cloneWithRows(this.props.users)
        };
    },

    _renderRow(rowData) {
        var avatar = rowData.avatar ? rowData.avatar : DEFAULT_AVATAR;

        return <View>
            <View style={[styles.userScrollBorder, {
                    borderColor: 'white'
                }]}
            >
                <Image
                    source={{uri: avatar}}
                    resizeMode="cover"
                    style={styles.userScroll}/>
            </View>
            <View style={[styles.listViewAvatarName]}>

                <Text
                    style={[globalStyles.sansSerifRegularText, {
                                color: DARK_GREY_COLOUR,
                                textAlign: 'center',
                                fontSize: FONT_SIZE - 3
                            }, this.props.textStyle]}>
                    {rowData.firstName}
                </Text>

            </View>
        </View>
    },

    render() {
        return <ScrollView
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={350}
            style={styles.userScrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <ListView
                contentContainerStyle={[globalStyles.listViewGridList, {paddingBottom: 0}]}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                pageSize={this.props.users.length}
            />
        </ScrollView>
    }
});

const LogHeader = ({title, text, textColour}) => (
    <View style={{
        paddingTop: PADDING,
        paddingBottom: PADDING / 4,
        backgroundColor: 'transparent',
        alignItems: 'center'
    }}>
        <Text style={[globalStyles.sansSerifRegularText, {
            color: textColour,
            textAlign: 'center',
            marginBottom: PADDING / 2
        }]}>
            <Text style={{fontSize: FONT_SIZE + 2}}>
                {title}
            </Text>
        </Text>
        <Text style={[globalStyles.sansSerifRegularText, {
            color: textColour,
            textAlign: 'center',
            marginBottom: PADDING / 2
        }]}>
            <Text style={{fontSize: FONT_SIZE - 3}}>
                {text}
            </Text>
        </Text>
    </View>
);

const RATING_TIME_OFFSET_DAYS = -1;
const RATING_TIME_OFFSET_HOURS = 12;
const RATING_TIME_OFFSET_MINUTES = 0;

class TaskLog extends Component {

    _getTodaysUserRating(member) {
        if (member.ratings.length === 0) return null;

        let latestRating = member.ratings[member.ratings.length - 1],
            startTime = moment()
                .add((new Date()).getHours() < 12 ? RATING_TIME_OFFSET_DAYS : RATING_TIME_OFFSET_DAYS + 1, 'days')
                .hour(RATING_TIME_OFFSET_HOURS)
                .minute(RATING_TIME_OFFSET_MINUTES)
                .second(0),
            endTime = moment()
                .add((new Date()).getHours() < 12 ? RATING_TIME_OFFSET_DAYS + 1 : RATING_TIME_OFFSET_DAYS + 2, 'days')
                .hour(RATING_TIME_OFFSET_HOURS)
                .minute(RATING_TIME_OFFSET_MINUTES)
                .second(0),
            ratedToday = moment(latestRating.scoreDatetime).isSameOrAfter(startTime) && moment(latestRating.scoreDatetime).isSameOrBefore(endTime);

        if (!ratedToday) return null;

        return {
            enthusiasm: parseInt(latestRating.enthusiasm),
            productivity: parseInt(latestRating.productivity),
            firstName: member.firstName,
            lastName: member.lastName,
            avatar: member.avatar
        }
    }

    _percentage(count, total) {
        return (count / total) * 100;
    }

    _getTodaysRatingStatistics(members) {
        let redProductivityCount = 0, orangeProductivityCount = 0, greenProductivityCount = 0,
            redEnthusiasmCount = 0, orangeEnthusiasmCount = 0, greenEnthusiasmCount = 0,
            ratings = [];

        members.forEach((member) => {
            let rating = this._getTodaysUserRating(member);
            ratings.push(rating);

            if (!rating) return false;

            if (rating.productivity < this.state.productivityFirstTertileGreatestUpperBound) {
                redProductivityCount++;
            } else if (rating.productivity < this.state.productivitySecondTertileGreatestUpperBound) {
                orangeProductivityCount++;
            } else {
                greenProductivityCount++;
            }

            if (rating.enthusiasm < this.state.enthusiasmFirstTertileGreatestUpperBound) {
                redEnthusiasmCount++;
            } else if (rating.enthusiasm < this.state.enthusiasmSecondTertileGreatestUpperBound) {
                orangeEnthusiasmCount++;
            } else {
                greenEnthusiasmCount++;
            }
        });

        ratings = ratings.filter((rating) => rating);

        return {
            ratings: ratings,
            redProductivity: this._percentage(redProductivityCount, ratings.length),
            orangeProductivity: this._percentage(orangeProductivityCount, ratings.length),
            greenProductivity: this._percentage(greenProductivityCount, ratings.length),
            redEnthusiasm: this._percentage(redEnthusiasmCount, ratings.length),
            orangeEnthusiasm: this._percentage(orangeEnthusiasmCount, ratings.length),
            greenEnthusiasm: this._percentage(greenEnthusiasmCount, ratings.length)
        };
    }

    _getTool(id, tools) {
        // console.log(id, tools);
        return id && tools ? tools.find((tool) => parseInt(tool.id) === parseInt(id)) : null;
    }

    _getTodaysTools(statistics, decisionMatrix, toolOptions) {
        let tools = {
                overall: null,
                productivity: null,
                enthusiasm: null
            },
            toolUsers = {
                productivity: [],
                enthusiasm: []
            };

        if (statistics.redProductivity === 100 && statistics.redEnthusiasm === 100) {
            tools.overall = this._getTool(decisionMatrix.overall1, toolOptions);
        } else if (statistics.greenProductivity === 100 && statistics.greenEnthusiasm === 100) {
            tools.overall = this._getTool(decisionMatrix.overall2, toolOptions);
        } else if (statistics.greenProductivity === 100 && statistics.redEnthusiasm === 100) {
            tools.overall = this._getTool(decisionMatrix.overall3, toolOptions);
        } else if (statistics.redProductivity === 100 && statistics.greenEnthusiasm === 100) {
            tools.overall = this._getTool(decisionMatrix.overall4, toolOptions);
        } else {
            tools.overall = null;
        }

        ['productivity', 'enthusiasm'].forEach((measure) => {
            let capital = Helpers.capitalize(measure);
            if (Math.round(statistics["red" + capital]) === 0 && Math.round(statistics["orange" + capital] + statistics["green" + capital]) === 100) {
                tools[measure] = this._getTool(decisionMatrix[measure + "1"], toolOptions);
                toolUsers[measure] = statistics.ratings.filter((rating) => {
                    return rating[measure] < this.state[measure + 'FirstTertileGreatestUpperBound'];
                });
            } else if (statistics["red" + capital] <= 20 && statistics["orange" + capital] + statistics["green" + capital] >= 80) {
                tools[measure] = this._getTool(decisionMatrix[measure + "2"], toolOptions);
                toolUsers[measure] = statistics.ratings.filter((rating) => {
                    return rating[measure] < this.state[measure + 'FirstTertileGreatestUpperBound'];
                });
            } else if (statistics["red" + capital] <= 50 && statistics["orange" + capital] + statistics["green" + capital] >= 50) {
                tools[measure] = this._getTool(decisionMatrix[measure + "3"], toolOptions);
                toolUsers[measure] = statistics.ratings.filter((rating) => {
                    return rating[measure] < this.state[measure + 'FirstTertileGreatestUpperBound'];
                });
            } else if (statistics["red" + capital] <= 50 && statistics["orange" + capital] + statistics["green" + capital] >= 20) {
                tools[measure] = this._getTool(decisionMatrix[measure + "4"], toolOptions);
                toolUsers[measure] = statistics.ratings.filter((rating) => {
                    return rating[measure] < this.state[measure + 'FirstTertileGreatestUpperBound'];
                });
            } else if (statistics["red" + capital] + statistics["orange" + capital] <= 80 && statistics["green" + capital] >= 20) {
                tools[measure] = this._getTool(decisionMatrix[measure + "5"], toolOptions);
                toolUsers[measure] = statistics.ratings.filter((rating) => {
                    return rating[measure] < this.state[measure + 'SecondTertileGreatestUpperBound'];
                });
            } else if (Math.round(statistics["red" + capital]) === 100 && Math.round(statistics["orange" + capital] + statistics["green" + capital]) === 0) {
                tools[measure] = this._getTool(decisionMatrix[measure + "6"], toolOptions);
                toolUsers[measure] = statistics.ratings;
            } else if (statistics["red" + capital] + statistics["orange" + capital] <= 100 && statistics["green" + capital] >= 0) {
                tools[measure] = this._getTool(decisionMatrix[measure + "7"], toolOptions);
                toolUsers[measure] = statistics.ratings;
            } else {
                tools[measure] = null;
            }
        });

        return {
            tools: tools,
            toolUsers: toolUsers
        };
    }

    /**
     * ## Tools class
     * Set the initial state
     */
    constructor(props) {
        super(props);

        this.state = {
            rowToDeleteUUID: -1,
            loading: true,
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
        // console.log(nextProps);
        let toolSaves = Helpers.getToolSaves(nextProps).toArray();

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });

        if (toolSaves.length) {

            if (this.state.toolSaves) {
              if (toolSaves.length < this.state.toolSaves.length) {
                this.setState({rowToDeleteUUID: -1});
                InteractionManager.runAfterInteractions(() => {
                    this.setTimeout(() => {
                        this.props.actions.toolSavesSync(this.props.global.currentUserToken);
                    }, 350);
                });
              }
            }

            this.setState({
                loading: false,
                toolSaves: toolSaves,
                toolSavesDataSource: ds.cloneWithRows(toolSaves)
            });
        }
    }

    /**
     * ### componentDidMount
     */
    componentDidMount() {
        // console.log("TASK LOG componentDidMount() -> this.props", this.props);

        let dm = Helpers.getDecisionMatrix(this.props),
            stats = this._getTodaysRatingStatistics(Helpers.getMembers(this.props).toJS()),
            tools = Helpers.getTools(this.props).toJS(),
            todaysTools = this._getTodaysTools(stats, dm, tools);

        // console.log(dm, stats, tools, todaysTools);
        this.setState({
          rowToDeleteUUID: -1
        });

        InteractionManager.runAfterInteractions(() => {
            this.setTimeout(() => {
                this.props.actions.getLocalToolSaves();
                this.props.actions.getToolSaves(this.props.global.currentUserToken);
                this.setState({
                    todaysTools: todaysTools
                });
            }, 350);
        });
    }

    _deleteRow(rowData, secId, rowId, rowMap) {
        var uuidToDelete = rowData.toJS().uuid;
        var js = rowData.toJS();
        this.setState({
          rowToDeleteUUID: rowData.toJS().uuid
        });

        this.forceUpdate();

        rowMap[`${secId}${rowId}`].closeRow();
        InteractionManager.runAfterInteractions(() => {
            this.setTimeout(() => {
                this.props.actions.deleteLocalToolSave(rowData.toJS().uuid);
            }, 350);
        });
    }

    _renderRow(rowData, secId, rowId, rowMap) {
        // console.log(rowData.toJS());

        var rowOpacity = rowData.toJS().uuid == this.state.rowToDeleteUUID ? 0.3 : 1;
        var rowDisabled = this.state.rowToDeleteUUID != -1;//rowData.toJS().uuid == this.state.rowToDeleteUUID ? true : false;

        let save = rowData.toJS(),
            thisPrimaryColour = Helpers.getPrimaryColour(this.props);

        // console.log(save);

        var icon = <View/>;
        if (save.toolIcon) {
            icon = <View style={[styles.listViewRowIconBorder, {borderColor: Colour.get(thisPrimaryColour).base}]}>
                <Icon style={[styles.listViewRowIcon, {color: Colour.get(thisPrimaryColour).base}]}
                      name={save.toolIcon}
                      size={24}/>
            </View>;
        }

        return <SwipeRow
          disableRightSwipe={true}
          disableLeftSwipe={this.state.rowToDeleteUUID != -1}
          leftOpenValue={0}
          rightOpenValue={-75}>

          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={_ => this._deleteRow(rowData, secId, rowId, rowMap)}
            >
              <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
          </View>

          <TouchableHighlight
            onPress={() => {
                if (rowData.toJS().uuid == this.state.rowToDeleteUUID) {
                  return;
                }
                Actions.ToolSaveShow({
                    toolId: save.toolId || save.data.localId,
                    uuid: save.uuid
                });
            }}
            activeOpacity={0.9}
            underlayColor={BORDER_COLOUR}
            style={{
                height: 80,
                backgroundColor: 'white',
            }}
            disabled={rowDisabled}>

            <View style={{
                flex: 1,
                paddingTop: PADDING / 2,
                paddingBottom: PADDING / 2,
                paddingLeft: PADDING / 2,
                paddingRight: PADDING / 2,
                borderBottomColor: BORDER_COLOUR,
                borderBottomWidth: StyleSheet.hairlineWidth,
                opacity: rowOpacity,
            }}
            >
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{
                        flex: 2,
                        paddingLeft: PADDING / 2,
                        paddingRight: PADDING / 2,
                        justifyContent: 'center'
                    }}>
                        {icon}
                    </View>
                    <View style={{
                        flex: 8,
                        paddingLeft: PADDING / 2,
                        paddingRight: PADDING / 2,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: 'hsl(0, 0%, 20%)'
                        }}>
                            {save.toolName}
                        </Text>
                        <Text style={[globalStyles.labelText, {marginBottom: 0, fontSize: FONT_SIZE - 3}]}>
                            {save.data.name ? save.data.name : save.uuid}
                            {'\n'}
                            {moment(new Date(save.updatedAt)).format('DD/MM/YYYY [at] HH:mm')}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: PADDING / 2,
                        paddingRight: PADDING / 2,
                        justifyContent: 'center'
                    }}>
                        <Image
                            source={require('../images/iLeaderArrowBlue.png')}
                            resizeMode='cover'
                            style={{
                                height: 18,
                                width: 18
                            }}
                        />
                    </View>
                </View>
            </View>
          </TouchableHighlight>
        </SwipeRow>
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

        let loadingView = [1, 2, 3, 4].map(function (i) {
            return <View
                key={'loadingView' + i}
                style={[globalStyles.listViewRow, styles.toolListRow, {backgroundColor: Colour.get(thisPrimaryColour).drawerHeaderTextColour}]}
            >
                <View style={{flex: 1, flexDirection: 'column', alignSelf: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color={Colour.get(thisPrimaryColour).base} animating={true}
                                       style={{opacity: 1}}/>
                </View>
            </View>
        });

        let deletingView = <View style={{flex: 1, flexDirection: 'column', alignSelf: 'center', alignItems: 'center', paddingTop: PADDING*2}}>
              <ActivityIndicator color={Colour.get(thisPrimaryColour).base} animating={true}
                                 style={{opacity: 1}}/>
          </View>;

        let overallHeader = this.state.todaysTools && this.state.todaysTools.tools.overall ? <LogHeader
                title="Overall"
                text={
                "Your team has reported low Enthusiasm (AND/OR) Productivity."
                + "\n"
                + "Engage them with the recommended task."
            }
                textColour={DARK_GREY_COLOUR}
            /> : <View/>,
            overallUsers = this.state.todaysTools && this.state.todaysTools.tools.overall ? <UserScroll
                users={this.state.todaysTools.toolUsers.overall}
                thisPrimaryColour={thisPrimaryColour}
            /> : <View/>,
            overallTool = this.state.todaysTools && this.state.todaysTools.tools.overall ? <ToolListItem
                tool={this.state.todaysTools.tools.overall}
                thisPrimaryColour={thisPrimaryColour}
            /> : <View/>,
            productivityHeader = this.state.todaysTools && this.state.todaysTools.tools.productivity ? <LogHeader
                title="Productivity"
                text={
                    "These members of the team feel productivity is too low."
                    + "\n"
                    + "Engage them with the recommended task."
                }
                textColour={DARK_GREY_COLOUR}
            /> : <View/>,
            productivityUsers = this.state.todaysTools && this.state.todaysTools.tools.productivity ? <UserScroll
                users={this.state.todaysTools.toolUsers.productivity}
                thisPrimaryColour={thisPrimaryColour}
            /> : <View/>,
            productivityTool = this.state.todaysTools && this.state.todaysTools.tools.productivity ? <ToolListItem
                tool={this.state.todaysTools.tools.productivity}
                thisPrimaryColour={thisPrimaryColour}
            /> : <View/>,
            enthusiasmHeader = this.state.todaysTools && this.state.todaysTools.tools.enthusiasm ? <LogHeader
                title="Enthusiasm"
                text={
                    "These team members feel enthusiasm in the team is too low."
                    +"\n"
                    + "Engage them with the recommended task."
                }
                textColour={DARK_GREY_COLOUR}
            /> : <View/>,
            enthusiasmUsers = this.state.todaysTools && this.state.todaysTools.tools.enthusiasm ? <UserScroll
                users={this.state.todaysTools.toolUsers.enthusiasm}
                thisPrimaryColour={thisPrimaryColour}
            /> : <View/>,
            enthusiasmTool = this.state.todaysTools && this.state.todaysTools.tools.enthusiasm ? <ToolListItem
                tool={this.state.todaysTools.tools.enthusiasm}
                thisPrimaryColour={thisPrimaryColour}
            /> : <View/>,
            bannerText = this.state.todaysTools &&
            (
            this.state.todaysTools.tools.overall
            || this.state.todaysTools.tools.productivity
            || this.state.todaysTools.tools.enthusiasm) ?
                "The following tasks are recommended\nbased upon your team's rating today" :
                "You have no suggested tasks right now\ncome back tomorrow\nor engage your team in the Tools page";


        let toolSavesContent = <View/>;
        if (this.state.toolSavesDataSource && this.state.toolSaves.length) {
            toolSavesContent = this.state.loading ? loadingView : (this.state.rowToDeleteUUID != -1) ? deletingView :
                <View style={{
                    paddingTop: PADDING,
                    marginTop: PADDING,
                    backgroundColor: Colour.get(thisPrimaryColour).drawerHeaderTextColour,
                    shadowColor: "#000000",
                    shadowOpacity: 0.4,
                    shadowRadius: PADDING / 16,
                    shadowOffset: {
                        height: PADDING / 8,
                        width: 0
                    },
                    borderBottomWidth: 0,
                    elevation: 5
                }}>

                    <GradientOverlay/>

                    <Text style={[globalStyles.sansSerifRegularText, {
                        color: 'white',
                        backgroundColor: 'transparent',
                        textAlign: 'center'
                    }]}>
                        <Text style={{fontSize: FONT_SIZE + 2}}>
                            My Saved Tasks
                        </Text>
                    </Text>
                    <SwipeListView
                        style={[globalStyles.listViewList, {marginTop: PADDING, marginBottom: PADDING}]}
                        dataSource={this.state.toolSavesDataSource}
                        renderRow={(rowData, secId, rowId, rowMap) => (this._renderRow(rowData, secId, rowId, rowMap))}
                    />
                </View>
        }

        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle="light-content"
                />
                <GradientOverlay
                    opacity={0.2}
                />
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={350}
                    style={styles.scrollView}
                    keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'none'}
                >

                    <View style={styles.listViewContainer}>
                        <View
                            style={[{
                                justifyContent: 'center',
                                paddingTop: 20,
                                paddingBottom: 20,
                                paddingLeft: 20,
                                paddingRight: 20,
                                backgroundColor: Colour.get(thisPrimaryColour).drawerHeaderTextColour,
                                shadowOpacity: 0.4,
                                shadowRadius: PADDING / 16,
                                shadowOffset: {
                                    height: PADDING / 8,
                                    width: 0
                                },
                                borderBottomWidth: 0,
                                elevation: 5
                            }]}>

                            <GradientOverlay/>

                            <View style={{marginBottom: PADDING / 2, backgroundColor: 'transparent'}}>
                                <Text style={{textAlign: 'center'}}>
                                    <Text style={globalStyles.sansSerifLightText}>
                                        <Text
                                            style={[globalStyles.sansSerifLightText, globalStyles.captionText, {color: Colour.get(thisPrimaryColour).drawerTextColour}]}>
                                            {bannerText}
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
                        </View>
                        <View>
                            {overallHeader}
                            {overallUsers}
                            {overallTool}
                            {productivityHeader}
                            {productivityUsers}
                            {productivityTool}
                            {enthusiasmHeader}
                            {enthusiasmUsers}
                            {enthusiasmTool}
                        </View>
                        {toolSavesContent}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

reactMixin(TaskLog.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(TaskLog);
