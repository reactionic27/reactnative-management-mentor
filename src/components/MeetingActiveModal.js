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

const LeftChevron_Icon =  require('../images/newimages/leftchevron.png');
const Minus_Icon =  require('../images/newimages/minustimer.png');
const Plus_Icon =  require('../images/newimages/plustimer.png');
const Pause_Icon =  require('../images/newimages/pauseicon.png');
const User1_Icon =  require('../images/newimages/user1.png');
const User2_Icon =  require('../images/newimages/user2.png');
const User3_Icon =  require('../images/newimages/user3.png');
const Start_Icon =  require('../images/newimages/start.png');

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
        backgroundColor: 'white'    
    },
    headerView: {
        width: width, 
        height: 200, 
        backgroundColor: '#FF5722',
    },
    navView: {
        width: width, 
        height: 60, 
        flexDirection: 'row',
        paddingTop: 10,
    },
    backbuttonView: {
        width: 70, 
        height: 60, 
        paddingLeft: 15, 
        paddingTop: 20
    },
    navTitleView: {
        width: width-70-70, 
        height: 60, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    navTitleStyle: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 17, 
        color: 'white', 
    },
    navRightView: {
        width: 70, 
        height: 60, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    navRightTextStyle: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 14, 
        color: 'white'
    },
    timeView: {
        width: width, 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    timeStyle: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 28, 
        color: 'white'
    },
    pauseTimerView: {
        width: width, 
        height: 100, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    minusIcon: {
        width: 41, 
        height: 41, 
        resizeMode: 'contain'
    },
    pauserButton: {
        width: 65, 
        height: 65, 
        marginLeft: 15
    },
    pauseIcon: {
        width: 65, 
        height: 65, 
        resizeMode: 'contain',
    },
    plusIcon: {
        width: 41, 
        height: 41,
        resizeMode: 'contain', 
        marginLeft: 15
    },
    reviewCommentView: {
        width: width-40, 
        height: 100, 
        marginLeft: 20, 
        marginTop: 10
    },
    commentTitle: {
        fontFamily: 'Roboto-Bold', 
        fontSize: 17, 
        color: 'black'
    },
    commentContent: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: 'black', 
        width: width-40, 
        marginTop: 5
    },
    userScrollView: {
        height: 60, 
        marginTop: 10, 
        width: width-30, 
        marginLeft: 15,
    },
    userImageView: {
        width: 60, 
        height: 60, 
        resizeMode: 'contain'
    },
    separatorView: {
        width: width-40, 
        height: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginLeft: 20
    },
    startbuttonView: {
        height: 50, 
        backgroundColor: '#FF5722', 
        justifyContent:'center', 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    startbuttonText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: '#FFFFFF', 
        marginLeft: 10,
    },
    textInput: {
        width: width-40,
        height: height-510,
        marginLeft: 20,
        backgroundColor: '#F8F9FA',
        fontSize: 15,
        paddingLeft: 10,
        paddingTop: 10,
    }
});

class MeetingActiveModal extends Component {
    /**
     * ## Tools class
     * Set the initial state
     */
    constructor(props) {
        super(props);

        this.state = {
            reviewhours: "01",
            reviewminutes: "22",
            reviewseconds: "41",
            expensehours: "00",
            expenseminutes: "07",
            expenseseconds: "59",
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
            title: "Monthly expenses review",
            renderBackButton: this._renderBackButton.bind(this)
        });

