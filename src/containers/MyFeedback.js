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
 * Immutable
 */
import Immutable from 'immutable';

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

var {height, width} = Dimensions.get('window');
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;

import Separator from '../components/Separator';

const Plus_Icon =  require('../images/newimages/plusquestion.png');
const UpArrow_Icon =  require('../images/newimages/uparrow.png');
const UpHand_Icon =  require('../images/newimages/uphand.png');
const DownHand_Icon =  require('../images/newimages/downhand.png');

/**
 * The actions we need
 */
import * as appHistoryActions from '../reducers/appHistory/appHistoryActions';
import * as profileActions from '../reducers/profile/profileActions';
import * as globalActions from '../reducers/global/globalActions';

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
    const creators = Immutable.Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();

    return {
        actions: bindActionCreators(creators, dispatch),
        dispatch
    };
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upperView: {
        width: width,
        height: height-20-45-50-49,
        backgroundColor: 'white'
    },
    footerView: {
        width: width,
        height: 50,
        backgroundColor: '#3F51B5',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    scrollView: {
        width: width-20,
        marginLeft: 10,
        marginTop: 10,
    },
    plusIcon: {
        width: 14, 
        height: 14, 
        resizeMode: 'contain'
    },
    questionText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: '#F8F9FA', 
        marginLeft: 10
    },
    separatorView: {
        width: width-20, 
        height: 50, 
        justifyContent: 'center', 
        flexDirection: 'row'
    },
    separatorTextView: {
        width: 100, 
        height: 50, 
        justifyContent: 'center'
    },
    separatorText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: '#787A80'
    },
    separatorLineView: {
        width: width-20-100, 
        height: 50, 
        justifyContent: 'center'
    },
    recurView: {
        width: width-20, 
        height: 122, 
        backgroundColor: '#FF5722',
        marginTop: 10,
        shadowColor: '#000000', 
        shadowOpacity: 0.8, 
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 }, 
    },
    individualView: {
        width: width-20, 
        height: 122, 
        backgroundColor: '#2196F3',
        marginTop: 10,
        shadowColor: '#000000', 
        shadowOpacity: 0.8, 
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 }, 
    },
    recurCommentText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 17,
        color: '#F8F9FA', 
        marginTop: 10, 
        marginLeft: 10,
    },
    responseView: {
        width: (width-2)/2,
    },
    responseScoreText: {
        fontFamily: 'Roboto-Bold', 
        fontSize: 44, 
        color: 'white', 
        marginTop: 10, 
        marginLeft: 10
    },
    responseText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 14,
        color: '#F8F9FA', 
        marginLeft: 10
    },
    scoreView: {
        width: (width-2)/2-30, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        height: 80
    },
    upperArrowView: {
        height: 70, 
        justifyContent: 'center'
    },
    arrowImage: {
        width: 16, 
        height: 10, 
        resizeMode: 'contain'
    },
    countView: {
        height: 80,
        justifyContent: 'center',
        marginLeft: 5,
    },
    uphandIcon: {
        width: 22, 
        height: 20, 
        resizeMode: 'contain'
    },
    countText: {
        fontFamily: 'Roboto-Bold', 
        fontSize: 44, 
        color: '#F8F9FA'
    },
});

class MyFeedback extends Component {

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

    /**
     * ### render
     * display the form wrapped with the header and button
     */
    render() {
        /**
         * Wrap the form with the scrollView and append button.
         */
        return (
            <View style={styles.container}>
                <View style={styles.upperView}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.separatorView}>
                            <View style={styles.separatorTextView}>
                                <Text style={styles.separatorText}>
                                    Recurring
                                </Text>
                            </View>
                            <View style={styles.separatorLineView}>
                                <Separator color={"#787A80"} width={width-20-100} height={1}/>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.recurView}>
                            <Text style={styles.recurCommentText}>
                                How productive was the team today?
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.responseView}>
                                    <Text style={styles.responseScoreText}>
                                        9/10
                                    </Text>
                                    <Text style={styles.responseText}>
                                        RESPONDED
                                    </Text>
                                </View>
                                <View style={styles.scoreView}>
                                    <View style={styles.upperArrowView}>
                                        <Image source={UpArrow_Icon} style={styles.arrowImage}/>
                                    </View>
                                    <Text style={styles.responseScoreText}>
                                        4.5/5
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.recurView}>
                            <Text style={styles.recurCommentText}>
                                How enthusiast was the team today?
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.responseView}>
                                    <Text style={styles.responseScoreText}>
                                        7/10
                                    </Text>
                                    <Text style={styles.responseText}>
                                        RESPONDED
                                    </Text>
                                </View>
                                <View style={styles.scoreView}>
                                    <View style={styles.upperArrowView}>
                                        <Image source={UpArrow_Icon} style={styles.arrowImage}/>
                                    </View>
                                    <Text style={styles.responseScoreText}>
                                        3.5/5
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{marginTop: 15}}>
                            <View style={styles.separatorView}>
                                <View style={styles.separatorTextView}>
                                    <Text style={styles.separatorText}>
                                        Individual
                                    </Text>
                                </View>
                                <View style={styles.separatorLineView}>
                                    <Separator color={"#787A80"} width={width-20-100} height={1}/>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.individualView}>
                            <Text style={styles.recurCommentText}>
                                Should we repeat today’s workshop?
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.responseView}>
                                    <Text style={styles.responseScoreText}>
                                        5/6
                                    </Text>
                                    <Text style={styles.responseText}>
                                        RESPONDED
                                    </Text>
                                </View>
                                <View style={styles.scoreView}>
                                    <View style={styles.countView}>
                                        <Image source={UpHand_Icon} style={styles.uphandIcon}/>
                                    </View>
                                    <View style={styles.countView}>
                                        <Text style={styles.countText}>
                                            3
                                        </Text>
                                    </View>
                                    <View style={styles.countView}>
                                        <Image source={DownHand_Icon} style={styles.uphandIcon}/>
                                    </View>
                                    <View style={styles.countView}>
                                        <Text style={styles.countText}>
                                            2
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.individualView}>
                            <Text style={styles.recurCommentText}>
                                Did you enjoy working this week?
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.responseView}>
                                    <Text style={styles.responseScoreText}>
                                        7/8
                                    </Text>
                                    <Text style={styles.responseText}>
                                        RESPONDED
                                    </Text>
                                </View>
                                <View style={styles.scoreView}>
                                    <View style={styles.countView}>
                                        <Image source={UpHand_Icon} style={styles.uphandIcon}/>
                                    </View>
                                    <View style={styles.countView}>
                                        <Text style={styles.countText}>
                                            5
                                        </Text>
                                    </View>
                                    <View style={styles.countView}>
                                        <Image source={DownHand_Icon} style={styles.uphandIcon}/>
                                    </View>
                                    <View style={styles.countView}>
                                        <Text style={styles.countText}>
                                            3
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: width, height: 50}}>
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.footerView}>
                    <Image source={Plus_Icon} style={styles.plusIcon}/>
                    <Text style={styles.questionText}>
                        NEW QUESTION
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFeedback);
