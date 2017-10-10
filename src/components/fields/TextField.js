/**
 * # TextField.js
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
    TouchableWithoutFeedback,
    TextInput
}
    from 'react-native';

const {is} = require('immutable');
import _ from 'underscore'

/**
 *  The fantastic little form library
 */
import t from 'tcomb-form-native';
import FloatingLabel from 'react-native-floating-label';
const stylesheet = require('../FormStylesheet');
t.form.Form.stylesheet = stylesheet;
let Form = t.form.Form;
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';

var TextField = React.createClass({

    propTypes: {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        field: PropTypes.object,
        thisPrimaryColour: PropTypes.string,
        thisSecondaryColour: PropTypes.string,
        cardBackgroundColour: PropTypes.string,
        multiline: PropTypes.bool
    },

    getInitialState: function () {
        return {
            loading: true,
            auto: 'placeholders',
            stylesheet: stylesheet,
            value: {
                field: ''
            },
            height: 32,
            factory: FloatingLabel,
            label: '',
            autoCapitalisation: 'none',
            keyboardType: 'default',
            returnKeyType: 'done',
            multiline: this.props.multiline,
            textAlign: 'left'
        };
    },
    
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.state, nextProps.cardFieldValues.toJS()[nextProps.id]);
        if (nextProps.cardFields) {
            let id = nextProps.id,
                cardFieldValues = nextProps.cardFieldValues.toJS(),
                tableFieldValues = nextProps.tableFieldValues.toJS(),
                fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                value = {
                    field: fieldValues[id]
                };

            if (typeof fieldValues[id] === "boolean") value.field = null;

            this.setState({
                value: value
            });
        }
    },

    componentWillMount() {
        this._onValueChange = _.debounce(this._onValueChange, 250);
    },

    componentDidMount() {
        if (this.props.cardFields) {
            let id = this.props.id,
                cardFields = this.props.cardFields.toJS(),
                tableFields = this.props.tableFields.toJS(),
                fields = Object.assign(cardFields, tableFields),
                field = fields[id],
                cardFieldValues = this.props.cardFieldValues.toJS(),
                tableFieldValues = this.props.tableFieldValues.toJS(),
                fieldValues = Object.assign(cardFieldValues, tableFieldValues),
                value = {
                    field: fieldValues[id]
                };

            if (typeof fieldValues[id] === "boolean") value.field = null;

            this.setState({
                loading: false,
                value: value,
                height: value.field ? 32 + Math.floor(value.field.length / 40) * 24.5 : 32,
                label: field.placeholder || field.label,
                autoCapitalisation: field.autoCapitalisation,
                keyboardType: field.keyboardType,
                returnKeyType: field.returnKeyType,
                textAlign: field.textAlign
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
    },

    render: function () {
        // console.log("===RENDER===");

        let options = {
            auto: this.state.auto,
            fields: {
                field: {
                    factory: this.state.factory,
                    label: this.state.label,
                    autoCapitalize: this.state.autoCapitalisation,
                    keyboardType: this.state.keyboardType,
                    //returnKeyType: this.state.returnKeyType,
                    multiline: this.state.multiline,
                    underlineColorAndroid: 'transparent',
                    onChange: (event) => {
                        // console.log(event.nativeEvent);
                        if (this.state.multiline) {
                            this.setState({
                                height: event.nativeEvent.contentSize.height < 32 ? 32 : event.nativeEvent.contentSize.height + 10.5
                            });
                        } else {
                            this.setState({
                                height: 32
                            });
                        }
                    }
                }
            },
            stylesheet: this.state.stylesheet
        };

        let fieldForm = t.struct({
            field: t.String
        });

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
                        },
                        height: {
                            $set: this.state.height
                        },
                        textAlign: {
                            $set: this.state.textAlign
                        }
                    },
                    error: {
                        color: {
                            $set: DARK_GREY_COLOUR
                        },
                        height: {
                            $set: this.state.height
                        },
                        textAlign: {
                            $set: this.state.textAlign
                        }
                    }
                }
            }
        });

        return <Form ref="form"
                     type={fieldForm}
                     options={opts}
                     value={this.state.value}
                     onChange={this._onValueChange}
        />
    },

    _onValueChange: function (value) {
        this.setState({
            value: value
        });

        let prefix = (typeof this.props.id === "string" && this.props.id.split('_').length > 1) ? 'tables' : 'cards';
        this.props.onToolFieldChange(prefix, this.props.id, value.field, value.field);
    }
});

module.exports = TextField;
