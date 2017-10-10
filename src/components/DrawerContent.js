/**
 * # DrawerContent.js
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
 * The necessary React components
 */
import React, {Component, PropTypes} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet
}
    from 'react-native';

/**
 * ### icons
 *
 * Add icon support for use in Drawer
 *
 */
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * The FormButton will respond to the press
 */
import FormButton from '../components/FormButton';

/**
 * The Mailer opens the default mail program
 */
var Mailer = require('NativeModules').RNMail;

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

import GradientOverlay from '../components/BackgroundImage'
import Colour from '../lib/colour'
const PADDING = 20;
var globalStyles = require('../components/Stylesheet');
var styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: PADDING * 2,
        paddingBottom: PADDING,
        paddingLeft: 0,
        paddingRight: 0
    },
    logo: {
      flex: 1,
    },
    drawerAvatarImageStyles: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'white'
    }
});

import Helpers from '../lib/helpers'

var DrawerNavItem = React.createClass({

    propTypes: {
        onPress: PropTypes.func,
        icon: PropTypes.string,
        iconSize: PropTypes.number,
        text: PropTypes.string,
        activeOpacity: PropTypes.number,
        odd: PropTypes.bool
    },

    render: function () {
        return <View style={this.props.drawItemContainerStyles}>
            <TouchableOpacity
                activeOpacity={this.props.activeOpacity || 0.75}
                onPress={this.props.onPress}
                style={this.props.odd ? this.props.oddDrawerItemStyles : this.props.evenDrawerItemStyles}>

                <View style={globalStyles.iconAndText}>
                    <View style={globalStyles.iconContainer}>
                        <Icon style={this.props.drawerTextStyles} name={this.props.icon} size={this.props.iconSize || 18}/>
                    </View>
                    <View style={globalStyles.textContainer}>
                        <Text style={globalStyles.sansSerifLightText}>
                            <Text style={[globalStyles.bodyText, this.props.drawerTextStyles]}>
                                {this.props.text}
                            </Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>;

    }
});

class DrawerContent extends Component {

