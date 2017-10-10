/**
 * # ToolNameField.js
 *
 */
'use strict';
/**
 * ## Import
 *
 */
import React, {PropTypes} from 'react';

/**
 *  The fantastic little form library
 */
import t from 'tcomb-form-native';
import FloatingLabel from 'react-native-floating-label';
const stylesheet = require('./FormStylesheet');
t.form.Form.stylesheet = stylesheet;
let Form = t.form.Form;
const DARK_GREY_COLOUR = 'hsl(0, 0%, 20%)';

var ToolNameField = React.createClass({

    propTypes: {
        value: PropTypes.string,
        onChange: PropTypes.func
    },

    getInitialState: function () {
        return {
            auto: 'placeholders',
            stylesheet: stylesheet,
            value: {
                field: this.props.value
            },
            factory: FloatingLabel,
            label: 'Name',
            autoCapitalisation: 'none',
            keyboardType: 'default',
            returnKeyType: 'done',
            multiline: false,
            textAlign: 'left'
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: {
                field: nextProps.value
            }
        })
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
                    returnKeyType: this.state.returnKeyType,
                    multiline: this.state.multiline,
                    underlineColorAndroid: 'transparent',
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

        this.props.onChange(value.field);
    }
});

module.exports = ToolNameField;
