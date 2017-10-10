/**
 * # app.js
 *  Display startup screen and
 *  getSessionTokenAtStartup which will navigate upon completion
 *
 *
 *
 */
'use strict';
/*
 * ## Imports
 *  
 * Imports from redux
 */
import {connect} from 'react-redux';
import TabNavigator from 'react-native-tab-navigator';

// Import Containers
import Tools from './Tools';
import Profile from './Profile';
import Feedback from './Feedback';
import Tasks from './Tasks';
import Schedule from './Schedule';

// Selectors
import { barRouteSelector } from '../selectors/routesSelectors';

/**
 * Immutable Map
 */
import {Map} from 'immutable';

/**
 * Project actions
 */
import * as authActions from '../reducers/auth/authActions';
import * as globalActions from '../reducers/global/globalActions';

// Actions
import { navigate } from '../actions/navigator';

/**
 * The components we need from ReactNative
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

/**
 * ## Actions
 * 4 of our actions will be available as ```actions```
 */
const actions = [
    authActions,
    globalActions
];

var globalStyles = require('../components/Stylesheet');
var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    titleContainer: {
        flex: 1
    },
    title: {
        fontSize: 40,
        color: 'white'
    }
});

/**
 * ## App class
 */
class Home extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        route: PropTypes.string.isRequired,
    };

    componentDidMount() {

    }

     // Navigation functions
    goToTask = () => { this.props.dispatch(navigate('bar', 'task')); }
    goToSchedule = () => { this.props.dispatch(navigate('bar', 'schedule')); }
    goToTools = () => { this.props.dispatch(navigate('bar', 'tools')); }
    goToFeedback= () => { this.props.dispatch(navigate('bar', 'feedback')); }
    goToProfile= () => { this.props.dispatch(navigate('bar', 'profile')); }

    // Icon renderers
    renderIcon = (source) => <Image source={source} />;

    renderTaskIcon = () =>
        this.renderIcon(require('../images/newimages/task.png'));
    renderTaskSelectedIcon = () =>
        this.renderIcon(require('../images/newimages/task_active.png'));
    renderScheduleIcon = () =>
        this.renderIcon(require('../images/newimages/schedule.png'));
    renderScheduleSelectedIcon = () =>
        this.renderIcon(require('../images/newimages/schedule_active.png'));
    renderToolsIcon = () =>
        this.renderIcon(require('../images/newimages/tools.png'));
    renderToolsSelectedIcon = () =>
        this.renderIcon(require('../images/newimages/tools_active.png'));
    renderFeedbackIcon = () =>
        this.renderIcon(require('../images/newimages/feedback.png'));
    renderFeedbackSelectedIcon = () =>
        this.renderIcon(require('../images/newimages/feedback_active.png'));
    renderProfileIcon = () =>
        this.renderIcon(require('../images/newimages/profile.png'));
    renderProfileSelectedIcon = () =>
        this.renderIcon(require('../images/newimages/profile_active.png'));

    render() {
        const { route } = this.props;
        return (
            <TabNavigator
                tabBarStyle={{ backgroundColor: 'black' }}
            >
                <TabNavigator.Item
                    selected={route === 'task'}
                    title="Tasks"
                    renderIcon={this.renderTaskIcon}
                    renderSelectedIcon={this.renderTaskSelectedIcon}
                    onPress={this.goToTask}
                    titleStyle={{ color: '#BDBDBD' }}
                    selectedTitleStyle={{ color: 'white' }}
                >
                    <Tasks/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={route === 'schedule'}
                    title="Schedule"
                    renderIcon={this.renderScheduleIcon}
                    renderSelectedIcon={this.renderScheduleSelectedIcon}
                    onPress={this.goToSchedule}
                    titleStyle={{ color: '#BDBDBD' }}
                    selectedTitleStyle={{ color: 'white' }}
                >
                    <Schedule/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={route === 'tools'}
                    title="Tools"
                    renderIcon={this.renderToolsIcon}
                    renderSelectedIcon={this.renderToolsSelectedIcon}
                    onPress={this.goToTools}
                    titleStyle={{ color: '#BDBDBD' }}
                    selectedTitleStyle={{ color: 'white' }}
                >
                    <Tools/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={route === 'feedback'}
                    title="Feedback"
                    renderIcon={this.renderFeedbackIcon}
                    renderSelectedIcon={this.renderFeedbackSelectedIcon}
                    onPress={this.goToFeedback}
                    titleStyle={{ color: '#BDBDBD' }}
                    selectedTitleStyle={{ color: 'white' }}
                >
                    <Feedback/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={route === 'profile'}
                    title="Profile"
                    renderIcon={this.renderProfileIcon}
                    renderSelectedIcon={this.renderProfileSelectedIcon}
                    onPress={this.goToProfile}
                    titleStyle={{ color: '#BDBDBD' }}
                    selectedTitleStyle={{ color: 'white' }}
                >
                    <Profile/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
};

/**
 * Connect the properties
 */
export default connect(
  (state) => ({
    route: barRouteSelector(state),
  }),
  dispatch => ({ dispatch })
)(Home);