    constructor(props) {
        super(props);
        var thisPrimaryColour = Helpers.getPrimaryColour(props),
            thisSecondaryColour = Helpers.getSecondaryColour(props),
            thisCurrentUser = Helpers.getCurrentUser(props),
            thisCurrentOrganisation = Helpers.getCurrentOrganisation(props);
        this.state = {
            drawerStyles: {
                flex: 1
            },
            drawerHeaderTextStyles: {
                color: Colour.get(thisPrimaryColour).drawerHeaderTextColour
            },
            drawerButtonColor: Colour.get(thisSecondaryColour).base,
            drawerTextStyles: {
                color: Colour.get(thisSecondaryColour).drawerTextColour
            },
            drawItemContainerStyles: {},
            evenDrawerItemStyles: {
                height: 36,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: 'transparent',
                borderBottomColor: Colour.get(thisPrimaryColour).drawerItemBorderBottom,
                borderStyle: 'solid',
                borderBottomWidth: StyleSheet.hairlineWidth,
            },
            oddDrawerItemStyles: {
                height: 36,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderBottomColor: Colour.get(thisPrimaryColour).drawerItemBorderTop,
                borderStyle: 'solid',
                borderBottomWidth: StyleSheet.hairlineWidth
            },
            currentUser: {
                avatar: thisCurrentUser.avatar,
                name: thisCurrentUser.name,
                iLeader: thisCurrentUser.iLeader,
                myILeader: thisCurrentUser.myILeader,
                title: thisCurrentUser.title
            },
            currentOrganisation: {
                name: thisCurrentOrganisation.name,
                logo: thisCurrentOrganisation.logo
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        var thisPrimaryColour = Helpers.getPrimaryColour(nextProps),
            thisSecondaryColour = Helpers.getSecondaryColour(nextProps),
            thisCurrentUser = Helpers.getCurrentUser(nextProps),
            thisCurrentOrganisation = Helpers.getCurrentOrganisation(nextProps);
        this.setState({
            drawerStyles: {
                flex: 1
            },
            drawerHeaderTextStyles: {
                color: Colour.get(thisPrimaryColour).drawerHeaderTextColour
            },
            drawerButtonColor: Colour.get(thisSecondaryColour).base,
            drawerTextStyles: {
                color: Colour.get(thisSecondaryColour).drawerTextColour
            },
            drawItemContainerStyles: {},
            evenDrawerItemStyles: {
                height: 36,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: 'transparent',
                borderBottomColor: Colour.get(thisPrimaryColour).drawerItemBorderBottomSecondary,
                borderStyle: 'solid',
                borderBottomWidth: StyleSheet.hairlineWidth
            },
            oddDrawerItemStyles: {
                height: 36,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderBottomColor: Colour.get(thisPrimaryColour).drawerItemBorderBottomPrimary,
                borderStyle: 'solid',
                borderBottomWidth: StyleSheet.hairlineWidth
            },
            currentUser: {
                avatar: thisCurrentUser.avatar,
                name: thisCurrentUser.name,
                iLeader: thisCurrentUser.iLeader,
                myILeader: thisCurrentUser.myILeader,
                title: thisCurrentUser.title
            },
            currentOrganisation: {
                name: thisCurrentOrganisation.name,
                logo: thisCurrentOrganisation.logo
            }
        });
    }

    async _act(action) {
        return new Promise(function (resolve, reject) {
            action();
            resolve();
        });
    }

    /**
     * ### render
     *
     * Display the DrawerContent
     */
    render() {

        let tools = <View/>;
        let myTeam = <View/>;

        if (this.state.currentUser.iLeader) {
            tools = <View>
                <DrawerNavItem
                    {...this.state}
                    onPress={() => {
                            this._act(Actions.TaskLog).then(() => {
                                this.props.closeDrawer();
                            });
                        }}
                    icon="assignment"
                    text="Task Log"
                    odd={true}
                />
                <DrawerNavItem
                    {...this.state}
                    onPress={() => {
                            this._act(Actions.Tools).then(() => {
                                this.props.closeDrawer();
                            });
                        }}
                    icon="build"
                    text="Tools"
                    odd={false}
                />
            </View>;

            myTeam = <View>
                <DrawerNavItem
                    {...this.state}
                    onPress={() => {
                            this._act(Actions.TeamRating).then(() => {
                                this.props.closeDrawer();
                            });
                        }}
                    icon="assessment"
                    text="Today's Feedback"
                    odd={true}
                />
                <DrawerNavItem
                    {...this.state}
                    onPress={() => {
                            this._act(Actions.TeamHistorical).then(() => {
                                this.props.closeDrawer();
                            });
                        }}
                    icon="hourglass-empty"
                    text="Historical Feedback"
                    odd={false}
                />
                <DrawerNavItem
                    {...this.state}
                    onPress={() => {
                            this._act(Actions.TeamProfiles).then(() => {
                                this.props.closeDrawer();
                            });
                        }}
                    icon="people-outline"
                    text="Team Members"
                    odd={true}
                />
            </View>
        }

        /**
         * Display text if iLeader
         */
        var iLeaderText = <Text style={{backgroundColor: 'transparent'}}/>;
        if (this.state.currentUser.title) {
            iLeaderText =
                <Text
                    style={[globalStyles.sansSerifLightText, globalStyles.captionText, this.state.drawerHeaderTextStyles, {backgroundColor: 'transparent'}]}>
                    {this.state.currentUser.title}
                </Text>;
        }

        /**
         * When the button is pressed, open the email client to start a new
         * message to the iLeader
         */
        let contactButtonText = <View>
            <View style={globalStyles.iconAndText}>
                <View style={globalStyles.buttonIconContainer}>
                    <Icon style={this.state.drawerTextStyles} name='email' size={18}/>
                </View>
                <View style={globalStyles.buttonTextContainer}>
                    <Text style={globalStyles.sansSerifRegularText}>
                        <Text style={[globalStyles.bodyText, this.state.drawerTextStyles]}>
                            EMAIL ILEADER
                        </Text>
                    </Text>
                </View>
            </View>
        </View>;

        // Need to create function to open email client
        let onContactButtonPress = () => {
            Mailer.mail(
                {
                    subject: '[iLeader App] Message from ' + this.state.currentUser.name,
                    recipients: [this.state.currentUser.myILeader.toJS().email],
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

        let contactButton = this.state.currentUser.myILeader ? <FormButton
                onPress={onContactButtonPress.bind(this)}
                buttonText={contactButtonText}
                color={this.state.drawerButtonColor}
            /> : <View/>;

        var thisPrimaryColour = Helpers.getPrimaryColour(this.props);

        var organisationLogo = this.state.currentOrganisation.logo ? <Image
            source={{uri: this.state.currentOrganisation.logo}}
            resizeMode="center"
            style={[styles.logo]}/>
            : <View/>;

        return (
            <View style={this.state.drawerStyles}>
                <View style={[styles.background, {backgroundColor: Colour.get(thisPrimaryColour).base}]}>
                    <GradientOverlay
                        opacity={0.2}
                    />
                    <View style={{flex: 5}}>

                        <View style={[globalStyles.avatarWithCaption, {borderBottomWidth: 0, marginLeft: 0, marginRight: 0}]}>
                            <TouchableOpacity onPress={() => {
                              this._act(Actions.Profile).then(() => {
                                        this.props.closeDrawer();
                                    });
                              }}>
                            <Image
                                source={{uri: this.state.currentUser.avatar}}
                                resizeMode="cover"
                                style={[globalStyles.avatar, styles.drawerAvatarImageStyles]}
                            />
                            </TouchableOpacity>

                            <Text
                                style={[globalStyles.serifBoldText, globalStyles.captionTitle, this.state.drawerHeaderTextStyles, {backgroundColor: 'transparent'}]}>
                                {this.state.currentUser.name}
                            </Text>

                            {iLeaderText}
                        </View>

                        <View style={[globalStyles.formButtonContainer, {paddingTop: 0}]}>
                            {contactButton}
                        </View>

                        <DrawerNavItem
                            {...this.state}
                            onPress={() => {
                            this._act(Actions.Rating).then(() => {
                                        this.props.closeDrawer();
                                    });
                                }}
                            icon="star-border"
                            text="Daily Feedback"
                            odd={false}
                        />

                        {tools}
                        {myTeam}

                        <DrawerNavItem
                            {...this.state}
                            onPress={() => {
                            this._act(Actions.Profile).then(() => {
                                        this.props.closeDrawer();
                                    });
                                }}
                            icon="account-circle"
                            text="Edit Profile"
                            odd={!this.state.currentUser.iLeader}
                        />
                        <DrawerNavItem
                            {...this.state}
                            onPress={() => {
                            this._act(Actions.Logout).then(() => {
                                        this.props.closeDrawer();
                                    });
                                }}
                            icon="eject"
                            text="Logout"
                            odd={this.state.currentUser.iLeader}
                        />

                        {organisationLogo}

                    </View>
                </View>
            </View>
        )
    }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
