/**
 * # ToolListItem.js
 *
 */
'use strict';
/**
 * ## Imports
 *
 */
import React, {PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    Image,
    TouchableOpacity
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

/**
 * Router
 */
import {
    Actions,
} from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/MaterialIcons';
const Button = require('apsl-react-native-button');

/**
 * ## Styles
 */
import BackgroundImage from '../components/BackgroundImage'
import Colour from '../lib/colour'
var globalStyles = require('../components/Stylesheet');
const PADDING = 20;
const FONT_SIZE = 14;
const styles = StyleSheet.create({
    toolListRowOuter: {
        flexDirection: 'row',
        height: height / 5,
        marginLeft: PADDING / 4,
        marginRight: PADDING / 4,
        marginBottom: PADDING / 2,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: PADDING / 16,
        shadowOffset: {
            height: PADDING / 12,
            width: 0
        },
        elevation: 5,
        backgroundColor: 'white'
    },
    toolListRow: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: PADDING / 2,
        paddingBottom: PADDING / 2,
        paddingLeft: PADDING,
        paddingRight: PADDING,
        marginBottom: 0
    },
    listViewRowIcon: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'transparent',
        color: 'white'
    },
    listViewRowInfoIcon: {
        position: 'absolute',
        top: 1,
        left: 1,
        backgroundColor: 'transparent',
        color: 'white'
    },
    listViewRowTitle: {
        position: 'absolute',
        top: PADDING / 4,
        right: 0,
        textAlign: 'right',
        fontSize: FONT_SIZE + 4,
        lineHeight: Platform.OS === 'ios' ? FONT_SIZE + 4 : FONT_SIZE + 10,
        backgroundColor: 'transparent',
        color: 'white'
    },
    listViewRowButton: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listViewRowButtonText: {
        fontSize: FONT_SIZE + 2
    }
});

var ToolListItem = React.createClass({
    propTypes: {
        tool: PropTypes.object,
        thisPrimaryColour: PropTypes.string
    },

    getInitialState: function () {
        return {
            tool: this.props.tool,
            thisPrimaryColour: this.props.thisPrimaryColour
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            tool: nextProps.tool
        });
    },

    render: function () {
        let icon = this.state.tool.icon ?
            <Icon style={styles.listViewRowIcon}
                  name={this.state.tool.icon}
                  size={PADDING * (5 / 2)}
            /> : <View/>;

        let text = this.state.tool.name ? <Text
            style={[globalStyles.serifRegularText, styles.listViewRowTitle]}>
            {this.state.tool.name}
        </Text> : <Text/>;

        let button = this.state.tool.id ? <View style={{flex: 1}}>
            <TouchableOpacity
                style={styles.listViewRowButton}
                onPress={() => {
                            Actions.ToolSaveShow({
                                toolId: this.state.tool.id
                            });
                        }}
                activeOpacity={0.75}
            >
                <Image
                    source={require('../images/iLeaderArrow.png')}
                    resizeMode='cover'
                    style={{
                            height: 18,
                            width: 18
                        }}
                />
            </TouchableOpacity>
        </View> : <View/>;

        let header = this.state.tool.colour && this.state.tool.backgroundImage ?
            <View style={[styles.toolListRow, {backgroundColor: this.state.tool.colour}]}>
                <BackgroundImage
                    source={{uri: this.state.tool.backgroundImage}}
                    opacity={0.3}
                />
                <BackgroundImage
                    opacity={0.2}
                />

                <View style={{flex: 1}}>
                    <Icon style={styles.listViewRowInfoIcon}
                          name="info-outline" size={FONT_SIZE + 10}/>
                    {icon}
                </View>
                <View style={{flex: 2}}>
                    {text}
                </View>
            </View> : <View/>;

        return <View style={styles.toolListRowOuter}>
            {header}
            {button}
        </View>
    }
});

module.exports = ToolListItem;
