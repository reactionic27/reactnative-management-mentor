/**
 * # makingAGreatDecision/Criteria.js
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
    Text,
    Picker
}
    from 'react-native';

const Item = Picker.Item;

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

const NUMBER_OF_CRITERIA = 5;

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
                value: {},
                weights: [],
                factory: FloatingLabel,
                autoCapitalisation: 'sentences',
                keyboardType: 'default',
                returnKeyType: 'done',
                multiline: false,
                textAlign: 'left'
            };

        for (var i = 1; i <= NUMBER_OF_CRITERIA; i++) {
            state.value['criterion' + i] = data['criterion' + i];
            state['weight' + i] = data['weight' + i];
            state.weights[i - 1] = {
                value: i,
                text: i.toString()
            };
        }

        return state;
    },

    componentWillReceiveProps(nextProps) {
        // console.log("Criteria componentWillReceiveProps: ", nextProps.data.toJS());

        let data = nextProps.data.toJS(),
            nextState = {
                value: {}
            };

        for (var i = 1; i <= NUMBER_OF_CRITERIA; i++) {
            nextState.value['criterion' + i] = data['criterion' + i];
            nextState['weight' + i] = data['weight' + i];
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
                fields: {},
                stylesheet: this.state.stylesheet
            };

        for (var i = 1; i <= NUMBER_OF_CRITERIA; i++) {
            options.fields['criterion' + i] = Object.assign({}, fieldOptions, {
                label: 'Criterion ' + i
            });
        }

        let criterionInputs = [
            t.struct({
                criterion1: t.String
            }),
            t.struct({
                criterion2: t.String
            }),
            t.struct({
                criterion3: t.String
            }),
            t.struct({
                criterion4: t.String
            }),
            t.struct({
                criterion5: t.String
            })
        ];

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
                Decision criteria
            </Text>
            <Text
                style={[styles.heading3, {textAlign: 'center', color: DARK_GREY_COLOUR}]}>
                {this.props.data.toJS().topic || 'Topic'}
            </Text>
            <Text
                style={[styles.paragraph, {textAlign: 'center', color: DARK_GREY_COLOUR}]}>
                {
                    'What are the main ' +
                    NUMBER_OF_CRITERIA +
                    ' criteria and how would you rank them (1 - ' +
                    NUMBER_OF_CRITERIA +
                    ') where ' +
                    NUMBER_OF_CRITERIA +
                    ' is most important?'
                }
            </Text>
            {
                [1, 2, 3, 4, 5].map((n) => {
                    return <View
                        key={"criterion_" + n}
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <View
                            style={{
                                flex: 5,
                                paddingRight: 20
                            }}
                        >
                            <Form ref="form"
                                  type={criterionInputs[n-1]}
                                  options={opts}
                                  value={this.state.value}
                                  onChange={this._onValueChange}
                            />
                        </View>
                        <View
                            style={{
                                flex: 2
                            }}
                        >
                            <Picker
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                                selectedValue={this.state["weight" + n]}
                                onValueChange={(itemValue, itemPosition) => this._onPickerChange(itemValue, itemPosition, n)}>
                                {
                                    this.state.weights.map((option) => {
                                        return <Item
                                            key={option.text}
                                            label={option.text}
                                            value={option.value}
                                        />;
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                })
            }
        </View>;
    },

    _onValueChange: function (value) {
        this.setState({
            value: value
        });
        this.props.onToolFieldChange(value);
    },

    _onPickerChange(itemValue, itemPosition, n) {
        // console.log(itemValue, itemPosition, n);

        let newState = {};
        newState["weight" + n] = itemValue;

        this.setState(newState);

        this.props.onToolFieldChange(newState);
    }
});

module.exports = Component;
