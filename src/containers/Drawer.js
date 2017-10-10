/**
 * # Drawer.js
 *
 *  This is called from main to demonstrate the back button
 *
 */
'use strict';

/**
 * ## Imports
 *
 * Imports from redux
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
 * The necessary components from React
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
}
    from 'react-native';

/**
 * Side navigation
 */
import Drawer from 'react-native-drawer';
import DrawerContent from '../components/DrawerContent';

/**
 * Router
 */
import {
    DefaultRenderer
} from 'react-native-router-flux';

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

const DRAWER_COLOUR = 'hsl(204, 73%, 23%)';
var styles = {
    drawer: {
        backgroundColor: 'transparent'
    },
    main: {
        opacity: 1
    },
    mainOverlay: {
        backgroundColor: DRAWER_COLOUR,
        opacity: 0
    }
};

/**
 * ## SideDrawer class
 */
class SideDrawer extends Component {

    /**
     * ### render
     *
     * Display the NavBarWithProps
     */
    render() {
        const children = this.props.navigationState.children;
        const controlPanel = <DrawerContent closeDrawer={() => {this._drawer.close()}}/>;
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                content={controlPanel}
                type="displace"
                tapToClose={true}
                openDrawerOffset={0.1}
                panCloseMask={0.1}
                negotiatePan={true}
                tweenDuration={350}
                tweenEasing="easeInOutQuad"
                tweenHandler={(ratio) => (
                    {
                        main: {
                            opacity: Math.max(0.54, 1-ratio)
                        },
                        mainOverlay: {
                            opacity: 1 - Math.max(0.54, 1-ratio)
                        }
                    }
                )}
                styles={{ drawer: styles.drawer, main: styles.main, mainOverlay: styles.mainOverlay }}>
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>
            </Drawer>
        );
    }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
