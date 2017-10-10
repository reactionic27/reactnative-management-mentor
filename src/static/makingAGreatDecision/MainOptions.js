/**
 * # makingAGreatDecision/MainOptions.js
 *
 */
'use strict';
/**
 * ## Import
 *
 */
import React, {PropTypes} from 'react';
import {
    View,
    Text
}
    from 'react-native';

import _ from 'underscore'

/**
 *  The fantastic little form library
 */
import t from 'tcomb-form-native';
import FloatingLabel from 'react-native-floating-label';
const stylesheet = require('../../components/FormStylesheet');
t.form.Form.stylesheet = stylesheet;
let Form = t.form.Form;

const styles = require('./Stylesheet');
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';

var PureRenderMixin = require('react-addons-pure-render-mixin');
var ImmutablePropTypes = require('react-immutable-proptypes');

const NUMBER_OF_OPTIONS = 8;

var Component = React.createClass({

    mixins: [PureRenderMixin],

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

    getInitialState: function () {
        let data = this.props.data.toJS(),
            state = {
            auto: 'placeholders',
            stylesheet: stylesheet,
            value: {
                topic: data.topic
            },
            factory: FloatingLabel,
            autoCapitalisation: 'sentences',
            keyboardType: 'default',
            returnKeyType: 'done',
            multiline: false,
            textAlign: 'left'
        };

        for (var i = 1; i <= NUMBER_OF_OPTIONS; i++) {
            state.value['option' + i] = data['option' + i];
        }

        return state;
    },

    componentWillReceiveProps(nextProps) {
        // console.log("MainOptions componentWillReceiveProps: ", nextProps.data.toJS());

        let data = nextProps.data.toJS(),
            nextState = {
                value: {
                    topic: data.topic
                }
            };

        for (var i = 1; i <= NUMBER_OF_OPTIONS; i++) {
            nextState.value['option' + i] = data['option' + i];
        }

        this.setState(nextState);
    },

    componentWillMount() {
        this._onValueChange = _.debounce(this._onValueChange, 250);
    },

    render: function () {

        let fieldOptions = {
                factory: this.state.factory,
                autoCapitalize: this.state.autoCapitalisation,
                keyboardType: this.state.keyboardType,
                returnKeyType: this.state.returnKeyType,
                multiline: this.state.multiline,
                underlineColorAndroid: 'transparent'
            },
            options = {
                auto: this.state.auto,
                fields: {
                    topic: Object.assign({}, fieldOptions, {
                        label: 'Topic'
                    })
                },
                stylesheet: this.state.stylesheet
            };

        let topicInput = t.struct({
            topic: t.String
        });

        let optionsFormFields = {};
        for (var i = 1; i <= NUMBER_OF_OPTIONS; i++) {
            options.fields['option' + i] = Object.assign({}, fieldOptions, {
                label: 'Option ' + i
            });
            optionsFormFields['option' + i] = t.String;
        }

        let optionsForm = t.struct(optionsFormFields);

        const opts = t.update(options, {
            stylesheet: {
                controlLabel: {
                    normal: {
                        color: {
                            $set: '#939393'
                        }
                    }
                },
                textbox: {
                    normal: {
                        color: {
                            $set: DARK_GREY_COLOUR
                        }
                    },
                    error: {
                        color: {
                            $set: DARK_GREY_COLOUR
                        }
                    }
                }
            }
        });

        return <View>

            <Text
                style={[styles.heading1, {textAlign: 'center', color: DARK_GREY_COLOUR}]}>
                Making a great decision
            </Text>
            <Form ref="form"
                  type={topicInput}
                  options={opts}
                  value={this.state.value}
                  onChange={this._onValueChange}
            />
            <Text
                style={[styles.heading3, {textAlign: 'center', color: DARK_GREY_COLOUR}]}>
                What are the main options?
            </Text>
            <Form ref="form"
                  type={optionsForm}
                  options={opts}
                  value={this.state.value}
                  onChange={this._onValueChange}
            />
        </View>;
    },

    _onValueChange: function (value) {
        this.setState({
            value: value
        });
        this.props.onToolFieldChange(value);
    }
});

module.exports = Component;
