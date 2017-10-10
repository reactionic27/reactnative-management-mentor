/**
 * # LoginRender.js
 *
 * This class is a little complicated as it handles multiple states.
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
import * as authActions from '../reducers/auth/authActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 * Router actions
 */
import {Actions} from 'react-native-router-flux';

/**
 * The ErrorAlert displays an alert for both ios & android
 */
import ErrorAlert from '../components/ErrorAlert';
/**
 * The FormButton will change it's text between the 4 states as necessary
 */
import FormButton from '../components/FormButton';
/**
 *  The LoginForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import LoginForm from '../components/LoginForm';
/**
 * The itemCheckbox will toggle the display of the password fields
 */
import ItemCheckbox from '../components/ItemCheckbox';

/**
 * The necessary React components
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
    StatusBar,
    Dimensions,
    TouchableWithoutFeedback,
    Modal,
    WebView
}
    from 'react-native';

var {height, width} = Dimensions.get('window');
var DismissKeyboard = require('dismissKeyboard'); // Require React Native's utility library.

/**
 * The states were interested in
 */
const {
    NO_ORGANISATION_ID,
    ORGANISATION_LOGIN,
    LOGIN,
    FORGOT_PASSWORD
} = require('../lib/constants').default;

/**
 * ## Styles
 */
import Colour from '../lib/colour'
var globalStyles = require('./Stylesheet');
const DEFAULT_PRIMARY_COLOUR = 'hsl(204, 73%, 23%)';
const PADDING = 20;
const STATUSBAR_PADDING = PADDING * 2;
const CLOSE_IMAGE = 'data:image/png;base64,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';
const AVATAR_SIZE = 60;
const BORDER_WIDTH = 3;
var styles = StyleSheet.create({
    titleContainer: {
        flex: 7
    },
    inputContainer: {
        flex: 6
    },
    buttonContainer: {
        flex: 3
    },
    linksContainer: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        paddingTop: STATUSBAR_PADDING
    },
    modalCloseBorder: {
        width: AVATAR_SIZE / 2,
        height: AVATAR_SIZE / 2,
        borderRadius: AVATAR_SIZE / 4,
        borderWidth: BORDER_WIDTH,
        borderColor: 'transparent',
        marginTop: PADDING / 4,
        marginBottom: PADDING,
        marginLeft: PADDING,
        marginRight: PADDING,
        alignSelf: 'center',
        transform: [{rotate: '-45deg'}]
    },
    modalClose: {
        width: (AVATAR_SIZE / 2) - (BORDER_WIDTH * 2),
        height: (AVATAR_SIZE / 2) - (BORDER_WIDTH * 2),
        borderRadius: ((AVATAR_SIZE / 2) - (BORDER_WIDTH * 2)) / 2,
        alignSelf: 'center',
        transform: [{rotate: '45deg'}]
    }
});
/**
 * ## Redux boilerplate
 */
const actions = [
    authActions,
    globalActions
];

