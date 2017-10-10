/**
 * # MultiUserSelect.js
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
    Image,
    Text,
    ScrollView,
    ListView,
    Platform
}
    from 'react-native';

const {is} = require('immutable');

const _ = require('underscore');

const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
var globalStyles = require('../Stylesheet');
const PADDING = 20;
const FONT_SIZE = 14;
const AVATAR_SIZE = 60;
const BORDER_WIDTH = 3;
const GREEN_COLOUR = '#65d39a';
const styles = StyleSheet.create({
    scrollView: {
        height: AVATAR_SIZE + (3 * PADDING / 2),
        backgroundColor: 'transparent',
        marginLeft: -PADDING,
        marginRight: -PADDING,
        paddingLeft: 3 * PADDING / 4
    },
    userPickerBorder: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderWidth: BORDER_WIDTH,
        borderColor: 'white',
        marginTop: PADDING / 4,
        marginBottom: PADDING / 4,
        marginLeft: PADDING / 4,
        marginRight: PADDING / 4,
        alignSelf: 'center',
        transform: [{rotate: '-45deg'}]
    },
    userPicker: {
        width: AVATAR_SIZE - (BORDER_WIDTH * 2),
        height: AVATAR_SIZE - (BORDER_WIDTH * 2),
        borderRadius: (AVATAR_SIZE - (BORDER_WIDTH * 2)) / 2,
        alignSelf: 'center',
        transform: [{rotate: '45deg'}]
    },
    listViewAvatarName: {
        width: AVATAR_SIZE + PADDING,
        marginLeft: (PADDING / 2) - 10,
        marginRight: (PADDING / 2) - 10,
        paddingBottom: PADDING / 2,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    countLabel: {
        marginTop: PADDING / 2,
        marginBottom: PADDING / 2,
        fontSize: FONT_SIZE,
        textAlign: 'center'
    }
});

var MultiUserSelect = React.createClass({

    propTypes: {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        field: PropTypes.object,
        thisPrimaryColour: PropTypes.string,
        thisSecondaryColour: PropTypes.string,
        cardBackgroundColour: PropTypes.string,
        members: PropTypes.array
    },

    getInitialState: function () {
        return {
            loading: true,
            selected: []
        };
    },

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.state, nextProps.cardFieldValues);
        if (nextProps.cardFieldValues) {
            let id = nextProps.id,
                cardFieldValues = nextProps.cardFieldValues.toJS(),
                tableFieldValues = nextProps.tableFieldValues.toJS(),
                fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                selected = fieldValues[id],
                selectedIds = [];

            if (_.isArray(selected)) {
                selectedIds = selected.map((member) => {
                    return _.isObject(member) ? member.id : member;
                })
            }

            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
            });

            this.setState({
                dataSource: ds.cloneWithRows(nextProps.members),
                selected: selectedIds
            });
        }
    },

    componentDidMount() {
        // console.log(this.props, this.state, this.props.cardFieldValues);
        if (this.props.cardFieldValues) {
            let id = this.props.id,
                cardFieldValues = this.props.cardFieldValues.toJS(),
                tableFieldValues = this.props.tableFieldValues.toJS(),
                fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                selected = fieldValues[id],
                selectedIds = [];

            if (_.isArray(selected)) {
                selectedIds = selected.map((member) => {
                    return _.isObject(member) ? member.id : member;
                })
            }

            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
            });

            this.setState({
                loading: false,
                dataSource: ds.cloneWithRows(this.props.members),
                members: this.props.members,
                selected: selectedIds.length ? selectedIds : []
            });
        }
    },

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.state.loading,
        //     this.props.prefix === 'cards'
        //     && is(nextProps.cardFieldValues.get(this.props.id.toString()), this.props.cardFieldValues.get(this.props.id.toString())) === false,
        //     this.props.prefix === 'tables'
        //     && is(nextProps.tableFieldValues.get(this.props.id.toString()), this.props.tableFieldValues.get(this.props.id.toString())) === false);
        // return this.state.loading
        //     || (this.props.prefix === 'cards'
        //     && is(nextProps.cardFieldValues.get(this.props.id.toString()), this.props.cardFieldValues.get(this.props.id.toString())) === false)
        //     || (this.props.prefix === 'tables'
        //     && is(nextProps.tableFieldValues.get(this.props.id.toString()), this.props.tableFieldValues.get(this.props.id.toString())) === false)
        //     || is(nextState.selected, this.state.selected) === false;
        return true;
    },

    /**
     * acceptTerms: null,
     * age: "32",
     * avatar: "data:image/png;base64,iVBO..."
     * createdAt: "2016-04-01T11:28:02.857Z",
     * email: "user@example.com",
     * firstName: "Matthew",
     * gender: "Male",
     * id: 1,
     * isActive: true,
     * lastName: "Ager",
     * nationality: "United Kingdom",
     * provider: "email",
     * role: "admin",
     * uid: "user@example.com",
     * updatedAt: "2016-04-02T09:43:45.763Z"
     * iLeader: true
     * member: false
     * ratings: [
     * * {
         * * * id: 1,
         * * * userId: 1,
         * * * scoreDatetime: "2016-04-02T09:43:45.763Z",
         * * * productivity: "100",
         * * * enthusiasm: "100",
         * * },
     * * {},
     * * ...
     * ]
     */
    _renderRow(rowData, state) {
        return <View>
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                    this._onPress(rowData.toJS())
                }}
            >
                <View style={[styles.userPickerBorder, {
                        borderColor: (state.selected.indexOf(rowData.toJS().id) > -1) ? GREEN_COLOUR : 'white'
                    }]}
                >
                    <Image
                        source={{uri: rowData.toJS().avatar}}
                        resizeMode="cover"
                        style={styles.userPicker}/>
                </View>
                <View style={[styles.listViewAvatarName]}>

                    <Text
                        style={[globalStyles.sansSerifRegularText, {
                                color: DARK_GREY_COLOUR,
                                textAlign: 'center',
                                fontSize: FONT_SIZE - 3
                            }, this.props.textStyle]}>
                        {rowData.toJS().firstName}
                    </Text>

                </View>
            </TouchableOpacity>
        </View>
    },

    render() {
        let multiUserSelectListView = this.state.dataSource ?
            <ListView
                contentContainerStyle={[globalStyles.listViewGridList, {paddingBottom: 0}]}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => (this._renderRow(rowData, this.state))}
                pageSize={this.state.members.length}
                scrollEnabled={false}
            /> : <View/>;

        return <View>
            <ScrollView
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={350}
                style={styles.scrollView}
                contentContainerStyle={{paddingRight: Platform.OS === 'ios' ? 0 : PADDING * 2}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {multiUserSelectListView}
            </ScrollView>
            <Text style={[globalStyles.sansSerifLightText, styles.countLabel, {color: DARK_GREY_COLOUR}]}>
                {this.state.selected.length} member{this.state.selected.length !== 1 ? 's' : ''} selected
            </Text>
        </View>
    },

    _onPress(member) {
        var arr = this.state.selected,
            i = arr.indexOf(member.id);
        const newState = {};

        if (i > -1) {
            arr.splice(i, 1);
            newState.selected = arr;
        } else {
            newState.selected = [...arr, member.id];
        }

        // Forcing redraw of ListView to update green borders
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });
        newState.dataSource = ds.cloneWithRows(this.props.members);

        this.setState(newState);

        let that = this,
            members, m;

        members = newState.selected.map((id) => {
            m = that._getMember(id);
            return that._getMemberName(m);
        });
        let prefix = (typeof this.props.id === "string" && this.props.id.split('_').length > 1) ? 'tables' : 'cards';
        this.props.onToolFieldChange(prefix, this.props.id, newState.selected, members.join(', '));
    },

    _getMember(id) {
        let member = this.props.members.find((m) => {
            return m.toJS().id === id;
        });
        return member ? member.toJS() : null;
    },

    _getMemberName(member) {
        if (member && member !== null) {
            //return this.props.prefix === "tables" ? [member.firstName.charAt(0), member.lastName.charAt(0)].join('') : [member.firstName, member.lastName].join(' ');
            return (this.props.prefix === "tables" || this.props.prefix === "cards") ? member.firstName : [member.firstName, member.lastName].join(' '); // As a client requirement we WON'T shorten the names to the initials
        }
    }
});

module.exports = MultiUserSelect;
