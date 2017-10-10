/**
 * # StaticSlideItem.js
 *
 */
'use strict';
/**
 * ## Import
 *
 */
import React, {PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    Platform,
    InteractionManager,
    ActivityIndicator
}
    from 'react-native';

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

let componentLookup = require('../static/lookup').default;

/**
 * ## Styles
 */
const PADDING = 20;
const DEFAULT_BORDER_RADIUS = 0;
const AVERAGE_FIELD_HEIGHT = 75;
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const styles = StyleSheet.create({
    card: {
        marginBottom: PADDING / 2,
        marginLeft: PADDING / 4,
        marginRight: PADDING / 4,
        paddingTop: PADDING / 2,
        paddingBottom: PADDING / 2,
        paddingLeft: PADDING,
        paddingRight: PADDING,
        borderRadius: DEFAULT_BORDER_RADIUS,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: PADDING / 16,
        shadowOffset: {
            height: PADDING / 12,
            width: 0
        },
        elevation: 5
    }
});

var ImmutablePropTypes = require('react-immutable-proptypes');

var StaticSlideItem = React.createClass({

    /**
     * ## StaticSlideItem class
     */
    propTypes: {
        id: PropTypes.string,
        rootFolder: PropTypes.string,
        file: PropTypes.string,
        data: ImmutablePropTypes.map,
        onToolFieldChange: PropTypes.func,
        position: PropTypes.number,
        thisPrimaryColour: PropTypes.string,
        thisSecondaryColour: PropTypes.string,
        currentUser: PropTypes.object,
        currentTab: PropTypes.number,
        getCurrentTab: PropTypes.func
    },

    _requiredPropsPresent() {
        return true;
    },

    _componentHasChanged(nextProps, nextState) {
        return true;
    },

    shouldComponentUpdate(nextProps, nextState) {
        return this._componentHasChanged(nextProps, nextState);
    },

    getInitialState: function () {
        return {
            loading: true
        };
    },

    _onComponentWillReceiveProps(nextProps) {
        if (this._requiredPropsPresent()) {
            if (this.state.loading) this.setState({
                loading: false
            });
        }
    },
    componentWillReceiveProps(nextProps) {
        // console.log("StaticSlideItem componentWillReceiveProps: ", nextProps);

        if (nextProps.saveIconState === "save") {
            if (Platform.OS === 'ios') {
                InteractionManager.runAfterInteractions(() => {
                    this._onComponentWillReceiveProps(nextProps);
                });
            } else {
                this._onComponentWillReceiveProps(nextProps);
            }
        }
    },

    _onComponentDidMount() {
        this.setTimeout(() => {
            if (this._requiredPropsPresent()) {
                if (this.state.loading) this.setState({
                    loading: false
                });
            }
        }, 350);
    },
    componentDidMount() {
        if (Platform.OS === 'ios') {
            InteractionManager.runAfterInteractions(() => {
                this._onComponentDidMount();
            });
        } else {
            this._onComponentDidMount();
        }
    },

    /**
     * ### render
     * display the form wrapped with the header and button
     */
    render() {
        var backgroundColour = 'white';
        let loadingView = <View style={{
            flex: 1,
            flexDirection: 'row',
            height: AVERAGE_FIELD_HEIGHT
        }}>
            <View style={{flex: 1, flexDirection: 'column', alignSelf: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={DARK_GREY_COLOUR}
                                   animating={true}
                                   style={{opacity: 1}}
                />
            </View>
        </View>;

        const Component = componentLookup[this.props.rootFolder][this.props.file];
        let content = this.state.loading ? loadingView : <Component {...this.props}/>;

        return (
            <View
                style={[styles.card, {backgroundColor: backgroundColour}]}
            >
                {content}
            </View>
        );
    }

});

reactMixin(StaticSlideItem.prototype, TimerMixin);

module.exports = StaticSlideItem;
