/**
 * # Card.js
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

const {is} = require('immutable');
import _ from 'underscore';

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

import HTMLParser from '../components/fields/HTMLParser'
var ImmutablePropTypes = require('react-immutable-proptypes');

var Card = React.createClass({

    /**
     * ## Card class
     */
    propTypes: {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        updatedIds: ImmutablePropTypes.list,
        lastAddedTableId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        pageId: PropTypes.number,
        tool: PropTypes.object,
        dataSource: PropTypes.any,
        members: PropTypes.array,
        data: PropTypes.object,
        cards: ImmutablePropTypes.record,
        cardFields: ImmutablePropTypes.map,
        cardFieldValues: ImmutablePropTypes.map,
        cardHumanValues: ImmutablePropTypes.map,
        tables: ImmutablePropTypes.record,
        tableFields: ImmutablePropTypes.map,
        tableFieldValues: ImmutablePropTypes.map,
        tableHumanValues: ImmutablePropTypes.map,
        tableNewRowValues: ImmutablePropTypes.map,
        dependencyIds: ImmutablePropTypes.list,
        prefix: PropTypes.string,
        onToolFieldChange: PropTypes.func,
        position: PropTypes.number,
        fields: PropTypes.array,
        thisPrimaryColour: PropTypes.string,
        thisSecondaryColour: PropTypes.string,
        currentUser: PropTypes.object,
        currentTab: PropTypes.number,
        getCurrentTab: PropTypes.func
    },

    _requiredPropsPresent() {
        let cards = 0,
            tables = 0;
        this.props.tool.slides.forEach((slide) => {
            slide.slideItems.forEach((slideItem) => {
                if (slideItem.type === "card") cards++;
                if (slideItem.type === "table") tables++;
            });
        });

        let onlyCards = tables === 0,
            onlyTables = cards === 0,
            requiredCardFields = this.props.cardFields.size > 0
                && this.props.cardFieldValues.size > 0
                && this.props.cardHumanValues.size > 0,
            requiredTableFields = this.props.tableFields.size > 0
                && this.props.tableFieldValues.size > 0
                && this.props.tableHumanValues.size > 0,
            requiredMembers = this.props.members.length > 0;

        return (requiredCardFields && requiredTableFields && requiredMembers)
            || (onlyCards && requiredCardFields && requiredMembers)
            || (onlyTables && requiredTableFields && requiredMembers);
    },

    _componentHasChanged(nextProps, nextState) {
        // console.log("CARD _componentHasChanged: ", nextProps, this.props, nextState, this.state);
        return is(nextState.loading, this.state.loading) === false
            || (
                nextProps.updatedIds.toJS().length > 0
                && typeof nextProps.dependencyIds !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab] !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab].cards !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab].cards[nextProps.id] !== "undefined"
                && nextProps.dependencyIds.toJS()[this.props.currentTab].cards[nextProps.id].length > 0
                && _.intersection(nextProps.updatedIds.toJS(), nextProps.dependencyIds.toJS()[this.props.currentTab].cards[nextProps.id]).length > 0
            );
    },

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("CARD shouldComponentUpdate: ", this._componentHasChanged(nextProps, nextState));
        return this._componentHasChanged(nextProps, nextState);
    },

    getInitialState: function () {
        return {
            loading: true
        };
    },

    _onComponentWillReceiveProps(nextProps) {
        // console.log(this._requiredPropsPresent());
        if (this._requiredPropsPresent()) {
            if (this.state.loading) this.setState({
                loading: false
            });
        }
    },
    componentWillReceiveProps(nextProps) {
        // console.log("CARD componentWillReceiveProps: ", nextProps, this.state);

        // Needed for save and exit
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
        // console.log("CARD componentDidMount: ", this.props, this.state);
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
        // console.log(this.state.loading);
        let fields = this.props.fields,
            that = this;

        var backgroundColour = 'white';

        let loadingView = <View style={{
            flex: 1,
            flexDirection: 'row',
            height: (fields && fields.length) ? AVERAGE_FIELD_HEIGHT * fields.length : AVERAGE_FIELD_HEIGHT
        }}>
            <View style={{flex: 1, flexDirection: 'column', alignSelf: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={DARK_GREY_COLOUR}
                                   animating={true}
                                   style={{opacity: 1}}/>
            </View>
        </View>;

        // console.log("PROPS >>>>>>>>>>>>>>> : ", this.props);

        let fieldsContent = this.state.loading ? loadingView : fields.map(function (field) {
            return HTMLParser.getFieldComponent(
                field,
                that.props,
                that.props.members,
                that.props.thisPrimaryColour,
                that.props.thisSecondaryColour,
                backgroundColour
            );
        });

        return (
            <View
                style={[styles.card, {backgroundColor: backgroundColour}]}
            >
                {fieldsContent}
            </View>
        );
    }

});

reactMixin(Card.prototype, TimerMixin);

module.exports = Card;
