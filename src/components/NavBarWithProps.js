/**
 * # NavBarWithProps.js
 *
 * The list of links to go in the side drawer
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
import * as profileActions from '../reducers/profile/profileActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 * The necessary React components
 */
import React, { Component } from 'react';
import {
    View
}
    from 'react-native';

/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {NavBar} from 'react-native-router-flux'

/**
 * ### components
 *
 * All the top level components
 *
 */
import MenuTitleIcon from '../components/MenuTitleIcon';

/**
 * ## Redux boilerplate
 */
const actions = [
    profileActions
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

const flattenStyle = require('flattenStyle');
var globalStyles = require('../components/Stylesheet');
const DEFAULT_PRIMARY_COLOUR = 'hsl(204, 73%, 23%)';

import Helpers from '../lib/helpers'

class NavBarWithProps extends Component {

    _renderMenuTitleIcon() {
        var state = this.props.navigationState;
        state.children.forEach(function (child, index) {
            child.titleIndex = index;
        });

        return <MenuTitleIcon
            {...this.props}
        />;
    }

    constructor(props) {
        super(props);
        this.state = {
            navigationBarStyle: flattenStyle([
                globalStyles.navigationBarStyle,
                {
                    backgroundColor: Helpers.getPrimaryColour(props)
                }
            ])
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            navigationBarStyle: flattenStyle([
                globalStyles.navigationBarStyle,
                {
                    backgroundColor: Helpers.getPrimaryColour(nextProps)
                }
            ])
        });
    }

    /**
     * ### render
     *
     * Display the NavBarWithProps
     */
    render() {

        let navBar = <NavBar
            {...this.props}
            navigationBarStyle={this.state.navigationBarStyle}
        />;

        if (this.props.titleIcon) {
            navBar = <NavBar
                {...this.props}
                navigationBarStyle={this.state.navigationBarStyle}
                renderTitle={this._renderMenuTitleIcon.bind(this)}
            />;
        }

        return navBar;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarWithProps);