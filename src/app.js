'use strict';

/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary components from ReactNative
 */
import React from 'react';
import {
    AppRegistry,
    Navigator,
    View,
    Text,
    StyleSheet,
    Animated,
    Platform,
    DatePickerIOS,
    BackAndroid
} from 'react-native';

/** TODO:
 *
 * This is a temporary fix re https://github.com/gcanti/tcomb-form-native/pull/175#issuecomment-223616240
 * relating to the issue https://github.com/gcanti/tcomb-form-native/issues/165
 * which is actually an upstream RN issue https://github.com/facebook/react-native/pull/7472
 */

if (Platform.OS === 'ios') {
    DatePickerIOS.propTypes.date = React.PropTypes.any.isRequired;
    DatePickerIOS.propTypes.onDateChange = React.PropTypes.func;
    DatePickerIOS.propTypes.maximumDate = React.PropTypes.any;
    DatePickerIOS.propTypes.minimumDate = React.PropTypes.any;
}

/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {Scene, Router, TabBar, Reducer, Actions} from 'react-native-router-flux'

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
    Provider
} from 'react-redux';

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from './lib/configureStore';

/**
 * ### containers
 *
 * All the top level containers
 *
 */
import App from './containers/App';
import Transition from './containers/Transition';

import OrganisationLogin from './containers/OrganisationLogin';

import Login from './containers/Login';
import SignUpStepOne from './containers/SignUpStepOne';
import SignUpStepTwo from './containers/SignUpStepTwo';
import SignUpStepThree from './containers/SignUpStepThree';
import SignUpStepFour from './containers/SignUpStepFour';

import LoginStepOne from './containers/LoginStepOne';
import LoginStepTwo from './containers/LoginStepTwo';
import LoginStepThree from './containers/LoginStepThree';

import ForgotPassword from './containers/ForgotPassword';

import SideDrawer from './containers/Drawer';

import Logout from './containers/Logout';

import Rating from './containers/Rating';

import TaskLog from './containers/TaskLog';

import TeamRating from './containers/TeamRating';
import TeamHistorical from './containers/TeamHistorical';
import TeamProfiles from './containers/TeamProfiles';
import MemberProfile from './containers/MemberProfile';

import Home from './containers/Home';
import Tasks from './containers/Tasks';
import Schedule from './containers/Schedule';
import Profile from './containers/Profile';
import Tools from './containers/Tools';
import Tool from './containers/Tool';
import Agenda from './containers/Agenda';
import Checklist from './containers/Checklist';

/**
 * ### components
 *
 * All the top level components
 *
 */
import MenuBurger from './components/MenuBurger';
import MenuSpinner from './components/MenuSpinner';
import EmailIcon from './components/EmailIcon';
import ChecklistIcon from './components/ChecklistIcon';
import SaveButton from './components/SaveButton';
import BackButton from './components/BackButton';

/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import {setPlatform, setVersion} from './reducers/device/deviceActions';
import {setStore} from './reducers/global/globalActions';

/**
 * ## States
 * App explicitly defines initial state
 *
 */
import AuthInitialState from './reducers/auth/authInitialState';
import DeviceInitialState from './reducers/device/deviceInitialState';
import GlobalInitialState from './reducers/global/globalInitialState';
import ProfileInitialState from './reducers/profile/profileInitialState';
import RatingInitialState from './reducers/rating/ratingInitialState';
import ToolsListInitialState from './reducers/toolsList/toolsListInitialState';
import ToolInitialState from './reducers/tool/toolInitialState';
import AppHistoryInitialState from './reducers/appHistory/appHistoryInitialState';

/**
 *  The version of the app but not displayed yet
 */
var VERSION = '0.0.12';

let EditButton = require('./images/newimages/edit_text.png');

/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in the app
 * @returns {Object} object with 5 keys
 */
function getInitialState() {
    const _initState = {
        auth: new AuthInitialState,
        device: (new DeviceInitialState).set('isMobile', true),
        global: new GlobalInitialState,
        profile: new ProfileInitialState,
        rating: new RatingInitialState,
        toolsList: new ToolsListInitialState,
        tool: new ToolInitialState,
        appHistory: new AppHistoryInitialState
    };
    return _initState;
}

var globalState = null, globalAction = null;

const reducerCreate = params => {
    const defaultReducer = Reducer(params);
    return (state, action)=> {
        globalState = state;
        globalAction = action;
        // console.log("reducerCreate:", state, action);
        return defaultReducer(state, action);
    }
};

import SimpleAlert from 'react-native-simpledialog-android';

const flattenStyle = require('flattenStyle');
var globalStyles = require('./components/Stylesheet');

