/**
 * # Profile.js
 *
 * This component provides an interface for a logged in user to change
 * their email.
 * It too is a container so there is boilerplate from Redux similar to
 * ```App``` and ```Login```
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
import * as appHistoryActions from '../reducers/appHistory/appHistoryActions';
import * as profileActions from '../reducers/profile/profileActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Immutable Mapn
 */
import {Map} from 'immutable';

/**
 * The ErrorAlert will display any and all errors
 */
import ErrorAlert from '../components/ErrorAlert';
/**
 * The FormButton will respond to the press
 */
import FormButton from '../components/FormButton';

/**
 * The necessary React components
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Platform,
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity,
    Image,
    StatusBar,
    InteractionManager,
    Dimensions,
    Picker,
    ActivityIndicator,
    ScrollView,
}
    from 'react-native';
const Item = Picker.Item;

var {height, width} = Dimensions.get('window');

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

import NavBarWithProps from '../components/NavBarWithProps'

import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * The form processing component
 */
import t from 'tcomb-form-native';
import FloatingLabel from 'react-native-floating-label';
const stylesheet = require('../components/FormStylesheet');
t.form.Form.stylesheet = stylesheet;
let Form = t.form.Form;

import ModalPicker from 'react-native-picker'

/**
 * ## Redux boilerplate
 */
const actions = [
    appHistoryActions,
    profileActions,
    globalActions
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

let BACKGROUND_IMAGE;
switch (height) {
    case 480:
        BACKGROUND_IMAGE = require('../images/loginBackground/Default@2x.png'); // iPhone 4/4s
        break;
    case 568:
        BACKGROUND_IMAGE = require('../images/loginBackground/Default-568h@2x.png'); // iPhone 5/5s
        break;
    case 667:
        BACKGROUND_IMAGE = require('../images/loginBackground/Default-667h@2x.png'); // iPhone 6
        break;
    case 736:
        BACKGROUND_IMAGE = require('../images/loginBackground/Default-Portrait-736h@3x.png'); // iPhone 6+
        break;
    default:
        BACKGROUND_IMAGE = require('../images/loginBackground/Default@2x.png'); // iPhone 4/4s
        break;
}

const Green_Icon =  require('../images/newimages/greencheck.png');
const Gray_Icon =  require('../images/newimages/graycheck.png');
const Blue_Icon =  require('../images/newimages/blueplus.png');
const User11_Icon =  require('../images/newimages/user11.png');
const User12_Icon =  require('../images/newimages/user12.png');
const User13_Icon =  require('../images/newimages/user13.png');
const User14_Icon =  require('../images/newimages/user14.png');
const User15_Icon =  require('../images/newimages/user15.png');
const User16_Icon =  require('../images/newimages/user16.png');
const User17_Icon =  require('../images/newimages/user17.png');
const User18_Icon =  require('../images/newimages/user18.png');
const User19_Icon =  require('../images/newimages/user19.png');

/**
 * An image picker for the avatar
 */
const ImagePickerManager = require('NativeModules').ImagePickerManager;
const imagePickerManagerOptions = {
    title: 'Select Avatar', // specify null or empty string to remove the title
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
    chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
    cameraType: 'back', // 'front' or 'back'
    mediaType: 'photo', // 'photo' or 'video'
    videoQuality: 'high', // 'low', 'medium', or 'high'
    durationLimit: 10, // video recording max time in seconds
    maxWidth: 300, // photos only
    maxHeight: 300, // photos only
    quality: 1, // 0 to 1, photos only
    aspectX: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
    aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
    angle: 0, // android only, photos only
    allowsEditing: true, // Built in functionality to resize/reposition the image after selection
    noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
    storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'iLeader Images' // ios only - will save image at /Documents/images rather than the root
    }
};

/**
 * ## Styles
 */
import GradientOverlay from '../components/BackgroundImage'
import Colour from '../lib/colour'
const LABEL_COLOUR = 'hsl(211, 12%, 54%)';
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
const TABBAR_PADDING = 51;
const PADDING = 20;
const DEFAULT_AVATAR = 'data:image/png;base64,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';
var globalStyles = require('../components/Stylesheet');
var styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        height: height,
    },
    userScrollView: {
        width: width-60,
        height: 46, 
        marginTop: 20, 
    },
    userImageView: {
        width: 46, 
        height: 46, 
        resizeMode: 'contain',
        marginLeft: 15,
    },
});

