import React, {PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions
}
    from 'react-native';

const TimerMixin = require('react-timer-mixin');

const Button = require('./Button');
import Icon from 'react-native-vector-icons/MaterialIcons';

import GradientOverlay from '../BackgroundImage'
const PADDING = 20;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: PADDING * 2,
        shadowOpacity: 0.4,
        shadowRadius: PADDING / 16,
        shadowOffset: {
            height: PADDING / 8,
            width: 0
        },
        borderBottomWidth: 0,
        elevation: 5
    },
    arrow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        width: PADDING * 2,
        height: PADDING * 2
    },
    arrowLeft: {
        left: 0
    },
    arrowRight: {
        right: 0
    },
    scrollViewContentContainer: {},
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabUnderline: {
        position: 'absolute',
        bottom: 0
    }
});

const TabBar = React.createClass({
    mixins: [TimerMixin],

    propTypes: {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        underlineColor: PropTypes.string,
        underlineHeight: PropTypes.number,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: View.propTypes.style,
        scrollable: PropTypes.bool,
        displayArrows: PropTypes.bool
    },

    getDefaultProps() {
        return {
            activeTextColor: 'navy',
            inactiveTextColor: 'black',
            underlineColor: 'navy',
            backgroundColor: null,
            underlineHeight: 4
        };
    },

    getInitialState() {
        const {tabs, activeTab} = this.props;
        const numberOfTabs = tabs.length;

        return {
            tabUnderlineLeft: 0,
            tabUnderlineWidth: 0,
            canLeft: activeTab !== 0,
            canRight: activeTab !== numberOfTabs.length
        };
    },

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        this.setTimeout(() => {

            const newState = this.state;
            const {tabs, scrollValue, activeTab} = nextProps;
            const numberOfTabs = tabs.length;

            if (this.props.scrollable) {
                const numberOfWidths = this.tabUnderlineWidths.length;

                // console.log(this.tabUnderlineWidths, numberOfTabs, numberOfWidths);

                if (numberOfTabs < 2) return;
                if (numberOfTabs !== numberOfWidths) return;

                let inputRange = [],
                    leftOutputRange = [],
                    totalWidth = 0;

                tabs.forEach((tab, index) => {
                    inputRange.push(index);
                    leftOutputRange.push(totalWidth);
                    totalWidth += this.tabUnderlineWidths[index];
                });

                let left = scrollValue.interpolate({
                    inputRange: inputRange,
                    outputRange: leftOutputRange,
                    extrapolate: 'clamp'
                });

                let width = scrollValue.interpolate({
                    inputRange: inputRange,
                    outputRange: this.tabUnderlineWidths,
                    extrapolate: 'clamp'
                });

                let currentLeft = leftOutputRange[activeTab - 1],
                    maxLeft = totalWidth - Dimensions.get('window').width + (this.props.displayArrows ? PADDING * 4 : 0),
                    scrollPosition = currentLeft > maxLeft ? maxLeft : currentLeft;

                this.refs.scrollView.scrollTo({x: scrollPosition});

                newState.tabUnderlineLeft = left;
                newState.tabUnderlineWidth = width;
            }

            if (this.props.displayArrows) {
                newState.canLeft = activeTab > 0;
                newState.canRight = activeTab < numberOfTabs - 1;
            }

            this.setState(newState);
        }, 350);
    },

    componentDidMount() {
        this.tabUnderlineWidths = [];
        // console.log(this.tabUnderlineWidths);
    },

    renderTabOption(name, page) {
        const isTabActive = this.props.activeTab === page;
        const {activeTextColor, inactiveTextColor, textStyle, scrollable} = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';

        let buttonStyle = {};
        if (scrollable) {
            buttonStyle = {
                paddingLeft: PADDING / 2,
                paddingRight: PADDING / 2
            };
        } else {
            const numberOfTabs = this.props.tabs.length;
            buttonStyle = {
                width: (Dimensions.get('window').width - (this.props.displayArrows ? PADDING * 4 : 0)) / numberOfTabs
            };
        }

        return <Button
            key={name}
            style={buttonStyle}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => this.props.goToPage(page)}
        >
            <View
                style={[styles.tab, this.props.tabStyle]}
                onLayout={(event) => {
                    const {width} = event.nativeEvent.layout;
                    this.tabUnderlineWidths[page] = width + PADDING;
                }}
            >
                <Text style={[{color: textColor, fontWeight}, textStyle]}>
                    {name}
                </Text>
            </View>
        </Button>;
    },

    _onClickArrow(direction) {
        //if (direction === -1 && !this.state.canLeft || direction === 1 && !this.state.canRight) return;
        if (direction == -1 && this.props.activeTab == 0) return;
        if (direction == 1 && this.props.activeTab == this.props.tabs.length-1) return;

        const {activeTab, goToPage} = this.props;
        goToPage(activeTab + direction);
    },

    render() {
        let tabUnderline = <View/>,
            tabsStyle = {};

        if (this.props.scrollable) {
            const tabUnderlineStyle = {
                height: this.props.underlineHeight,
                backgroundColor: this.props.underlineColor
            };
            tabUnderline = <Animated.View
                style={[styles.tabUnderline, tabUnderlineStyle, {
                    left: this.state.tabUnderlineLeft,
                    width: this.state.tabUnderlineWidth
                }]}/>;
        } else {
            tabsStyle = {
                width: Dimensions.get('window').width - (this.props.displayArrows ? PADDING * 4 : 0)
            };
            const numberOfTabs = this.props.tabs.length;
            const tabUnderlineStyle = {
                position: 'absolute',
                width: (Dimensions.get('window').width - (this.props.displayArrows ? PADDING * 4 : 0)) / numberOfTabs,
                height: this.props.underlineHeight,
                backgroundColor: this.props.underlineColor,
                bottom: 0
            };

            const left = this.props.scrollValue.interpolate({
                inputRange: [0, 1], outputRange: [0, (Dimensions.get('window').width - (this.props.displayArrows ? PADDING * 4 : 0)) / numberOfTabs],
            });

            tabUnderline = <Animated.View style={[tabUnderlineStyle, {left}]}/>;
        }


        let leftArrow = this.props.displayArrows ? <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => (this._onClickArrow(-1))}
                style={[styles.arrow, styles.arrowLeft, {
                        backgroundColor: 'transparent'
                    }]}
            >
                <Icon name='fast-rewind' size={20}
                      color={this.state.canLeft ? 'white' : this.props.underlineColor}
                />
            </TouchableOpacity> : <View/>,
            rightArrow = this.props.displayArrows ? <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => (this._onClickArrow(1))}
                style={[styles.arrow, styles.arrowRight, {
                        backgroundColor: 'transparent'
                    }]}
            >
                <Icon name='fast-forward' size={20}
                      color={this.state.canRight ? 'white' : this.props.underlineColor}
                />
            </TouchableOpacity> : <View/>;

        return (
            <View
                style={[styles.container, {
                    width: Dimensions.get('window').width,
                    backgroundColor: this.props.backgroundColor,
                    paddingLeft: this.props.displayArrows ? PADDING * 2 : 0,
                    paddingRight: this.props.displayArrows ? PADDING * 2 : 0
                }]}
            >
                <GradientOverlay/>
                {leftArrow}
                <ScrollView
                    ref="scrollView"
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContentContainer}
                    scrollEnabled={this.props.scrollable}
                    horizontal
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={16}
                    scrollsToTop={false}
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled
                    alwaysBounceVertical={false}
                    keyboardDismissMode="on-drag"
                >

                    <View
                        style={[styles.tabs, tabsStyle, {backgroundColor: 'transparent'}, this.props.style]}>
                        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                        {tabUnderline}
                    </View>

                </ScrollView>
                {rightArrow}
            </View>
        );
    }
});

module.exports = TabBar;
