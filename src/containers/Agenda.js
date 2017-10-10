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

const Schedule_Icon =  require('../images/newimages/schedule_icon.png');

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
        flex: 1,
        marginTop: NAVBAR_PADDING
    },
});

class Agenda extends Component {
    /**
     * ## Tools class
     * Set the initial state
     */
    constructor(props) {
        super(props);

        this.state = {
            setSelectedSegment: 0,
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
            // TODO: This sends an object rather than string
            title: "Budget Review",
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
        if (this.state.setSelectedSegment == 0){
            return (
                <View style={styles.listViewContainer}>
                    <StatusBar barStyle="light-content"/>
                    <CustomSegmentedControl
                        style={{
                            backgroundColor: '#FF5722',   
                            height: 45,
                        }}
                        textValues={['Agenda','Discuss']}
                        selected={0}
                        segmentedStyle={{
                            selectedLineHeight: 3,
                            fontSize: 16,
                            fontWeight: 'bold',
                            segmentBackgroundColor: '#FF5722',
                            segmentTextColor: '#FFFFFF',
                            segmentHighlightTextColor: '#FFFFFF',
                            selectedLineColor: '#FFFFFF',
                            selectedLineAlign: 'bottom', 
                            selectedLineMode: 'full',
                            selectedTextColor: '#FFFFFF',                                                  
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
                    <AgendaOne></AgendaOne>
                </View>
            );
        }else{
            return (
                <View style={styles.listViewContainer}>
                    <StatusBar barStyle="light-content"/>
                    <CustomSegmentedControl 
                        style={{
                            backgroundColor: '#FF5722',   
                            height: 45,
                        }}
                        textValues={['Agenda','Discuss']}
                        selected={0}
                        segmentedStyle={{
                            selectedLineHeight: 3,
                            fontSize: 16,
                            fontWeight: 'bold',
                            segmentBackgroundColor: '#FF5722',
                            segmentTextColor: '#FFFFFF',
                            segmentHighlightTextColor: '#FFFFFF',
                            selectedLineColor: '#FFFFFF',
                            selectedLineAlign: 'bottom', 
                            selectedLineMode: 'full',
                            selectedTextColor: '#FFFFFF',                                                  
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
                    <AgendaTwo></AgendaTwo>
                </View>
            );            
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
