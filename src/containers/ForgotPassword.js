/**
 * # ForgotPassword.js
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   LoginRender
 */
import LoginRender from '../components/LoginRender';

/**
 * Need React
 */
import React from 'react';
import {
    View,
    Text
}
    from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const {
    LOGIN,
    FORGOT_PASSWORD
} = require('../lib/constants').default;

/**
 * ## Redux boilerplate
 */
const actions = [
    authActions
];

function mapStateToProps(state) {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch) {
    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();

    return {
        actions: bindActionCreators(creators, dispatch),
        dispatch
    };
}

function buttonPressHandler(resetPassword, email) {
    resetPassword(email);
}

var globalStyles = require('../components/Stylesheet');

let ForgotPassword = React.createClass({

    render() {
        let onButtonPress = buttonPressHandler.bind(null,
            this.props.actions.resetPassword,
            this.props.auth.form.fields.email
        );

        let loginButtonText = <View>
            <View style={globalStyles.iconAndText}>
                <View style={globalStyles.buttonIconContainer}>
                    <Icon name='refresh' size={18} color='white'/>
                </View>
                <View style={globalStyles.buttonTextContainer}>
                    <Text style={globalStyles.sansSerifRegularText}>
                        <Text style={[globalStyles.bodyText, {color: 'white'}]}>
                            RESET PASSWORD
                        </Text>
                    </Text>
                </View>
            </View>
        </View>;

        return (
            <LoginRender
                formType={ FORGOT_PASSWORD }
                loginButtonText={ loginButtonText }
                onButtonPress={ onButtonPress }
                displayPasswordCheckbox={ false }
                additionalText={ false }
                leftMessageType={ LOGIN }
                auth={ this.props.auth }
                global={ this.props.global }
            />
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
