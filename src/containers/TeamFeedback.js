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

import Separator from '../components/Separator';

const StarUser1_Icon =  require('../images/newimages/staruser1.png');
const StarUser2_Icon =  require('../images/newimages/staruser2.png');
const StarUser3_Icon =  require('../images/newimages/staruser3.png');

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
        height: height,
    },
    scrollView: {
        width: width-20,
        marginLeft: 10,
        marginTop: 10,
    },
    separatorView: {
        width: width-20, 
        height: 50, 
        justifyContent: 'center', 
        flexDirection: 'row'
    },
    separatorTextView: {
        width: 70, 
        height: 50, 
        justifyContent: 'center'
    },
    separatorText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 15, 
        color: '#787A80'
    },
    separatorLineView: {
        width: width-20-70, 
        height: 50, 
        justifyContent: 'center'
    },
    listView: {
        width: width-20,
    },
    cellView: {
        flexDirection: 'row', 
        width: width, 
        height: 80
    },
    userIconView: {
        width: 80, 
        height: 80, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    userIcon: {
        width: 74, 
        height: 67, 
        resizeMode: 'contain'
    },
    textView: {
        width: width-20-80, 
        height: 80,
        justifyContent: 'center',
        marginLeft: 10
    },
    nameText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 14, 
        color: '#9CA1A6'
    },
    earningText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 14, 
        color: '#787A80'
    },
    countText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: 14, 
        color: '#3F51B5',
        marginLeft: 15
    },
    horizontalView: {
        flexDirection: 'row', 
        marginTop: 5
    }
});

class TeamFeedback extends Component {

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
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.separatorView}>
                        <View style={styles.separatorTextView}>
                            <Text style={styles.separatorText}>
                                Team
                            </Text>
                        </View>
                        <View style={styles.separatorLineView}>
                            <Separator color={"#787A80"} width={width-20-70} height={1}/>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.cellView}>
                            <View style={styles.userIconView}>
                                <Image source={StarUser1_Icon} style={styles.userIcon}/>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.nameText}>
                                    Oliver Costa
                                </Text>
                                <View style={styles.horizontalView}>
                                    <Text style={styles.earningText}>
                                        7 Kudos earned this week
                                    </Text>
                                    <Text style={styles.countText}>
                                        +3
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cellView}>
                            <View style={styles.userIconView}>
                                <Image source={StarUser2_Icon} style={styles.userIcon}/>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.nameText}>
                                    James Merritt
                                </Text>
                                <View style={styles.horizontalView}>
                                    <Text style={styles.earningText}>
                                        2 Kudos earned this week
                                    </Text>
                                    <Text style={styles.countText}>
                                        +1
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cellView}>
                            <View style={styles.userIconView}>
                                <Image source={StarUser3_Icon} style={styles.userIcon}/>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.nameText}>
                                    Liam Carter-Hawkins
                                </Text>
                                <View style={styles.horizontalView}>
                                    <Text style={styles.earningText}>
                                        2 Kudos earned this week
                                    </Text>
                                    <Text style={styles.countText}>
                                        +1
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamFeedback);
