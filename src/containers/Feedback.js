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
 * import container
 */
import MyFeedback from './MyFeedback';
import TeamFeedback from './TeamFeedback';

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
    ActivityIndicator
}
    from 'react-native';
const Item = Picker.Item;

var {height, width} = Dimensions.get('window');

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {CustomSegmentedControl} from 'react-native-custom-segmented-control';

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

var globalStyles = require('../components/Stylesheet');
var styles = StyleSheet.create({
    listViewContainer: {
        marginTop: 20,
    },
});

import Helpers from '../lib/helpers'

class Feedback extends Component {

    /**
     * ## Profile class
     * Set the initial state and prepare the errorAlert
     */
    constructor(props) {
        super(props);
        this.state = {
            setSelectedSegment: 0,
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
        if (this.state.setSelectedSegment == 0){
            return (
                <View style={styles.listViewContainer}>
                    <StatusBar barStyle="default"/>
                    <CustomSegmentedControl
                        style={{
                            backgroundColor: '#FFFFFF',   
                            height: 45,
                            borderBottomWidth: 1,
                        }}
                        textValues={['Feedback','My Team']}
                        selected={0}
                        segmentedStyle={{
                            selectedLineHeight: 3,
                            fontSize: 16,
                            fontWeight: 'bold',
                            segmentBackgroundColor: '#FFFFFF',
                            segmentTextColor: '#787A80',
                            segmentHighlightTextColor: '#3F51B5',
                            selectedLineColor: '#3F51B5',
                            selectedLineAlign: 'bottom', 
                            selectedLineMode: 'full',
                            selectedTextColor: '#3F51B5',                                                  
                            selectedLinePaddingWidth: 115,
                            segmentFontFamily: 'Roboto-Regular'
                        }}
                        animation={{
                            duration: 0.2,
                            damping: 0,
                            animationType: 'default',
                            initialDampingVelocity: 0
                        }}
                        onSelectedWillChange={(event)=> {
                            this.setState({
                                setSelectedSegment: event.nativeEvent.selected
                            });
                        }}
                    />
                    <MyFeedback/>
                </View>
            );
        }else{
            return (
                <View style={styles.listViewContainer}>
                    <StatusBar barStyle="default"/>
                    <CustomSegmentedControl 
                        style={{
                            backgroundColor: '#FF5722',   
                            height: 45,
                            borderBottomWidth: 1,
                        }}
                        textValues={['Feedback','My Team']}
                        selected={0}
                        segmentedStyle={{
                            selectedLineHeight: 3,
                            fontSize: 16,
                            fontWeight: 'bold',
                            segmentBackgroundColor: '#FFFFFF',
                            segmentTextColor: '#787A80',
                            segmentHighlightTextColor: '#3F51B5',
                            selectedLineColor: '#3F51B5',
                            selectedLineAlign: 'bottom', 
                            selectedLineMode: 'full',
                            selectedTextColor: '#3F51B5',                                                  
                            selectedLinePaddingWidth: 115,
                            segmentFontFamily: 'Roboto-Regular'                            
                        }}
                        animation={{
                            duration: 0.2,
                            damping: 0,
                            animationType: 'default',
                            initialDampingVelocity: 0
                        }}
                        onSelectedWillChange={(event)=> {
                            this.setState({
                                setSelectedSegment: event.nativeEvent.selected
                            });
                        }}
                    />
                    <TeamFeedback/>
                </View>
            );      
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