/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */
export default function native(platform) {

    let iLeaderApp = React.createClass({

        _renderMenuBurger: function () {
            return <MenuBurger/>;
        },

        _renderSpinner: function () {
            return <MenuSpinner/>;
        },

        _renderEmailIcon: function (sceneName) {
            return <EmailIcon {...globalAction} sceneName={sceneName}/>;
        },

        _renderChecklistIcon: function (key) {
            return <ChecklistIcon {...globalAction} action={key}/>;
        },

        _renderSaveButton: function () {
            return <SaveButton {...globalAction}/>;
        },

        _renderBackButton: function () {
            return <BackButton {...globalAction}/>;
        },

        _renderEditButton: function () {
            Actions.pop();
        },

        render: function () {

            const store = configureStore(getInitialState());

            // configureStore will combine reducers from snowflake and main application
            // it will then create the store based on aggregate state from all reducers
            store.dispatch(setPlatform(platform));
            store.dispatch(setVersion(VERSION));
            store.dispatch(setStore(store));

            // setup the router table with App selected as the initial component

            const scenes = Actions.create(
                <Scene key="Root" hideNavBar={true}>
                    <Scene key="Login"
                           component={Login}
                           hideNavBar={true}
                           initial={true}
                    />
                    <Scene key="SignUpStepOne"
                           component={SignUpStepOne}
                           hideNavBar={true}
                    />
                    <Scene key="SignUpStepTwo"
                           component={SignUpStepTwo}
                           hideNavBar={true}
                    />
                    <Scene key="SignUpStepThree"
                           component={SignUpStepThree}
                           hideNavBar={true}
                    />
                    <Scene key="SignUpStepFour"
                           component={SignUpStepFour}
                           hideNavBar={true}
                    />
                    <Scene key="LoginStepOne"
                           component={LoginStepOne}
                           hideNavBar={true}
                    />
                    <Scene key="LoginStepTwo"
                           component={LoginStepTwo}
                           hideNavBar={true}
                    />
                    <Scene key="LoginStepThree"
                           component={LoginStepThree}
                           hideNavBar={true}
                    />
                    <Scene key="TabBar"
                           component={Home}
                    />
                    <Scene key="Tasks"
                           component={Tasks}
                            title="Tasks"
                            renderBackButton={this._renderBackButton}
                            panHandlers={null}
                            type="push"
                            direction="vertical"
                    />
                    <Scene key="Schedule"
                           component={Schedule}
                            title="Schedule"
                            panHandlers={null}
                            type="push"
                            direction="vertical"
                    />
                    <Scene key="ToolsShow"
                            component={Tool}
                            title="Weekly Team Meeting"
                            navigationBarStyle={{backgroundColor: '#FF5722'}}
                            titleStyle={{color: 'white', fontFamily: 'Roboto-Regular', fontSize: 17}}
                            hideNavBar={false}
                            renderBackButton={this._renderBackButton}
                            panHandlers={null}
                            type="push"
                            direction="vertical"
                            duration={350}
                            titleIndex={0}
                    />
                    <Scene key="AgendaShow"
                            component={Agenda}
                            navigationBarStyle={{backgroundColor: '#FF5722', borderBottomWidth: 0}}
                            titleStyle={{color: 'white', fontFamily: 'Roboto-Regular', fontSize: 17}}
                            hideNavBar={false}
                            renderBackButton={this._renderBackButton}
                            rightButtonImage={EditButton}
                            rightButtonIconStyle={{width: 25, height: 13, resizeMode: 'cover'}}
                            onRight={this._renderEditButton}
                            type="push"
                            direction="vertical"
                            duration={350}
                            titleIndex={0}
                    />
                </Scene>
            );

            BackAndroid.addEventListener('hardwareBackPress', () => {
                try {
                    // console.log("Pressed back button");
                    Actions.pop();
                    return true;
                }
                catch (err) {
                    SimpleAlert.alert('Exit app', 'Are you sure you wish to quit the app?', [
                      { type: SimpleAlert.POSITIVE_BUTTON, text: 'Yes', onPress: _onExitAppConfirmed },
                      { type: SimpleAlert.NEGATIVE_BUTTON, text: 'No' },
                    ]);

                    return true;
                }
            });

            return (
                <Provider store={store}>
                    <Router createReducer={reducerCreate}
                            sceneStyle={{backgroundColor:'white'}}
                            scenes={scenes}/>
                </Provider>
            );
        }
    });
    /**
     * registerComponent to the AppRegistery and off we go....
     */

    function _onExitAppConfirmed(event) {
      BackAndroid.exitApp();
    };

    AppRegistry.registerComponent('iLeaderApp', () => iLeaderApp);
}
