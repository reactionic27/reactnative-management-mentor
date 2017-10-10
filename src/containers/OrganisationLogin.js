/**
 * # Login.js
 *
 *  The container to display the Login form
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
import * as toolSavesListActions from '../reducers/toolSavesList/toolSavesListActions';
import * as toolsListActions from '../reducers/toolsList/toolsListActions';
import * as ratingActions from '../reducers/rating/ratingActions';
import * as profileActions from '../reducers/profile/profileActions';
import * as authActions from '../reducers/auth/authActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   LoginRender
 */
import LoginRender from '../components/LoginRender';

/**
 * The necessary React components
 */
import React from 'react';
import {
    View,
    Text
}
    from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';


const {
    NO_ORGANISATION_ID,
    ORGANISATION_LOGIN,
} = require('../lib/constants').default;

/**
 * ## Redux boilerplate
 */
const actions = [
    toolSavesListActions,
    toolsListActions,
    ratingActions,
    profileActions,
    authActions,
    globalActions
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

var CookieManager = require('react-native-cookies');

function buttonPressHandler(actions, uuid) {
    actions.deleteOrganisation();
    actions.deleteProfile();
    actions.deleteRatings();
    actions.deleteTools();
    actions.deleteToolSaves();
    actions.deleteSessionToken();
    CookieManager.clearAll((err, res) => {
        // console.log('cookies cleared!');
        // console.log(err);
        // console.log(res);
    });
    actions.organisationLogin(uuid);
}

var globalStyles = require('../components/Stylesheet');

let Login = React.createClass({

    render() {
        let onButtonPress = buttonPressHandler.bind(null,
            this.props.actions,
            this.props.auth.form.fields.uuid
        );

        let loginButtonText = <View>
            <View style={globalStyles.iconAndText}>
                <View style={globalStyles.buttonIconContainer}>
                    <Icon name='skip-next' size={18} color='white'/>
                </View>
                <View style={globalStyles.buttonTextContainer}>
                    <Text style={globalStyles.sansSerifRegularText}>
                        <Text style={[globalStyles.bodyText, {color: 'white'}]}>
                            NEXT
                        </Text>
                    </Text>
                </View>
            </View>
        </View>;

        return (
            <LoginRender
                formType={ ORGANISATION_LOGIN }
                loginButtonText={ loginButtonText }
                onButtonPress={ onButtonPress }
                displayPasswordCheckbox={ false }
                additionalText={ 'You will have been sent this in an email' }
                
                auth={ this.props.auth }
                global={ this.props.global }
            />
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
