/**
 * # LoginForm.js
 *
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Reset Password
 *
 */
'use strict';
/**
 * ## Import
 *
 * React
 */
import React, { PropTypes } from 'react';

/**
 * States of login display
 */
const {
    ORGANISATION_LOGIN,
    LOGIN,
    FORGOT_PASSWORD
} = require('../lib/constants').default;

/**
 *  The fantastic little form library
 */
import t from 'tcomb-form-native';
import FloatingLabel from 'react-native-floating-label';
const stylesheet = require('./FormStylesheet');
t.form.Form.stylesheet = stylesheet;
let Form = t.form.Form;

var LoginForm = React.createClass({
    /**
     * ## LoginForm class
     *
     * * form: the properties to set into the UI form
     * * value: the values to set in the input fields
     * * onChange: function to call when user enters text
     */
    propTypes: {
        formType: PropTypes.string,
        form: PropTypes.object,
        value: PropTypes.object,
        onChange: PropTypes.func
    },

    /**
     * ## render
     *
     * setup all the fields using the props and default messages
     *
     */
    render() {

        let formType = this.props.formType;

        let options = {
            auto: 'placeholders',
            fields: {},
            stylesheet: stylesheet
        };

        let email = {
            factory: FloatingLabel,
            underlineColorAndroid: 'transparent',
            label: 'Email',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            autoCorrect: false,
            returnKeyType: 'next',
            onSubmitEditing: () => {
                if (formType === LOGIN) {
                    this.refs.form.getComponent('password').refs.input.focus()
                } else if (formType === FORGOT_PASSWORD) {
                    this.props.onPress();
                }
            },
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.emailHasError,
            error: 'Please enter a valid email address',
            errorPlaceholderTextColor: 'hsl(1, 44%, 46%)'
        };

        let secureTextEntry = !this.props.form.fields.showPassword;

        let password = {
            factory: FloatingLabel,
            underlineColorAndroid: 'transparent',
            label: 'Password',
            maxLength: 72,
            secureTextEntry: secureTextEntry,
            returnKeyType: 'go',
            onSubmitEditing: () => this.props.onPress(),
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.passwordHasError,
            error: 'Must be between 8 and 72 characters in length',
            errorPlaceholderTextColor: 'hsl(1, 44%, 46%)'
        };

        let uuid = {
            factory: FloatingLabel,
            underlineColorAndroid: 'transparent',
            label: 'Organisation ID',
            autoCapitalize: 'none',
            maxLength: 8,
            returnKeyType: 'go',
            onSubmitEditing: () => this.props.onPress(),
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.uuidHasError,
            error: 'Must contain 8 characters',
            errorPlaceholderTextColor: 'hsl(1, 44%, 46%)'
        };

        let loginForm;
        switch (formType) {
            /**
             * ### Login
             * The login form has only 2 fields
             */
            case(ORGANISATION_LOGIN):
                loginForm = t.struct({
                    uuid: t.String
                });
                options.fields['uuid'] = uuid;
                break;

            /**
             * ### Login
             * The login form has only 2 fields
             */
            case(LOGIN):
                loginForm = t.struct({
                    email: t.String,
                    password: t.String
                });
                options.fields['email'] = email;
                options.fields['password'] = password;
                break;

            /**
             * ### Reset password
             * The password reset form has only 1 field
             */
            case(FORGOT_PASSWORD):
                loginForm = t.struct({
                    email: t.String
                });
                options.fields['email'] = email;
                break;
        } //switch

        const opts = t.update(options, {
            stylesheet: {
                controlLabel: {
                    normal: {
                        color: {
                            $set: 'white'
                        }
                    },
                    error: {
                        color: {
                            $set: 'white'
                        }
                    }
                },
                textbox: {
                    normal: {
                        color: {
                            $set: 'white'
                        }
                    },
                    error: {
                        color: {
                            $set: 'white'
                        }
                    }
                }
            }
        });

        /**
         * ### Return
         * returns the Form component with the correct structures
         */
        return (
            <Form ref="form"
                  type={loginForm}
                  options={opts}
                  value={this.props.value}
                  onChange={this.props.onChange}
            />

        );
    }
});

module.exports = LoginForm;