function mapStateToProps(state) {
    return {};
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

let BACKGROUND_IMAGE;
if (height <= 480) {
    BACKGROUND_IMAGE = require('../images/loginBackground/Default@2x.png'); // iPhone 4/4s
} else if (height <= 568) {
    BACKGROUND_IMAGE = require('../images/loginBackground/Default-568h@2x.png'); // iPhone 5/5s
} else if (height <= 667) {
    BACKGROUND_IMAGE = require('../images/loginBackground/Default-667h@2x.png'); // iPhone 6
} else if (height <= 736) {
    BACKGROUND_IMAGE = require('../images/loginBackground/Default-Portrait-736h@3x.png'); // iPhone 6+
} else {
    BACKGROUND_IMAGE = require('../images/loginBackground/Default-Portrait-736h@3x.png'); // iPhone 6+
}

class LoginRender extends Component {
    constructor(props) {
        super(props);
        this.errorAlert = new ErrorAlert();
        this.state = {
            value: {
                uuid: this.props.auth.form.fields.uuid,
                email: this.props.auth.form.fields.email,
                password: this.props.auth.form.fields.password
            },
            animationType: 'slide',
            transparent: false,
            modalVisible: false
        };
    }

    /**
     * ### componentWillReceiveProps
     * As the properties are validated they will be set here.
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: {
                uuid: nextProps.auth.form.fields.uuid,
                email: nextProps.auth.form.fields.email,
                password: nextProps.auth.form.fields.password
            }
        });
    }

    /**
     * ### onChange
     *
     * As the user enters keys, this is called for each key stroke.
     * Rather then publish the rules for each of the fields, I find it
     * better to display the rules required as long as the field doesn't
     * meet the requirements.
     * *Note* that the fields are validated by the authReducer
     */
    onChange(value) {
        if (value.uuid != '') {
            this.props.actions.onAuthFormFieldChange('uuid', value.uuid);
        }
        if (value.email != '') {
            this.props.actions.onAuthFormFieldChange('email', value.email);
        }
        if (value.password != '') {
            this.props.actions.onAuthFormFieldChange('password', value.password);
        }
        this.setState(
            {value}
        );
    }

    /**
     *  Get the appropriate message for the current action
     *  @param messageType NO_ORGANISATION_ID, ORGANISATION_LOGIN, FORGOT_PASSWORD, or LOGIN
     *  @param actions the action for the message type
     */
    getMessage(messageType, actions) {
        let noOrganisationID =
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                            this._setModalVisible(true);
                        }}>
                <Text style={{textAlign: 'center'}}>
                    <Text style={globalStyles.sansSerifLightText}>
                        <Text style={[globalStyles.bodyText, {color: 'white'}]}>
                            Don't have an ID?
                        </Text>
                    </Text>
                </Text>
            </TouchableOpacity>;

        let organisationLogin =
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                          actions.organisationLoginState();
                          Actions.OrganisationLogin();
                        }}>
                <Text style={{textAlign: 'center'}}>
                    <Text style={globalStyles.sansSerifLightText}>
                        <Text style={[globalStyles.bodyText, {color: 'white'}]}>
                            Change Organisation?
                        </Text>
                    </Text>
                </Text>
            </TouchableOpacity>;

        let login =
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                          actions.loginState();
                          Actions.pop();
                        }}>
                <Text style={{textAlign: 'center'}}>
                    <Text style={globalStyles.sansSerifLightText}>
                        <Text style={[globalStyles.bodyText, {color: 'white'}]}>
                            Already have an account?
                        </Text>
                    </Text>
                </Text>
            </TouchableOpacity>;

        let forgotPassword =
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                          actions.forgotPasswordState();
                          Actions.ForgotPasswordView();
                        }}>
                <Text style={{textAlign: 'center'}}>
                    <Text style={globalStyles.sansSerifLightText}>
                        <Text style={[globalStyles.bodyText, {color: 'white'}]}>
                            Forgot Password?
                        </Text>
                    </Text>
                </Text>
            </TouchableOpacity>;

        switch (messageType) {
            case NO_ORGANISATION_ID:
                return noOrganisationID;
            case ORGANISATION_LOGIN:
                return organisationLogin;
            case LOGIN:
                return login;
            case FORGOT_PASSWORD:
                return forgotPassword;
        }
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    /**
     * ### render
     * Setup some default presentations and render
     */
    render() {
        var formType = this.props.formType;
        var loginButtonText = this.props.loginButtonText;
        var onButtonPress = this.props.onButtonPress;
        var displayPasswordCheckbox = this.props.displayPasswordCheckbox;
        var displayAdditionalText = this.props.additionalText;
        var leftMessageType = this.props.leftMessageType;
        var rightMessageType = this.props.rightMessageType;

        var passwordCheckbox = <Text/>;
        var additionalText = <Text/>;
        let leftMessage = this.getMessage(leftMessageType, this.props.actions);
        let rightMessage = this.getMessage(rightMessageType, this.props.actions);

        let that = this;

        // display the login / change password screens

        switch (formType) {
            case(ORGANISATION_LOGIN):
                if (this.props.auth.form.error === "Your Organisation ID is invalid, please try again.") {
                    this.errorAlert.checkError(this.props.auth.form.error);
                }
                break;
            case(LOGIN):
                if (this.props.auth.form.error === "Invalid login credentials. Please try again.") {
                    this.errorAlert.checkError(this.props.auth.form.error);
                }
                break;
            case(FORGOT_PASSWORD):
                if (this.props.auth.form.error === "Error changing password." || this.props.auth.form.error === "This email address was not recognised. Please check and try again.") {
                    this.errorAlert.checkError(this.props.auth.form.error);
                }
                break;
        }

        /**
         * Toggle the display of the Password fields
         */
        if (displayPasswordCheckbox) {
            passwordCheckbox =
                <ItemCheckbox
                    text="Show Password"
                    disabled={this.props.auth.form.isFetching}
                    onCheck={() => {this.props.actions.onAuthFormFieldChange('showPassword', true);}}
                    onUncheck={() => {this.props.actions.onAuthFormFieldChange('showPassword', false);}}
                />;
        }

        /**
         * Display any additional text
         */
        if (displayAdditionalText) {
            additionalText =
                <Text style={{textAlign: 'center'}}>
                    <Text style={globalStyles.sansSerifLightText}>
                        <Text style={[globalStyles.bodyText, {color: 'white'}]}>
                            {displayAdditionalText}
                        </Text>
                    </Text>
                </Text>;
        }

        // console.log(this.props);

        let colour = Colour.get(DEFAULT_PRIMARY_COLOUR).buttonPrimary;
        if ((this.props.formType === LOGIN || this.props.formType === FORGOT_PASSWORD) && this.props.global.currentOrganisation && this.props.global.currentOrganisation.appConfig) {
            colour = Colour.get(this.props.global.currentOrganisation.appConfig.primaryColour).buttonPrimary;
        }

        var modal = <Modal
            animationType={this.state.animationType}
            transparent={this.state.transparent}
            visible={this.state.modalVisible}
            onRequestClose={() => {this._setModalVisible(false)}}
        >
            <View style={[styles.modalContainer, {
                backgroundColor: Colour.get(DEFAULT_PRIMARY_COLOUR).buttonPrimary
            }]}>
                <View style={{marginBottom: PADDING}}>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => {this._setModalVisible(false)}}>
                        <View
                            style={[styles.modalCloseBorder]}>
                            <Image
                                source={{uri: CLOSE_IMAGE}}
                                resizeMode="cover"
                                style={styles.modalClose}/>
                        </View>
                    </TouchableOpacity>
                    <WebView
                        ref='webview'
                        automaticallyAdjustContentInsets={true}
                        style={{
                            height: height - 100,
                            marginLeft: PADDING / 4,
                            marginRight: PADDING / 4,
                            shadowOpacity: 0.2,
                            shadowRadius: PADDING / 16,
                            shadowOffset: {
                                height: PADDING / 8,
                                width: 0
                            },
                            elevation: 5
                        }}
                        source={{uri: 'http://www.oxfordstrategicconsulting.com/'}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        // onNavigationStateChange={this.onNavigationStateChange}
                        // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                        startInLoadingState={false}
                        scalesPageToFit={this.state.scalesPageToFit}
                    />
                </View>
            </View>
        </Modal>;

        /**
         * The LoginForm is now defined with the required fields.  Just
         * surround it with the navigation messages
         * Note how the button too is disabled if we're fetching. The
         * header props are mostly for support of Hot reloading.
         * See the docs for Header for more info.
         */
        return (
            <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
                <View style={{flex: 1}}>
                    <View>
                        <View style={{flex: 1, position: 'absolute', top: 0, left: 0, alignItems: 'center'}}>
                            <Image
                                // style={styles.icon}
                                source={BACKGROUND_IMAGE}
                                resizeMode='cover'
                            />
                        </View>
                    </View>

                    <View style={[globalStyles.container, {flexDirection: 'column', backgroundColor: 'transparent'}]}>
                        <StatusBar
                            barStyle="light-content"
                        />
                        <View style={styles.titleContainer}/>

                        <View style={[globalStyles.column, {justifyContent: 'center'}, styles.inputContainer]}>
                            <LoginForm
                                formType={formType}
                                form={this.props.auth.form}
                                value={this.state.value}
                                onChange={that.onChange.bind(that)}
                                onPress={onButtonPress}
                            />
                            {passwordCheckbox}
                            {additionalText}
                        </View>

                        <View style={[globalStyles.column, {justifyContent: 'center'}, styles.buttonContainer]}>
                            <FormButton
                                isFetching={this.props.auth.form.isFetching}
                                isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
                                onPress={onButtonPress}
                                buttonText={loginButtonText}
                                color={colour}
                            />
                        </View>

                        <View style={[globalStyles.column, {justifyContent: 'center'}, styles.linksContainer]}>
                            {leftMessage}
                        </View>

                        <View style={[globalStyles.column, {justifyContent: 'center'}, styles.linksContainer]}>
                            {rightMessage}
                        </View>

                    </View>
                    {modal}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginRender);
