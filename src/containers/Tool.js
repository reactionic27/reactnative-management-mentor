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
 * The actions we need
 */
import * as toolSavesListActions from '../reducers/toolSavesList/toolSavesListActions';
import * as toolActions from '../reducers/tool/toolActions';
import * as toolsListActions from '../reducers/toolsList/toolsListActions';
import * as profileActions from '../reducers/profile/profileActions';
import * as globalActions from '../reducers/global/globalActions';

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

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

var {height, width} = Dimensions.get('window');

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import ToolNameField from '../components/ToolNameField';

import ChecklistIcon from '../components/ChecklistIcon';
import SaveButton from '../components/SaveButton';
import BackButton from '../components/BackButton';

import NavBarWithProps from '../components/NavBarWithProps'
import Card from '../components/Card'
import Table from '../components/Table'
import StaticSlideItem from '../components/StaticSlideItem'
import Separator from '../components/Separator';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../components/scrollableTabView/TabBar'

import FormButton from '../components/FormButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    toolActions,
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

const Schedule_Icon =  require('../images/newimages/schedule_icon.png');
const Pencil_Icon =  require('../images/newimages/pencil.png');
const Group_Icon =  require('../images/newimages/group.png');
const Clock_Icon =  require('../images/newimages/clock.png');
const Location_Icon =  require('../images/newimages/location.png');
const Mark_Icon =  require('../images/newimages/mark.png');
const RightArrow_Icon =  require('../images/newimages/rightArrow.png');

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
        marginTop: NAVBAR_PADDING
    },
    upperView: {
        width: width, 
        height: height-NAVBAR_PADDING-50,
    },
    titleView: {
        width: width, 
        height: 55, 
        flexDirection: 'row', 
        alignItems: 'center',
    },
    textInput: {
        width: width-80, 
        height: 30, 
        fontFamily: 'Roboto-Regular', 
        fontSize: 15,
    },
    scheduleFooter: {
        width: width, 
        height: 50, 
        backgroundColor: '#FF5722', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    scheduleImage: {
        width: 97, 
        height: 20, 
        resizeMode: 'contain'
    },
    clockRightView: {
        flexDirection: 'column', 
        width: width-50, 
        marginLeft: 20,
    },
    clockEachView: {
        flexDirection: 'row', 
        height: 55, 
        alignItems: 'center',
    },
    clockTitle: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: '#000000',
    },
    clockTitleView: {
        width: width-50-100,
    },
    timeView: {
        width: 100, 
        alignItems: 'center',
    },
    clockIcon: {
        marginLeft: 10, 
        marginTop: 15,
    },
});

class Tool extends Component {
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
            title: "Weekly Team Meeting",
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
            <View style={styles.listViewContainer}>
                <StatusBar barStyle="light-content"/>
                <View style={styles.upperView}>
                    <View style={styles.titleView}>
                        <View style={{marginLeft: 10}}>
                            <Image source={Pencil_Icon} style={{width: 18, height: 18, resizeMode: 'contain'}}/>
                        </View>
                        <View style={{marginLeft: 20}}>
                            <TextInput placeholder="Meeting Title"
                                       placeholderTextColor="#787A80"
                                       style={styles.textInput}
                            />
                        </View>
                    </View>
                    <Separator color={"#787A80"} width={width} height={1}/>
                    <View style={styles.titleView}>
                        <View style={{marginLeft: 10}}>
                            <Image source={Group_Icon} style={{width: 22, height: 14, resizeMode: 'contain'}}/>
                        </View>
                        <View style={{marginLeft: 20}}>
                            <TextInput placeholder="Add Guests"
                                       placeholderTextColor="#787A80"
                                       style={styles.textInput}
                            />
                        </View>
                    </View>
                    <Separator color={"#787A80"} width={width} height={1}/>
                    <View style={{width: width, flexDirection: 'row',}}>
                        <View style={styles.clockIcon}>
                            <Image source={Clock_Icon} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                        </View>
                        <View style={styles.clockRightView}>
                            <View style={styles.clockEachView}>
                                <View style={styles.clockTitleView}>
                                    <Text style={styles.clockTitle}>
                                        All Day
                                    </Text>
                                </View>
                                <View style={styles.timeView}>
                                    <Switch style={{height: 30}}/>
                                </View>
                            </View>
                            <View style={styles.clockEachView}>
                                <View style={styles.clockTitleView}>
                                    <Text style={styles.clockTitle}>
                                        Wednesday, 7 Dec.
                                    </Text>
                                </View>
                                <View style={styles.timeView}>
                                    <Text style={styles.clockTitle}>
                                        11 AM
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.clockEachView}>
                                <View style={styles.clockTitleView}>
                                    <Text style={styles.clockTitle}>
                                        Wednesday, 7 Dec.
                                    </Text>
                                </View>
                                <View style={styles.timeView}>
                                    <Text style={styles.clockTitle}>
                                        12 PM
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#787A80"} width={width} height={1}/>
                    <View style={styles.titleView}>
                        <View style={{marginLeft: 10}}>
                            <Image source={Location_Icon} style={{width: 14, height: 20, resizeMode: 'contain'}}/>
                        </View>
                        <View style={{marginLeft: 20}}>
                            <TextInput placeholder="Add Location"
                                       placeholderTextColor="#787A80"
                                       style={styles.textInput}
                            />
                        </View>
                    </View>
                    <Separator color={"#787A80"} width={width} height={1}/>
                    <View style={styles.titleView}>
                        <View style={{marginLeft: 10}}>
                            <Image source={Mark_Icon} style={{width: 18, height: 18, resizeMode: 'contain'}}/>
                        </View>
                        <View style={{marginLeft: 20}}>
                            <TextInput placeholder="Default colour"
                                       placeholderTextColor="#787A80"
                                       style={styles.textInput}
                            />
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Image source={RightArrow_Icon} style={{width: 8, height: 12, resizeMode: 'contain'}}/>
                        </View>
                    </View>
                    <Separator color={"#787A80"} width={width} height={1}/>
                </View>
                <TouchableOpacity 
                    style={styles.scheduleFooter}
                    onPress={() => {
                        Actions.AgendaShow({
                        });
                    }}
                >
                    <Image source={Schedule_Icon} style={styles.scheduleImage}/>
                </TouchableOpacity>
            </View>
        );
    }
}

reactMixin(Tool.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(Tool);
