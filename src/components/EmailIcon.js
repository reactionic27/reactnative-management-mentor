/**
 * # EmailIcon.js
 *
 * The list of links to go in the side drawer
 */
'use strict';
/**
 * ## Imports
 *
 * Imports from redux
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/**
 * The actions we need
 */
import * as profileActions from '../reducers/profile/profileActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 * The Mailer opens the default mail program
 */
var Mailer = require('NativeModules').RNMail;

/**
 * The necessary React components
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform
}
    from 'react-native';

/**
 * ## Redux boilerplate
 */
const actions = [
    profileActions
];

function mapStateToProps(state) {
    return {
        ...state
    };
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
 * ### icons
 *
 * Add icon support for use in NavBar
 *
 */
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colour from '../lib/colour'
const DEFAULT_PRIMARY_COLOUR = 'hsl(204, 73%, 23%)';
const styles = StyleSheet.create({
    rightButton: {
        width: 100,
        height: 37,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 5 : 8,
        right: 2,
        padding: 8
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});

import Helpers from '../lib/helpers'

class EmailIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            iconStyles: {
                color: Colour.get(Helpers.getPrimaryColour(props)).menuIcon
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            iconStyles: {
                color: Colour.get(Helpers.getPrimaryColour(nextProps)).menuIcon
            }
        });
    }

    /**
     * ### render
     *
     * Display the DrawerContent
     */
    render() {
        const name = 'EmailIcon';


        /**
         * When the button is pressed, open the email client to start a new
         * message to the iLeader
         */
        let contactButtonText = 'Contact your iLeader';
        // Need to create function to open email client
        let onContactButtonPress = () => {

            var recipients;
            if (this.props.sceneName === 'TeamProfilesIndex') {
                recipients = this.props.profile.members.toArray().map(function (recipient) {
                    return recipient.toJS().email;
                });
            } else if (this.props.sceneName === 'TeamProfilesShow') {
                recipients = [this.props.scene.member.email];
            }

            // console.log(recipients);

            Mailer.mail(
                {
                    subject: '[iLeader App] Message from your iLeader',
                    recipients: recipients,
                    body: '',
                    /*
                    // Adding empty parameters to the 'attachment' parameter returns an exception in iOS (RNMail.m line 81)
                    // Uncomment only if parameter has content
                    attachment: {
                        path: '',   // The absolute path of the file from which to read data.
                        type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
                        name: ''    // Optional: Custom filename for attachment
                    }
                    */
                },
                (error, event) => {
                    if (error) {
                        // console.log('onContactButtonPress error', error, event);
                    }
                });
        };

        return (

            <TouchableOpacity key={'rightNavBarBtn' + name}
                              testID="rightNavButton"
                              style={styles.rightButton}
                              onPress={onContactButtonPress.bind(this)}>
                <View style={styles.view}>
                    <Icon style={this.state.iconStyles} name='mail-outline' size={30}/>
                </View>
            </TouchableOpacity>
        );
    }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(EmailIcon);
