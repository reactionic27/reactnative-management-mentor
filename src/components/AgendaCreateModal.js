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
    Modal,
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {CustomSegmentedControl} from 'react-native-custom-segmented-control';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../components/scrollableTabView/TabBar'

import FormButton from '../components/FormButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../components/BackButton';
import Separator from '../components/Separator';

var TimerMixin = require('react-timer-mixin');
const timer = require('react-native-timer');
var mixins = TimerMixin;
/**
 * Import Containers
 */

import AgendaOne from '../containers/AgendaOne';
import AgendaTwo from '../containers/AgendaTwo';
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

const Close_Icon =  require('../images/newimages/close.png');

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
        width: width, 
        height: height, 
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',    
    },
    entireView: {
        width: width-40, 
        backgroundColor: '#FF5722'
    },
    closeView: {
        width: width-60, 
        height: 20, 
        marginLeft: 10, 
        alignItems: 'flex-end', 
        marginTop: 10,
    },
    closeTouchView: {
        width: 14, 
        height: 44
    },
    closeIcon: {
        width: 14, 
        height: 14, 
        resizeMode: 'contain'
    },
    titleView: {
        width: width-60, 
        height: 30, 
        marginLeft: 10, 
        alignItems: 'flex-start', 
        marginTop: 10,
    },
    titleStyle: {
        fontFamily: 'Roboto-Bold', 
        fontSize: 22, 
        color: '#FFFFFF'
    },
    textContentView: {
        width: width-60, 
        marginLeft: 10, 
        marginTop: 15
    },
    contentTextStyle: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 14, 
        color: '#FFFFFF'
    },
    spaceView: {
        height: 30, 
        backgroundColor: '#FF5722'
    }
});

class AgendaCreateModal extends Component {
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

	componentWillUnmount() {

	}

    _renderBackButton() {
        return <BackButton
            scene={this.props}
            onPress={() => {Actions.pop();}}
        />;
    }

    /**
     * ### render
     * display the form wrapped with the header and button
     */
    render() {
        const { visible, closeModal, } = this.props;
        return (
			<Modal
				animationType={"none"}
				transparent={true}
				visible={visible}
				onRequestClose={() => closeModal()}
			>
                <View style={styles.listViewContainer}>
                    <View style={styles.entireView}>
                        <View style={styles.closeView}>
                            <TouchableOpacity style={styles.closeTouchView}
                                              onPress={() => closeModal ()}
                            >
                                <Image source={Close_Icon} style={styles.closeIcon}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={styles.titleStyle}>
                                Creating An Agenda
                            </Text>
                        </View>
                        <View style={styles.textContentView}>
                            <Text style={styles.contentTextStyle}>
                                Weekly team meetings should generally focus on issues that are affecting team productivy and enthusiasm. If these measures have been high, also take the time to congratulate the team. This is also a good time to bring up any news or announcements.
                            </Text>
                        </View>
                        <View style={styles.textContentView}>
                            <Text style={styles.contentTextStyle}>
                                Before setting you argenda ont he next screen, have a think about how the team reported on productivity and enthusiasm over the week, what are the issues that affected these measures and what actions can be taken to resolve these issues.
                            </Text>
                        </View>
                        <View style={styles.spaceView}>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaCreateModal);