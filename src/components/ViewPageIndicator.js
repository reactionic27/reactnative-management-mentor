'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
}
    from 'react-native';


const DOT_SIZE = 6;
const DOT_SPACE = 3;

var styles = StyleSheet.create({
    indicators: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: DOT_SIZE
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tab: {
        alignItems: 'center'
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: 'rgba(100,100,100,1)',
        marginLeft: DOT_SPACE,
        marginRight: DOT_SPACE
    },
    curDot: {
        position: 'absolute',
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: 'white',
        margin: DOT_SPACE,
        bottom: 0
    }
});

import Colour from '../lib/colour'
import Helpers from '../lib/helpers'

var ViewPageIndicator = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activePage: React.PropTypes.number,
        pageCount: React.PropTypes.number
    },

    getInitialState() {
        return {
            viewWidth: 0
        };
    },

    renderIndicator(page) {
        //var isTabActive = this.props.activePage === page;
        var thisPrimaryColour = Helpers.getPrimaryColour(this.props);
        return (
            <TouchableOpacity style={styles.tab} key={'idc_' + page} onPress={() => this.props.goToPage(page)}>
                <View style={[styles.dot, {backgroundColor: Colour.get(thisPrimaryColour).drawerHeaderTextColour}]}/>
            </TouchableOpacity>
        );
    },

    render() {
        // console.log(this.props);
        var pageCount = this.props.pageCount,
            itemWidth = DOT_SIZE + (DOT_SPACE * 2);

        //var left = offset;
        var offsetX = itemWidth * (this.props.activePage - this.props.scrollOffset),
            left = this.props.scrollValue.interpolate({
                inputRange: [0, 1], outputRange: [offsetX, offsetX + itemWidth]
            });

        var indicators = [];
        for (var i = 0; i < pageCount; i++) {
            indicators.push(this.renderIndicator(i))
        }

        var thisPrimaryColour = Helpers.getPrimaryColour(this.props);

        return (
            <View style={[styles.indicators, {backgroundColor: Colour.get(thisPrimaryColour).base}]}>
                <View style={styles.tabs}
                      onLayout={(event) => {
                          var viewWidth = event.nativeEvent.layout.width;
                          if (!viewWidth || this.state.viewWidth === viewWidth) {
                            return;
                          }
                          this.setState({
                              viewWidth: viewWidth
                          });
                      }}
                >
                    {indicators}
                    <Animated.View style={[styles.curDot, {left}]}/>
                </View>
            </View>
        );
    }
});

module.exports = ViewPageIndicator;
