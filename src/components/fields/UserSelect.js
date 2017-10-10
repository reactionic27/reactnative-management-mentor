/**
 * # UserSelect.js
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
    View,
    TouchableOpacity,
    Image,
    Text,
    Modal
}
    from 'react-native';

const {is, Map} = require('immutable');
const _ = require('underscore');

import TeamAvatarList from '../../components/TeamAvatarList'

var globalStyles = require('../../components/Stylesheet');
const DEFAULT_AVATAR = 'data:image/png;base64,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';
const PADDING = 20;
const SERIF_FONT = 'Roboto Slab';
const FONT_SIZE = 14;
const LIGHT_FONT_WEIGHT = '300';
const STATUSBAR_PADDING = PADDING * 2;
const AVATAR_SIZE = 60;
const BORDER_WIDTH = 3;
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const styles = StyleSheet.create({
    userPicker: {
        width: AVATAR_SIZE - (BORDER_WIDTH * 2),
        height: AVATAR_SIZE - (BORDER_WIDTH * 2),
        borderRadius: (AVATAR_SIZE - (BORDER_WIDTH * 2)) / 2,
        alignSelf: 'center',
        transform: [{rotate: '45deg'}]
    },
    userPickerBorder: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderWidth: BORDER_WIDTH,
        marginTop: PADDING / 4,
        marginBottom: PADDING / 4,
        marginLeft: PADDING,
        marginRight: PADDING,
        alignSelf: 'center',
        transform: [{rotate: '-45deg'}]
    },
    separatorCircle: {
        alignSelf: 'center',
        backgroundColor: DARK_GREY_COLOUR,
        width: PADDING * 1.5,
        height: PADDING * 1.5,
        borderRadius: (PADDING * 1.5) / 2,
        borderColor: 'blue',
        paddingTop: ((PADDING * 1.5) - FONT_SIZE) / 2
    },
    separator: {
        fontFamily: SERIF_FONT,
        fontSize: FONT_SIZE,
        lineHeight: FONT_SIZE,
        fontWeight: LIGHT_FONT_WEIGHT,
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: 'white'
    },
    modalContainer: {
        flex: 1,
        paddingTop: STATUSBAR_PADDING
    }
});

var UserSelect = React.createClass({

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
            index: 0,
            avatar0: DEFAULT_AVATAR,
            member0: null,
            avatar1: DEFAULT_AVATAR,
            member1: null,
            animationType: 'slide',
            modalVisible: false,
            number: 1,
            separator: 'vs'
        };
    },

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.state, nextProps.cardFieldValues.toJS()[nextProps.id]);
        if (nextProps.cardFields) {
            let id = nextProps.id,
                cardFieldValues = nextProps.cardFieldValues.toJS(),
                tableFieldValues = nextProps.tableFieldValues.toJS(),
                fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                selected = fieldValues[id],
                member0 = null, member1 = null;

            // console.log(selected);
            if (selected) {
                if (_.isArray(selected)) {
                    [member0, member1] = selected.map((id) => {
                        var m = this._getMember(id);
                        return m ? m.toJS() : null;
                    });
                } else if (_.isString(selected) || _.isObject(selected)) {
                    var m = this._getMember(selected);
                    member0 = m ? m.toJS() : null;
                }
            }

            this.setState({
                avatar0: member0 ? member0.avatar : DEFAULT_AVATAR,
                member0: member0,
                avatar1: member1 ? member1.avatar : DEFAULT_AVATAR,
                member1: member1
            });
        }
    },

    componentDidMount: function() {
        if (this.props.cardFields) {
            let id = this.props.id,
                cardFields = this.props.cardFields.toJS(),
                tableFields = this.props.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields),
                field = fields[id],
                cardFieldValues = this.props.cardFieldValues.toJS(),
                tableFieldValues = this.props.tableFieldValues.toJS(),
                fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                selected = fieldValues[id],
                member0 = null, member1 = null;

            // console.log(selected);
            if (selected) {
                if (_.isArray(selected)) {
                    [member0, member1] = selected.map((id) => {
                        var m = this._getMember(id);
                        return m ? m.toJS() : null;
                    });
                } else if (_.isString(selected) || _.isObject(selected)) {
                    var m = this._getMember(selected);
                    member0 = m ? m.toJS() : null;
                }
            }

            this.setState({
                loading: false,
                avatar0: member0 ? member0.avatar : DEFAULT_AVATAR,
                member0: member0,
                avatar1: member1 ? member1.avatar : DEFAULT_AVATAR,
                member1: member1,
                number: field.number,
                separator: field.separator
            });
        }
    },

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.state.loading,
        //     this.props.prefix === 'cards'
        //     && is(nextProps.cardFieldValues.get(this.props.id.toString()), this.props.cardFieldValues.get(this.props.id.toString())) === false,
        //     this.props.prefix === 'tables'
        //     && is(nextProps.tableFieldValues.get(this.props.id.toString()), this.props.tableFieldValues.get(this.props.id.toString())) === false);
        return this.state.loading
            || (this.props.prefix === 'cards'
            && is(nextProps.cardFieldValues.get(this.props.id.toString()), this.props.cardFieldValues.get(this.props.id.toString())) === false)
            || (this.props.prefix === 'tables'
            && is(nextProps.tableFieldValues.get(this.props.id.toString()), this.props.tableFieldValues.get(this.props.id.toString())) === false)
            || is(nextState.modalVisible, this.state.modalVisible) === false;
    },

    render: function () {
        // console.log("===RENDER===");
        var that = this,
            names = [<View/>, <View/>],
            component = <View/>,
            arr = [];
        if (this.state.member0) arr = [...arr, this.state.member0.id];
        if (this.state.member1) arr = [...arr, this.state.member1.id];

        var modal = <Modal
            animationType={this.state.animationType}
            transparent={this.state.transparent}
            visible={this.state.modalVisible}
            onRequestClose={() => {this._setModalVisible(false)}}
        >
            <View style={[styles.modalContainer, {backgroundColor: this.props.cardBackgroundColour}]}>
                <TeamAvatarList
                    showSectionHeader={false}
                    showRatings={false}
                    defaultOnPress={false}
                    onPress={(member) => {
                            // // console.log(member);
                            this._onValueChange(member);
                            this._setModalVisible(false);
                        }}
                    borderStyle={{borderColor: 'white'}}
                    listViewBackgroundColour={this.props.cardBackgroundColour}
                    listViewContentContainerBackgroundColour={this.props.cardBackgroundColour}
                    renderCancelButton={true}
                    onPressCancelButton={() => {
                            this._setModalVisible(false);
                        }}
                    greyedAvatars={arr}
                    includeSelf={true}
                />
            </View>
        </Modal>;


        [0, 1].forEach(function (i) {
            if (that.state['member' + i]) {
                names[i] = <View style={[styles.listViewAvatarName]}>
                    <Text
                        style={[globalStyles.sansSerifRegularText, {
                                color: DARK_GREY_COLOUR,
                                textAlign: 'center',
                                fontSize: FONT_SIZE - 3
                            }]}>
                        {that.state['member' + i].firstName}
                        {'\n'}
                        {that.state['member' + i].lastName}
                    </Text>
                </View>
            }
        });

        if (this.state.number === 1) {
            component = <View style={{
                marginBottom: PADDING / 2
            }}>
                {modal}
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => (this._onClickAvatar(0))}>
                    <View
                        style={[styles.userPickerBorder, {borderColor: this.state.member0 ? 'white' : 'transparent'}]}>
                        <Image
                            source={{uri: this.state.avatar0}}
                            resizeMode="cover"
                            style={[styles.userPicker, {alignSelf: 'center', marginBottom: PADDING / 2}]}/>
                    </View>
                    {names[0]}
                </TouchableOpacity>
            </View>
        } else {
            component = <View style={{
                marginBottom: PADDING / 2
            }}>
                {modal}
                <View style={{flex: 1, flexDirection: 'row', marginBottom: PADDING / 2}}>
                    <View style={{flex: 3}}>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => (this._onClickAvatar(0))}>
                            <View
                                style={[styles.userPickerBorder, {borderColor: this.state.member0 ? 'white' : 'transparent'}]}>
                                <Image
                                    source={{uri: this.state.avatar0}}
                                    resizeMode="cover"
                                    style={[styles.userPicker, {alignSelf: 'center'}]}/>
                            </View>
                            {names[0]}
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, marginTop: ((AVATAR_SIZE + BORDER_WIDTH) / 2) - ((PADDING * 1.5) / 2)}}>
                        <View style={styles.separatorCircle}>
                            <Text style={styles.separator}>
                                {this.state.separator}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 3}}>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => (this._onClickAvatar(1))}>
                            <View
                                style={[styles.userPickerBorder, {borderColor: this.state.member1 ? 'white' : 'transparent'}]}>
                                <Image
                                    source={{uri: this.state.avatar1}}
                                    resizeMode="cover"
                                    style={[styles.userPicker, {alignSelf: 'center'}]}/>
                            </View>
                            {names[1]}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        }

        return <View>
            {component}
        </View>
    },

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    },

    _onClickAvatar(index) {
        this.setState({
            index: index,
            modalVisible: true
        });
    },

    _getMember: function(id) {
        return this.props.members.find((member) => {
            return parseInt(member.toJS().id) === parseInt(id);
        })
    },

    _getMemberName: function(members) {
        if (members.length > 1) {
            return [this._getMemberName([members[0]]), this._getMemberName([members[1]])].join(" " + this.state.separator + " ")
        } else {
            //return members[0] ? (this.props.prefix === "tables" ? [members[0].firstName.charAt(0), members[0].lastName.charAt(0)].join('') : [members[0].firstName, members[0].lastName].join(' ')) : 'TBC';
            return members[0] ? ((this.props.prefix === "tables" || this.props.prefix === "cards") ? members[0].firstName : [members[0].firstName, members[0].lastName].join(' ')) : 'TBC'; // As a client requirement we WON'T shorten the names to the initials
        }
    },

    _onValueChange: function (member) {
        const newState = {};
        newState['avatar' + this.state.index] = member ? member.avatar : DEFAULT_AVATAR;
        newState['member' + this.state.index] = member ? member : null;
        this.setState(newState);

        let memberArr = (this.state.number === 1) ? [member] : (this.state.index === 0 ? [member, this.state.member1] : [this.state.member0, member]);
        let prefix = (typeof this.props.id === "string" && this.props.id.split('_').length > 1) ? 'tables' : 'cards';
        this.props.onToolFieldChange(prefix, this.props.id, memberArr.map((member) => (member ? member.id : null)), this._getMemberName(memberArr));
    }
});

module.exports = UserSelect;