        if (Platform.OS === 'ios') {
            InteractionManager.runAfterInteractions(() => {
                this._onComponentDidMount();
            });
        } else {
            this._onComponentDidMount();
        }
        this.timer = mixins.setInterval( () => { 
			if (parseInt(this.state.reviewseconds)+ 1 < 10){
				this.setState({
					reviewseconds:  "0" + (parseInt(this.state.reviewseconds)+ 1).toString()
				})
			}else {
				this.setState({
					reviewseconds: parseInt(this.state.reviewseconds)+ 1
				})
			}
            
			if(this.state.reviewseconds >= "60"){
                if (parseInt(this.state.reviewminutes)+ 1 < 10){
                    this.setState({
                        reviewminutes: "0" + (parseInt(this.state.reviewminutes)+1).toString(),
                        reviewseconds: "00",
                    })
                }else{
                    this.setState({
                        reviewminutes: (parseInt(this.state.reviewminutes)+1).toString(),
                        reviewseconds: "00",
                    })
                }
			}
			if(this.state.reviewminutes >= "60"){
                if (parseInt(this.state.reviewhours)+ 1 < 10){
                    this.setState({
                        reviewhours: "0" + (parseInt(this.state.reviewhours)+1).toString(),
                        reviewminutes: "00",
                    })
                }else{
                    this.setState({
                        reviewhours: (parseInt(this.state.reviewhours)+1).toString(),
                        reviewminutes: "00",
                    })
                }
			}


			if (parseInt(this.state.expenseseconds)+ 1 < 10){
				this.setState({
					expenseseconds:  "0" + (parseInt(this.state.expenseseconds)+ 1).toString()
				})
			}else {
				this.setState({
					expenseseconds: parseInt(this.state.expenseseconds)+ 1
				})
			}

			if(this.state.expenseseconds >= "60"){
                if (parseInt(this.state.expenseminutes)+ 1 < 10){
                    this.setState({
                        expenseminutes: "0" + (parseInt(this.state.expenseminutes)+1).toString(),
                        expenseseconds: "00",
                    })
                }else{
                    this.setState({
                        expenseminutes: (parseInt(this.state.expenseminutes)+1).toString(),
                        expenseseconds: "00",
                    })
                }
			}
			if(this.state.expenseminutes >= "60"){
                if (parseInt(this.state.expensehours)+ 1 < 10){
                    this.setState({
                        expensehours: "0" + (parseInt(this.state.expensehours)+1).toString(),
                        expenseminutes: "00",
                    })
                }else{
                    this.setState({
                        expensehours: (parseInt(this.state.expensehours)+1).toString(),
                        expenseminutes: "00",
                    })
                }
			}
		}, 1000);	        
    }

	componentWillUnmount() {
		mixins.clearInterval(this.timer);
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
				animationType={"slide"}
				transparent={true}
				visible={visible}
				onRequestClose={() => closeModal()}
			>
                <View style={styles.listViewContainer}>
                    <StatusBar barStyle="light-content"/>
                    <View style={{width: width, height: height-50}}>
                        <View style={styles.headerView}>
                            <View style={styles.navView}>
                                <View style={styles.backbuttonView}>
                                    <TouchableOpacity style={{width: 12, height: 12,}}
                                                    onPress={() => closeModal ()}
                                    >
                                        <Image source={LeftChevron_Icon} style={{width: 12, height: 21, resizeMode: 'contain'}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.navTitleView}>
                                    <Text style={styles.navTitleStyle} ellipsizeMode="tail" numberOfLines={1}>
                                        Monthly expenses review
                                    </Text>
                                </View>
                                <View style={styles.navRightView}>
                                    <Text style={styles.navRightTextStyle}>
                                        {this.state.reviewhours.toString () + ':' + this.state.reviewminutes.toString () + ':' + this.state.reviewseconds.toString ()}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.timeView}>
                                <Text style={styles.timeStyle}>
                                    {this.state.expensehours.toString () + ':' + this.state.expenseminutes.toString () + ':' + this.state.expenseseconds.toString ()}
                                </Text>
                            </View>
                            <View style={styles.pauseTimerView}>
                                <Image source={Minus_Icon} style={styles.minusIcon}/>
                                <TouchableOpacity style={styles.pauserButton}>
                                    <Image source={Pause_Icon} style={styles.pauseIcon}/>
                                </TouchableOpacity>
                                <Image source={Plus_Icon} style={styles.plusIcon}/>
                            </View>
                        </View>
                        <View style={styles.reviewCommentView}>
                            <Text style={styles.commentTitle}>
                                Monthly expenses review
                            </Text>
                            <Text style={styles.commentContent}>
                                Objective: Ensure the monthly expenses are within budget accounting for the increased spending after funding
                            </Text>
                        </View>
                        <View style={styles.separatorView}>
                            <View style={{width: 70}}>
                                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15, color: '#757575'}}>
                                    Assigned
                                </Text>
                            </View>
                            <Separator color={"#DFDCE3"} width={width-110} height={1} style={{marginLeft: 10}}/>
                        </View>                    
                        <View style={{height: 80}}>
                            <ScrollView horizontal={true} contentContainerStyle={styles.userScrollView}>
                                <Image source={User1_Icon} style={styles.userImageView}/>
                                <Image source={User2_Icon} style={styles.userImageView}/>
                                <Image source={User3_Icon} style={styles.userImageView}/>
                            </ScrollView>
                        </View>
                        <View style={styles.separatorView}>
                            <View style={{width: 70}}>
                                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15, color: '#757575'}}>
                                    Notes
                                </Text>
                            </View>
                            <Separator color={"#DFDCE3"} width={width-110} height={1} style={{marginLeft: 10}}/>
                        </View>            
                        <View style={{width: width, marginTop: 20}}>
                            <TextInput placeholder="Write your meeting notes here…"
                                       placeholderTextColor="#787A80"
                                       style={styles.textInput}
                                       multiline={true}
                            />
                        </View>    
                    </View>    
                    <TouchableOpacity style={styles.startbuttonView}
                                      onPress={() => closeModal ()}
                    >
                        <Image source={Start_Icon} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                        <Text style={styles.startbuttonText}>
                            DONE
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingActiveModal);