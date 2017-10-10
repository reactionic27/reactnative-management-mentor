/**
 * # Summary.js
 *
 */
'use strict';
/**
 * ## Import
 *
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform
}
    from 'react-native';

import TextBlock from './TextBlock'
import OptionSelect from './OptionSelect'
import UserSelect from './UserSelect'
import MultiUserSelect from './MultiUserSelect'
import DateTime from './DateTime'
import TextField from './TextField'
import CheckboxList from './CheckboxList'
import RadioButtons from './RadioButtons'
import Summary from './Summary'

const reactStringReplace = require('react-string-replace');
import Helpers from '../../lib/helpers'


import Colour from '../../lib/colour'
const PADDING = 20;
const SANS_SERIF_FONT = 'Roboto';
const SERIF_FONT = 'Roboto Slab';
const FONT_SIZE = 14;
const LIGHT_FONT_WEIGHT = '300';
const styles = StyleSheet.create({
    heading1: Platform.OS === 'ios' ? {
        fontFamily: SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT,
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 10
    } : {
        fontFamily: 'RobotoSlab-Light',
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 10
    },
    heading2: Platform.OS === 'ios' ? {
        fontFamily: SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT,
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 4
    } : {
        fontFamily: 'RobotoSlab-Light',
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 4
    },
    heading3: Platform.OS === 'ios' ? {
        fontFamily: SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT,
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 2
    } : {
        fontFamily: 'RobotoSlab-Light',
        marginBottom: PADDING,
        fontSize: FONT_SIZE + 2
    },
    paragraph: Platform.OS === 'ios' ? {
        fontFamily: SANS_SERIF_FONT,
        fontWeight: LIGHT_FONT_WEIGHT,
        marginBottom: PADDING,
        fontSize: FONT_SIZE
    } : {
        fontFamily: 'Roboto-Light',
        marginBottom: PADDING,
        fontSize: FONT_SIZE
    }
});

export default class HTMLParser {
    /**
     * ## HTMLParser
     *
     */
    constructor() {
    }

    /**
     *
     * @param field
     * @param props
     * @param members
     * @param thisPrimaryColour
     * @param thisSecondaryColour
     * @param backgroundColour
     * @param key
     * @returns {*}
     */
    static getFieldComponent(field, props, members, thisPrimaryColour, thisSecondaryColour, backgroundColour, key = null) {
        switch (field.type) {
            case "textBlock":
                return <TextBlock
                    {...props}
                    key={[field.id, key].join('')}
                    id={key ? key : field.id}
                    field={field}
                    thisPrimaryColour={thisPrimaryColour}
                    thisSecondaryColour={thisSecondaryColour}
                    cardBackgroundColour={backgroundColour}
                />;
            case "optionSelect":
                return <OptionSelect
                    {...props}
                    key={[field.id, key].join('')}
                    id={key ? key : field.id}
                    field={field}
                    thisPrimaryColour={thisPrimaryColour}
                    thisSecondaryColour={thisSecondaryColour}
                    cardBackgroundColour={backgroundColour}
                />;
            case "userSelect":
                if (field.number < 3) {
                    return <UserSelect
                        {...props}
                        key={[field.id, key].join('')}
                        id={key ? key : field.id}
                        field={field}
                        members={members}
                        thisPrimaryColour={thisPrimaryColour}
                        thisSecondaryColour={thisSecondaryColour}
                        cardBackgroundColour={backgroundColour}
                    />;
                } else {
                    return <MultiUserSelect
                        {...props}
                        key={[field.id, key].join('')}
                        id={key ? key : field.id}
                        field={field}
                        members={members}
                        thisPrimaryColour={thisPrimaryColour}
                        thisSecondaryColour={thisSecondaryColour}
                        cardBackgroundColour={backgroundColour}
                    />;
                }
            case "dateTime":
                return <DateTime
                    {...props}
                    key={[field.id, key].join('')}
                    id={key ? key : field.id}
                    field={field}
                    thisPrimaryColour={thisPrimaryColour}
                    thisSecondaryColour={thisSecondaryColour}
                    cardBackgroundColour={backgroundColour}
                />;
            case "textField":
                return <TextField
                    {...props}
                    key={[field.id, key].join('')}
                    id={key ? key : field.id}
                    field={field}
                    thisPrimaryColour={thisPrimaryColour}
                    thisSecondaryColour={thisSecondaryColour}
                    cardBackgroundColour={backgroundColour}
                    multiline={false}
                />;
            case "textArea":
                return <TextField
                    {...props}
                    key={[field.id, key].join('')}
                    id={key ? key : field.id}
                    field={field}
                    thisPrimaryColour={thisPrimaryColour}
                    thisSecondaryColour={thisSecondaryColour}
                    cardBackgroundColour={backgroundColour}
                    multiline={true}
                />;
            case "checkbox":
                return <CheckboxList
                    {...props}
                    key={[field.id, key].join('')}
                    id={key ? key : field.id}
                    field={field}
                    thisPrimaryColour={thisPrimaryColour}
                    thisSecondaryColour={thisSecondaryColour}
                    cardBackgroundColour={backgroundColour}
                />;
            case "radio":
                return <RadioButtons
                    {...props}
                    key={[field.id, key].join('')}
                    id={key ? key : field.id}
                    field={field}
                    thisPrimaryColour={thisPrimaryColour}
                    thisSecondaryColour={thisSecondaryColour}
                    cardBackgroundColour={backgroundColour}
                />;
            case "summary":
            case "email":
                return <Summary
                    {...props}
                    key={[field.id, key].join('')}
                    id={key ? key : field.id}
                    field={field}
                    thisPrimaryColour={thisPrimaryColour}
                    thisSecondaryColour={thisSecondaryColour}
                    cardBackgroundColour={backgroundColour}
                />;
            default:
                return false;
        }
    }

    /**
     *
     * @param match
     * @param additionalStyles
     * @param props
     * @param thisPrimaryColour
     * @param thisSecondaryColour
     * @returns {{replacedText: *, editableComponents: Array}}
     */
    static parseVal(match, additionalStyles, props, thisPrimaryColour, thisSecondaryColour) {

        let replacedText, returnValue, id, defaultText, editableComponents = [], that = this,
            regEx = /<val>(.*?)<\/val>/g;

        replacedText = reactStringReplace(match.replace(/<br>/g, '\n').replace(/<uli>/g, '\u2022 '), regEx, (match, i) => {

            [id, defaultText] = match.split('|');

            let cardFields = props.cardFields.toJS(),
                tableFields = props.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields),
                field = fields[id],
                cardHumanValues = props.cardHumanValues.toJS(),
                tableHumanValues = props.tableHumanValues.toJS(),
                humanValues = Object.assign(cardHumanValues, tableHumanValues),
                value = humanValues[id];

            returnValue = value ? value : defaultText;
            returnValue = returnValue ? returnValue : defaultText;

            if (field) {
              // In case id points to a dynamic text block.
              if (field.type === 'textBlock' && regEx.test(returnValue)) {
                  returnValue = Helpers.replaceVal(returnValue, fields, humanValues);
              }

              if (field.type !== 'summary' && field.type !== 'email') {
                  editableComponents.push(
                      that.getFieldComponent(
                          field,
                          props,
                          props.members,
                          props.thisPrimaryColour,
                          props.thisSecondaryColour,
                          Colour.shift(Colour.get(thisPrimaryColour).drawerHeaderTextColour, 5, 0, 0),
                          id
                      )
                  );
              }
            }

            return <Text key={Math.floor((Math.random() * 1000000) + 1) + i}
                         style={[additionalStyles, styles.paragraph]}
                         dynamic={true}
            >
                {returnValue}
            </Text>;
        });

        return {
            replacedText: replacedText,
            editableComponents: editableComponents
        };
    }

    /**
     *
     * @param html
     * @param additionalStyles
     * @param props
     * @param thisPrimaryColour
     * @param thisSecondaryColour
     * @param includeEditableComponents
     * @returns {{replacedText: *, editableComponents: Array}}
     */
    static parse(html, additionalStyles, props, thisPrimaryColour, thisSecondaryColour, includeEditableComponents) {

        let replacedText, parsedVal, editableComponents = [], that = this,
            h1RegEx = /<h1>(.*?)<\/h1>/g,
            h2RegEx = /<h2>(.*?)<\/h2>/g,
            h3RegEx = /<h3>(.*?)<\/h3>/g,
            pRegEx = /<p>(.*?)<\/p>/g;

        replacedText = reactStringReplace(html, h1RegEx, (match, i) => {

            parsedVal = that.parseVal(match, additionalStyles, props, thisPrimaryColour, thisSecondaryColour);
            editableComponents.push(parsedVal.editableComponents);

            return <Text key={Math.floor((Math.random() * 1000000) + 1) + i}
                         style={[additionalStyles, styles.heading1]}>
                {parsedVal.replacedText}
            </Text>;
        });

        replacedText = reactStringReplace(replacedText, h2RegEx, (match, i) => {

            parsedVal = that.parseVal(match, additionalStyles, props, thisPrimaryColour, thisSecondaryColour);
            editableComponents.push(parsedVal.editableComponents);

            return <Text key={Math.floor((Math.random() * 1000000) + 1) + i}
                         style={[additionalStyles, styles.heading2]}>
                {parsedVal.replacedText}
            </Text>;
        });

        replacedText = reactStringReplace(replacedText, h3RegEx, (match, i) => {

            parsedVal = that.parseVal(match, additionalStyles, props, thisPrimaryColour, thisSecondaryColour);
            editableComponents.push(parsedVal.editableComponents);

            return <Text key={Math.floor((Math.random() * 1000000) + 1) + i}
                         style={[additionalStyles, styles.heading3]}>
                {parsedVal.replacedText}
            </Text>;
        });

        replacedText = reactStringReplace(replacedText, pRegEx, (match, i) => {

            parsedVal = that.parseVal(match, additionalStyles, props, thisPrimaryColour, thisSecondaryColour);
            editableComponents.push(parsedVal.editableComponents);

            return <Text key={Math.floor((Math.random() * 1000000) + 1) + i}
                         style={[additionalStyles, styles.paragraph]}>
                {parsedVal.replacedText}
            </Text>;
        });

        replacedText = replacedText.filter((el) => {
            return typeof el !== 'string';
        });

        return includeEditableComponents ? {
            replacedText: replacedText,
            editableComponents: editableComponents
        } : replacedText;
    }

    /**
     *
     * @param match
     * @param props
     * @returns {string|XML}
     */
    static parseValPlainText(match, props) {

        let returnValue,
            id,
            defaultText,
            regEx = /<val>(.*?)<\/val>/g;

        return match
            .replace(/<br>/g, '\n')
            .replace(/<uli>/g, '\u2022 ')
            .replace(regEx, (match, p1) => {

                [id, defaultText] = p1.split('|');

                let cardFields = props.cardFields.toJS(),
                    tableFields = props.tableFields.toJS(),
                    fields = Object.assign(cardFields, tableFields),
                    field = fields[id],
                    cardHumanValues = props.cardHumanValues.toJS(),
                    tableHumanValues = props.tableHumanValues.toJS(),
                    humanValues = Object.assign(cardHumanValues, tableHumanValues),
                    value = humanValues[id];

                returnValue = value ? value : defaultText;
                returnValue = returnValue ? returnValue : defaultText;

                if (field) {
                  // In case id points to a dynamic text block.
                  if (field.type === 'textBlock' && regEx.test(returnValue)) {
                      returnValue = Helpers.replaceVal(returnValue, fields, humanValues);
                  }
                }

                return returnValue;
            });
    }

    /**
     *
     * @param html
     * @param props
     * @returns {string|XML}
     */
    static parsePlainText(html, props) {

        let that = this,
            h1RegEx = /<h1>(.*?)<\/h1>/g,
            h2RegEx = /<h2>(.*?)<\/h2>/g,
            h3RegEx = /<h3>(.*?)<\/h3>/g,
            pRegEx = /<p>(.*?)<\/p>/g;

        return html
            .replace(h1RegEx, (match, p1) => that.parseValPlainText(p1, props) + '\n\n')
            .replace(h2RegEx, (match, p1) => that.parseValPlainText(p1, props) + '\n\n')
            .replace(h3RegEx, (match, p1) => that.parseValPlainText(p1, props) + '\n\n')
            .replace(pRegEx, (match, p1) => that.parseValPlainText(p1, props) + '\n\n')
    }
}
