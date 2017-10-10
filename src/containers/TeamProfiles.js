/**
 * # TeamProfiles.js
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
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    StatusBar
}
    from 'react-native';

import NavBarWithProps from '../components/NavBarWithProps'
import TeamAvatarList from '../components/TeamAvatarList'

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

/**
 * ## Styles
 */
import GradientOverlay from '../components/BackgroundImage'
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
const styles = StyleSheet.create({
    listViewContainer: {
        flex: 1,
        marginTop: NAVBAR_PADDING
    }
});

class TeamProfiles extends Component {

    /**
     * ## TeamProfiles class
     * Set the initial state
     */
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
     * display the form wrapped with the header and button
     */
    render() {
        return (
            <View style={styles.listViewContainer}>
                <StatusBar
                    barStyle={this.props.firstTime ? "default" : "light-content"}
                />
                <GradientOverlay/>
                <TeamAvatarList
                    showSectionHeader={true}
                    showRatings={true}
                    defaultOnPress={true}
                />
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TeamProfiles);
