/**
 * # Logout.js
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
import * as toolSavesListActions from '../reducers/toolSavesList/toolSavesListActions';
import * as toolsListActions from '../reducers/toolsList/toolsListActions';
import * as ratingActions from '../reducers/rating/ratingActions';
import * as profileActions from '../reducers/profile/profileActions';
import * as authActions from '../reducers/auth/authActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 * The FormButton will change it's text between the 4 states as necessary
 */
import FormButton from '../components/FormButton';

/**
 * The necessary React components
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    StatusBar
}
    from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import NavBarWithProps from '../components/NavBarWithProps'

/**
 * ## Redux boilerplate
 */
const actions = [
    toolSavesListActions,
    toolsListActions,
    ratingActions,
    profileActions,
    authActions,
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
import Colour from '../lib/colour'
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
var globalStyles = require('../components/Stylesheet');

import Helpers from '../lib/helpers'
var CookieManager = require('react-native-cookies');

class Logout extends Component {

    constructor(props) {
        super(props);
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

        let self = this;

        let onButtonPress = () => {
            this.props.actions.deleteProfile();
            this.props.actions.deleteRatings();
            this.props.actions.deleteTools();
            this.props.actions.deleteToolSaves();
            this.props.actions.logout();
            CookieManager.clearAll((err, res) => {
                // console.log('cookies cleared!');
                // console.log(err);
                // console.log(res);
            });
        };

        var thisPrimaryColour = Helpers.getPrimaryColour(this.props),
            thisSecondaryColour = Helpers.getSecondaryColour(this.props);

        let logoutButtonText = <View>
            <View style={globalStyles.iconAndText}>
                <View style={globalStyles.buttonIconContainer}>
                    <Icon name='eject' size={18} color='white'/>
                </View>
                <View style={globalStyles.buttonTextContainer}>
                    <Text style={globalStyles.sansSerifRegularText}>
                        <Text style={[globalStyles.bodyText, {color: 'white'}]}>
                            LOG OUT
                        </Text>
                    </Text>
                </View>
            </View>
        </View>;

        // console.log(this.props.auth.form.isFetching, !this.props.auth.form.isValid)
        return (
            <View style={{flex: 1, marginTop: NAVBAR_PADDING}}>
                <StatusBar
                    barStyle="light-content"
                />
                <View
                    style={[globalStyles.container, globalStyles.containerWithNavBar, {justifyContent: 'flex-start', paddingTop: 40, backgroundColor: Colour.get(thisPrimaryColour).drawerHeaderTextColour}]}>

                    <Text
                        style={[globalStyles.serifLightText, globalStyles.bodyText, {textAlign: 'center', color: Colour.get(thisPrimaryColour).drawerTextColour}]}>
                        Before you logout please make sure you have access to your Organisation ID code and your
                        original password so you can log in again.
                    </Text>
                    <Text
                        style={[globalStyles.serifLightText, globalStyles.bodyText, {textAlign: 'center', marginBottom: NAVBAR_PADDING, color: Colour.get(thisPrimaryColour).drawerTextColour}]}>
                        If you have forgotten your password, you can reset it after logging out and the new one will be
                        emailed to you at the email address iLeader has on file.
                    </Text>

                    <FormButton
                        isFetching={false}
                        isDisabled={false}
                        onPress={onButtonPress.bind(self)}
                        buttonText={logoutButtonText}
                        color={thisSecondaryColour}
                    />
                </View>
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
