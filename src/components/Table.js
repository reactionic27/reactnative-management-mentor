/**
 * # Table.js
 *
 */
'use strict';
/**
 * ## Imports
 *
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator,
    Platform
}
    from 'react-native';

var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin';

const {is} = require('immutable');

import Accordion from '../components/AccordionList';
const _ = require('underscore');

import TableHeaderRow from './TableHeaderRow'
import TableRow from './TableRow'
import TableRowEditCard from './TableRowEditCard'

/**
 * ## Styles
 */
import Icon from 'react-native-vector-icons/MaterialIcons';
const PADDING = 20;
const DEFAULT_BORDER_RADIUS = 0;
const ROW_HEIGHT = 50;
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const styles = StyleSheet.create({
    table: {
        marginBottom: PADDING / 2,
        marginLeft: PADDING / 4,
        marginRight: PADDING / 4,
        paddingTop: PADDING / 2,
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

import Helpers from '../lib/helpers'
var ImmutablePropTypes = require('react-immutable-proptypes');

var Table = React.createClass({

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
        onTableRowAdd: PropTypes.func,
        onTableRowDelete: PropTypes.func,
        position: PropTypes.number,
        table: PropTypes.object,
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
        // console.log("TABLE _componentHasChanged: ", nextProps, this.props, nextState, this.state);

        return is(nextState.loading, this.state.loading) === false
            || is(nextState.rows, this.state.rows) === false
            || is(nextProps.currentTab, this.props.currentTab) === false
            || (
                nextProps.updatedIds.toJS().length > 0
                && typeof nextProps.dependencyIds !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab] !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab].tables !== "undefined"
                && typeof nextProps.dependencyIds.toJS()[this.props.currentTab].tables[nextProps.id] !== "undefined"
                && nextProps.dependencyIds.toJS()[this.props.currentTab].tables[nextProps.id].length > 0
                && _.intersection(nextProps.updatedIds.toJS(), nextProps.dependencyIds.toJS()[this.props.currentTab].tables[nextProps.id]).length > 0
            );
    },

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("TABLE shouldComponentUpdate: ", this._componentHasChanged(nextProps, nextState));
        return this._componentHasChanged(nextProps, nextState);
    },

    getInitialState() {
        return {
            loading: true,
            tableId: this.props.table.id,
            appendable: this.props.table.appendable,
            sortable: this.props.table.sortable,
            columns: this.props.table.columns,
            rows: this.props.table.rows
        };
    },

    _onComponentWillReceiveProps(nextProps) {
        this.setTimeout(() => {
            if (this._requiredPropsPresent()) {
                this.setState({
                    loading: false,
                    tableId: nextProps.table.id,
                    columns: nextProps.table.columns,
                    rows: nextProps.table.rows
                }, () => {
                    let slide = nextProps.tool.slides[nextProps.currentTab];
                    if (slide) {
                        let slideItem = slide.slideItems.find((slideItem) => (slideItem.table.id === nextProps.table.id));
                        if (slideItem) slideItem.table.rows = this.state.rows;
                    }
                });
            }
        }, 350);
    },
    componentWillReceiveProps(nextProps) {
        // console.log("TABLE componentWillReceiveProps: ", nextProps.tableFieldValues.toJS(), this.state);

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

    componentWillMount() {
        // console.log(this.props, this.state);
    },

    _onComponentDidMount() {
        this.setTimeout(() => {
            // console.log(this.props.currentTab);
            if (this._requiredPropsPresent()) {
                this.setState({
                    loading: false,
                    tableId: this.props.table.id,
                    columns: this.props.table.columns,
                    rows: this.props.table.rows
                }, () => {
                    let slide = this.props.tool.slides[this.props.currentTab];
                    if (slide) {
                        let slideItem = slide.slideItems.find((slideItem) => (slideItem.table.id === this.props.table.id));
                        if (slideItem) slideItem.table.rows = this.state.rows;
                    }
                });
            }
        }, 350);
    },
    componentDidMount() {
        // console.log("TABLE componentDidMount: ", this.props.tableFieldValues.toJS(), this.state);
        if (Platform.OS === 'ios') {
            InteractionManager.runAfterInteractions(() => {
                this._onComponentDidMount();
            });
        } else {
            this._onComponentDidMount();
        }

        // console.log(this.props, this.state);
    },

    /**
     * ### render
     * display the form wrapped with the header and button
     */
    render() {
        // console.log("===RENDER===");

        let loadingView = <View style={{flex: 1, flexDirection: 'row', height: ROW_HEIGHT * this.state.rows.length}}>
            <View style={{flex: 1, flexDirection: 'column', alignSelf: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={DARK_GREY_COLOUR}
                                   animating={true}
                                   style={{opacity: 1}}/>
            </View>
        </View>;


        let addRowIcon = this.state.appendable ? <TouchableOpacity onPress={() => this._addRow()}
           activeOpacity={0.9}
           style={{alignSelf: 'flex-end', backgroundColor: 'transparent', marginBottom: PADDING / 2}}
        >
            <Icon name='playlist-add'
                  size={30}
                  color={DARK_GREY_COLOUR}
                  style={{marginRight: PADDING / 2}}
            />
        </TouchableOpacity> : <View/>;

        let tableContent = this.state.loading ? loadingView : <View>
            {addRowIcon}
            <TableHeaderRow {...this.props} columns={this.state.columns}/>
            <Accordion
                // style={[globalStyles.listViewList, {marginBottom: PADDING}]}
                sections={this.state.rows}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                activeOpacity={0.9}
                ease="easeIn"
                duration={350}
                align="top"
            />
        </View>;

        var backgroundColour = 'white';

        return <View
            style={[styles.table, {
                backgroundColor: backgroundColour,
                paddingTop: this.state.appendable ? PADDING / 2 : 0
            }]}
        >
            {tableContent}
        </View>;
    },

    _renderHeader(rowData, rowIndex, activeSection) {
        return <TableRow
            {...this.props}
            rowData={rowData}
            rowIndex={rowIndex}
            columns={this.props.table.columns}
            activeSection={activeSection}
        />;
    },

    _renderContent(rowData, rowIndex, activeSection) {
        return <TableRowEditCard
            {...this.props}
            rowData={rowData}
            rowIndex={rowIndex}
            columns={this.state.columns}
            activeSection={activeSection}
        />;
    },

    _addRow() {
        let tableId = this.state.tableId,
            rowId = "NR" + Helpers.hex(16),
            currentTab = this.props.getCurrentTab();

        let slide = this.props.tool.slides[currentTab];

        if (!slide) return;

        let slideItem = slide.slideItems.find((slideItem) => (slideItem.table.id === tableId));

        slideItem.table.rows.push({
            id: rowId,
            position: slideItem.table.rows.length + 1,
            data: this.props.tableNewRowValues.toJS()[tableId]
        });

        let columns = this.state.columns.map((column) => {
            return {
                id: column.id,
                fields: column.field,
                fieldValue: column.field.value,
                humanValue: Helpers.formatFieldValue(column.field, this.props.members)
            }
        });

        this.props.onTableRowAdd(this.props.tool, currentTab, tableId, columns, rowId);
    }
});

reactMixin(Table.prototype, TimerMixin);

module.exports = Table;
