/**
 * # Summary.js
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
    Text,
    ScrollView,
    Platform,
    Dimensions
}
    from 'react-native';

var {height, width} = Dimensions.get('window');

import FormButton from '../../components/FormButton';
var Mailer = require('NativeModules').RNMail;
import Accordion from '../../components/Accordion';

import Colour from '../../lib/colour'
import Icon from 'react-native-vector-icons/MaterialIcons';
var globalStyles = require('../../components/Stylesheet');
const PADDING = 20;
const SERIF_FONT = 'Roboto Slab';
const FONT_SIZE = 14;
const LIGHT_FONT_WEIGHT = '300';
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';
const styles = StyleSheet.create({
    summaryScrollView: {
        paddingTop: PADDING,
        paddingBottom: PADDING,
        paddingLeft: PADDING,
        paddingRight: PADDING
    },
    heading3: {
        fontFamily: SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT,
        fontSize: FONT_SIZE + 2,
        color: 'white',
        marginTop: 4
    }
});

import Helpers from '../../lib/helpers'
import HTMLParser from './HTMLParser'

var Summary = React.createClass({

    propTypes: {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        field: PropTypes.object,
        thisPrimaryColour: PropTypes.string,
        thisSecondaryColour: PropTypes.string,
        cardBackgroundColour: PropTypes.string
    },

    getInitialState: function () {
        return {
            value: '',
            isEmail: false
        };
    },

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.state);
    },

    componentDidMount() {
        if (this.props.cardFields) {
            // console.log(this.props, this.state);

            let id = this.props.id,
                cardFields = this.props.cardFields.toJS(),
                tableFields = this.props.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields),
                field = fields[id],
                cardFieldValues = this.props.cardFieldValues.toJS(),
                tableFieldValues = this.props.tableFieldValues.toJS(),
                fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                unformattedValue = fieldValues[id],
                textTransform = field.textTransform,
                isEmail = field.type === "email",
                //regEx = /<val>(.*?)<\/val>/g,
                regEx = /<val>(.*?)<\/val>/,
                //recipientFieldId = field.recipients ? field.recipients.replace(regEx, (match, p1, p2) => p1) : null;
                recipientFieldIdMatch = field.recipients ? field.recipients.match(regEx) : null,
                recipientFieldId = recipientFieldIdMatch && recipientFieldIdMatch.length > 0 ? recipientFieldIdMatch[1] : null;

            var value = Helpers.transformString(unformattedValue, textTransform);

            this.setState({
                value: value,
                isEmail: isEmail,
                recipientFieldId: recipientFieldId
            })
        }
    },

    render: function () {
        // console.log("===RENDER===");

        // TODO: Could this be more efficient than re-rendering the whole summary?
        // TODO: Something like the table cells = only re-render if that piece of
        // TODO: information has changed?
        let parsed = HTMLParser.parse(
            this.state.value,
            [
                styles.listViewAbstractText,
                {color: DARK_GREY_COLOUR}
            ],
            this.props,
            this.props.thisPrimaryColour,
            this.props.thisSecondaryColour,
            true
        );

        let replacedText = <View
            style={{
                marginTop: PADDING / 2,
                backgroundColor: 'transparent'
            }}
            pointerEvents="none">
            {parsed.replacedText}
        </View>;

        let editableComponent = <View
            style={{
                backgroundColor: '#f4f4f4',
                borderTopColor: 'white',
                borderTopWidth: StyleSheet.hairlineWidth,
                borderBottomColor: 'white',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: PADDING / 2,
                marginBottom: PADDING / 2
            }}>
            <ScrollView
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={350}
                style={styles.summaryScrollView}
                keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'none'}
            >
                {parsed.editableComponents}
            </ScrollView>
        </View>;

        let editIcon = <View style={{
            flexDirection: 'row',
            paddingLeft: PADDING,
            paddingRight: PADDING
        }}>
            <View style={{flex: 3}}>
                <Text style={styles.heading3}>
                    {this.state.isEmail ? 'Review email' : ''}
                </Text>
            </View>
            <View style={{
                flex: 1
            }}>
                <Icon name='mode-edit'
                      size={30}
                      color='#939393'
                      style={{
                          alignSelf: 'flex-end'
                      }}
                />
            </View>
        </View>;

        let emailButton = <View style={{
                    paddingBottom: PADDING
                }}/>;
        if (this.state.isEmail) {
            let emailButtonText = <View>
                <View style={globalStyles.iconAndText}>
                    <View style={globalStyles.buttonIconContainer}>
                        <Icon name='email' size={18} color='white'/>
                    </View>
                    <View style={globalStyles.buttonTextContainer}>
                        <Text style={globalStyles.sansSerifRegularText}>
                            <Text style={[globalStyles.bodyText, {color: 'white'}]}>
                                SEND EMAIL
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>;

            // Need to create function to open email client
            let onEmailButtonPress = () => {
                let recipients = [];
                if (this.props.cardFields) {
                    let cardFieldValues = this.props.cardFieldValues.toJS(),
                        tableFieldValues = this.props.tableFieldValues.toJS(),
                        fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                        recipientIds = this.state.recipientFieldId ? fieldValues[this.state.recipientFieldId] : null;

                    if (recipientIds) {
                        recipients = this.props.members.filter((member) => {
                            return recipientIds.indexOf(member.toJS().id) > -1;
                        });
                    }
                }

                Mailer.mail(
                    {
                        subject: '[iLeader App] Message from '
                        + this.props.currentUser.firstName
                        + " "
                        + this.props.currentUser.lastName,

                        recipients: recipients.map((recipient) => recipient.toJS().email),

                        body: HTMLParser.parsePlainText(this.state.value, this.props)
                        + '\n'
                        + this.props.currentUser.firstName
                        + " "
                        + this.props.currentUser.lastName,

                        /*
                        // Adding empty parameters to the 'attachment' parameter returns an exception in iOS (RNMail.m line 81)
                        // Uncomment only if parameter has content
                        attachment: {
                            path: '',   // The absolute path of the file from which to read data.
                            type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
                            name: ''    // Optional: Custom filename for attachment
                        }
                        */
                    },
                    (error, event) => {
                        if (error) {
                            // console.log('onContactButtonPress error', error, event);
                        }
                    });
            };

            emailButton = <View style={{
                paddingLeft: PADDING,
                paddingRight: PADDING
            }}>
                <FormButton
                    isDisabled={false}
                    onPress={onEmailButtonPress.bind(this)}
                    buttonText={emailButtonText}
                    color={this.props.thisSecondaryColour}
                />
            </View>;
        }

        return <View style={{marginLeft: -PADDING, marginRight: -PADDING}}>
            <Accordion
                renderHeader={() => (editIcon)}
                renderContent={() => (editableComponent)}
                activeOpacity={0.9}
                ease="easeIn"
                duration={350}
                align="top"
                initiallyActive={true}
            />
            <View style={{paddingLeft: 20, paddingRight: 20}}>
                {replacedText}
            </View>
            {emailButton}
        </View>;
    }
});

module.exports = Summary;