import Helpers from '../lib/helpers'

class Profile extends Component {

    /**
     * ## Profile class
     * Set the initial state and prepare the errorAlert
     */
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    /**
     * ### componentWillReceiveProps
     *
     * Since the Forms are looking at the state for the values of the
     * fields, when we we need to set them
     */
    componentWillReceiveProps(nextProps) {

    }

    /**
     * ### componentDidMount
     *
     * During Hot Loading, when the component mounts due the state
     * immediately being in a "logged in" state, we need to just set the
     * form fields.  Otherwise, we need to go fetch the fields
     */
    componentDidMount() {

    }

    _onPressGenderInput() {
        this.genderPicker.toggle();
    }

    _onChangeGender(value) {
        this.props.actions.onProfileFormFieldChange('gender', value);
        this.setState(
            {value}
        );
    }

    _onPressNationalityInput() {
        this.nationalityPicker.toggle();
    }

    _onChangeNationality(value) {
        this.props.actions.onProfileFormFieldChange('nationality', value);
        this.setState(
            {value}
        );
    }

    _onClickAvatar() {
        this.props.actions.dispatchLoadingAvatarRequest();

        /**
         * The first arg will be the options object for customization, the second is
         * your callback which sends object: response.
         *
         * See the README for info about the response
         */
        ImagePickerManager.showImagePicker(imagePickerManagerOptions, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                // console.log('User cancelled image picker');
                this.props.actions.dispatchLoadingAvatarSuccess();
            }
            else if (response.error) {
                // console.log('ImagePickerManager Error: ', response.error);
                this.props.actions.dispatchLoadingAvatarFailure(response.error);
            }
            else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // console.log(this, response.data);

                const uri = 'data:image/jpeg;base64,' + response.data;
                const source = {uri: uri, isStatic: true};

                this.props.actions.onProfileFormFieldChange('avatar', uri);
                this.setState(
                    {source}
                );

                this.props.actions.dispatchLoadingAvatarSuccess();
            }
        });
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
        /**
         * Wrap the form with the scrollView and append button.
         */
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <StatusBar
                    barStyle="default"
                />
                <View style={{width: width-40, height: 50, marginLeft: 20, marginTop: 20}}>
                    <Text style={{fontFamily: 'Roboto-Regular', fontSize: 14, color: '#9B9B9B'}}>
                        Active
                    </Text>
                </View>
                <View style={{width: width-40, marginLeft: 20, marginTop: 20, flexDirection: 'row'}}>
                    <View>
                        <Image source={Green_Icon} style={{width: 46, height: 46, resizeMode: 'contain'}}/>
                    </View>
                    <View style={{marginLeft: 20}}>
                        <Text style={{fontFamily: 'Roboto-Regular', fontSize: 16, color: '#000000'}}>
                            Marketing Team
                        </Text>
                        <ScrollView horizontal={true} contentContainerStyle={styles.userScrollView}>
                            <TouchableOpacity style={{width: 46, height: 46}}>
                                <Image source={Blue_Icon} style={{width: 46, height: 46, resizeMode: 'contain'}}/>    
                            </TouchableOpacity>
                            <Image source={User11_Icon} style={styles.userImageView}/>
                            <Image source={User12_Icon} style={styles.userImageView}/>
                            <Image source={User13_Icon} style={styles.userImageView}/>
                        </ScrollView>
                    </View>
                </View>
                <View style={{width: width-40, marginLeft: 20, marginTop: 20, flexDirection: 'row'}}>
                    <View>
                        <Image source={Gray_Icon} style={{width: 46, height: 46, resizeMode: 'contain'}}/>
                    </View>
                    <View style={{marginLeft: 20}}>
                        <Text style={{fontFamily: 'Roboto-Regular', fontSize: 16, color: '#000000'}}>
                            Christmas Fair Team
                        </Text>
                        <ScrollView horizontal={true} contentContainerStyle={styles.userScrollView}>
                            <TouchableOpacity style={{width: 46, height: 46}}>
                                <Image source={Blue_Icon} style={{width: 46, height: 46, resizeMode: 'contain'}}/>    
                            </TouchableOpacity>
                            <Image source={User14_Icon} style={styles.userImageView}/>
                            <Image source={User15_Icon} style={styles.userImageView}/>
                            <Image source={User16_Icon} style={styles.userImageView}/>
                            <Image source={User17_Icon} style={styles.userImageView}/>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

reactMixin(Profile.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
